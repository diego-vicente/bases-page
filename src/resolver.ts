import type { BasesData, BasesEntry, BasesView, QuartzPluginData, SortEntry } from "./types";
import { evaluate, evaluateFilter, resolvePropertyValue } from "./compiler";
import type { EvalContext } from "./compiler";
import { simplifySlug } from "@quartz-community/utils";

function normalizeStringArray(values: unknown): string[] {
  if (!Array.isArray(values)) return [];
  return values.filter((value): value is string => typeof value === "string");
}

// Inner may contain a single `]` (titles like "[REC]³"), never `]]`.
const WIKILINK_RE = /\[\[((?:[^\]]|\](?!\]))+?)\]\]/g;

// Collects `[[…]]` targets (alias/heading stripped) from any frontmatter value —
// a string, or an array of strings. Obsidian counts frontmatter wikilinks as
// real links, so they must feed `file.backlinks` (e.g. a Check-in's `on: [[Film]]`
// is a backlink of that film) even though Quartz keeps them out of `data.links`.
function extractFrontmatterWikilinks(value: unknown, out: string[]): void {
  if (typeof value === "string") {
    for (const match of value.matchAll(WIKILINK_RE)) {
      const target = match[1]?.replace(/[#|].*$/, "").trim();
      if (target) out.push(target);
    }
  } else if (Array.isArray(value)) {
    for (const item of value) extractFrontmatterWikilinks(item, out);
  } else if (value && typeof value === "object") {
    for (const item of Object.values(value)) extractFrontmatterWikilinks(item, out);
  }
}

function getFilePath(fileData: QuartzPluginData, slug: string): string {
  // Prefer relativePath (relative to content dir) over filePath (absolute).
  // Self-context paths from .base files use ctx.allFiles which are relative,
  // so note paths must also be relative for inFolder() comparisons to work.
  if (typeof fileData.relativePath === "string") return fileData.relativePath;
  if (typeof fileData.filePath === "string") return fileData.filePath;
  return slug ? `${slug}.md` : "";
}

function getFileName(path: string): string {
  const lastSlash = path.lastIndexOf("/");
  return lastSlash >= 0 ? path.slice(lastSlash + 1) : path;
}

function getBaseName(path: string): string {
  const fileName = getFileName(path);
  const dot = fileName.lastIndexOf(".");
  return dot > 0 ? fileName.slice(0, dot) : fileName;
}

function toDate(value: unknown): Date | undefined {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    if (!Number.isNaN(parsed)) return new Date(parsed);
  }
  return undefined;
}

function buildFileProperties(
  fileData: QuartzPluginData,
  slug: string,
  frontmatter: Record<string, unknown>,
): BasesEntry["fileProperties"] {
  const filePath = getFilePath(fileData, slug);
  const baseName = filePath ? getBaseName(filePath) : getBaseName(slug);
  const name = baseName || slug.split("/").pop() || "Untitled";
  const basename = baseName || slug.split("/").pop() || "Untitled";
  const lastSlash = filePath.lastIndexOf("/");
  const folder = lastSlash >= 0 ? filePath.slice(0, lastSlash) : "";
  const lastDot = filePath.lastIndexOf(".");
  const ext = lastDot >= 0 ? filePath.slice(lastDot + 1) : "";
  const tags = normalizeStringArray(frontmatter.tags);
  const links = normalizeStringArray(fileData.links ?? fileData.outgoingLinks);
  const embeds = normalizeStringArray(fileData.embeds);

  const dates = fileData.dates as Record<string, unknown> | undefined;
  const ctime = toDate(dates?.created);
  const mtime = toDate(dates?.modified);

  return {
    name,
    basename,
    path: filePath,
    folder,
    ext,
    tags,
    links,
    embeds,
    created: ctime?.toISOString(),
    modified: mtime?.toISOString(),
    ctime,
    mtime,
  };
}

/**
 * Order formulas so that a formula referencing `formula.X` is evaluated after X.
 * Obsidian evaluates formula references lazily; bases-page evaluates them eagerly
 * into `context.formula`, so without dependency ordering a forward reference
 * (e.g. `Untitled: if(formula.Visited, ...)` declared before `Visited`) reads
 * `undefined`. Returns names in safe evaluation order; cycles fall back to
 * declaration order for the cyclic members.
 */
function orderFormulas(formulas: Record<string, string>): string[] {
  const names = Object.keys(formulas);
  const nameSet = new Set(names);
  const deps = new Map<string, Set<string>>();
  for (const name of names) {
    const expr = String(formulas[name]);
    const found = new Set<string>();
    const re = /\bformula\.([A-Za-z_][A-Za-z0-9_]*)/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(expr))) {
      const dep = m[1];
      if (dep && dep !== name && nameSet.has(dep)) found.add(dep);
    }
    deps.set(name, found);
  }
  const ordered: string[] = [];
  const state = new Map<string, "visiting" | "done">();
  const visit = (name: string): void => {
    const s = state.get(name);
    if (s === "done" || s === "visiting") return; // done, or cycle → bail
    state.set(name, "visiting");
    for (const dep of deps.get(name) ?? []) visit(dep);
    state.set(name, "done");
    ordered.push(name);
  };
  for (const name of names) visit(name);
  return ordered;
}

// A value Obsidian treats as "empty" for sorting — always parked last, in both
// directions (see sortEntries).
function isEmptySortValue(value: unknown): boolean {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
}

// Compares two NON-empty values the way Obsidian does: numbers numerically,
// date-like strings chronologically, otherwise a natural (numeric-aware),
// case-insensitive string compare ("file2" before "file10", "a" == "A" tier).
function compareSortValues(a: unknown, b: unknown): number {
  if (typeof a === "number" && typeof b === "number") return a - b;
  const dateA = typeof a === "string" ? Date.parse(a) : NaN;
  const dateB = typeof b === "string" ? Date.parse(b) : NaN;
  if (!Number.isNaN(dateA) && !Number.isNaN(dateB)) return dateA - dateB;
  return String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function buildSortKeys(view?: BasesView): SortEntry[] {
  if (view?.sort && view.sort.length > 0) return view.sort;
  if (view?.groupBy?.property) {
    return [{ property: view.groupBy.property, direction: view.groupBy.direction ?? "ASC" }];
  }
  if (view?.order && view.order.length > 0) {
    return view.order.map((property) => ({ property, direction: "ASC" as const }));
  }
  return [];
}

function sortEntries(entries: BasesEntry[], view?: BasesView): BasesEntry[] {
  const sortKeys = buildSortKeys(view);
  if (sortKeys.length === 0) return entries;

  const valueFor = (entry: BasesEntry, property: string): unknown =>
    resolvePropertyValue(property, {
      note: entry.properties,
      file: entry.fileProperties,
      formula: entry.formulaValues,
    });

  return [...entries].sort((left, right) => {
    for (const key of sortKeys) {
      const leftValue = valueFor(left, key.property);
      const rightValue = valueFor(right, key.property);
      const leftEmpty = isEmptySortValue(leftValue);
      const rightEmpty = isEmptySortValue(rightValue);
      // Empties always sort last, independent of ASC/DESC (Obsidian behavior).
      if (leftEmpty && rightEmpty) continue;
      if (leftEmpty) return 1;
      if (rightEmpty) return -1;
      const cmp = compareSortValues(leftValue, rightValue);
      if (cmp !== 0) return key.direction === "DESC" ? -cmp : cmp;
    }
    // Tiebreak on file name ascending — Obsidian's baseline order.
    return compareSortValues(left.fileProperties?.name, right.fileProperties?.name);
  });
}

export function resolveBasesEntries(
  basesData: BasesData,
  allFiles: QuartzPluginData[],
  view?: BasesView,
  selfContext?: EvalContext["self"],
  // Optional FULL-vault file set (published + unpublished). When provided, the
  // backlink index and file lookup span it — so `file.backlinks` counts and
  // `value.asFile()` resolution include unpublished notes — while ROWS still come
  // only from `allFiles` (published), so no unpublished note is listed/leaked.
  linkUniverse?: QuartzPluginData[],
): { entries: BasesEntry[]; total: number } {
  const entries: BasesEntry[] = [];
  const formulas = basesData.formulas ?? {};
  const formulaOrder = orderFormulas(formulas);
  const universe = linkUniverse ?? allFiles;

  // Resolves a frontmatter wikilink (a note name like "A Minecraft Movie (2025)")
  // to a full slug. Keyed by lowercased basename + aliases — matching the raw note
  // name, NOT a re-slugified one (slugify isn't reversible: the stored slug may
  // strip characters, e.g. "(2025)" → "2025", that slugify would keep).
  const slugByName = new Map<string, string>();
  for (const fd of universe) {
    const s = typeof fd.slug === "string" ? fd.slug : "";
    if (!s) continue;
    const names = [getBaseName(getFilePath(fd, s))];
    const fm = (fd.frontmatter ?? {}) as Record<string, unknown>;
    names.push(...normalizeStringArray(fm.aliases));
    for (const n of names) {
      const key = n.trim().toLowerCase();
      if (key && !slugByName.has(key)) slugByName.set(key, s);
    }
  }
  const resolveWikiName = (name: string): string | undefined => {
    const base = name.split("/").pop()?.trim().toLowerCase();
    return base ? slugByName.get(base) : undefined;
  };

  // Reverse-link index for `file.backlinks`: target simple slug → source slugs.
  // Built first (full pass) so every file value below can carry its backlinks.
  const reverseLinks = new Map<string, string[]>();
  const addReverse = (targetKey: string, src: string) => {
    const arr = reverseLinks.get(targetKey);
    if (arr) arr.push(src);
    else reverseLinks.set(targetKey, [src]);
  };
  for (const fd of universe) {
    if ((fd as { unlisted?: unknown }).unlisted === true) continue;
    const src = typeof fd.slug === "string" ? fd.slug : "";
    if (!src) continue;
    for (const target of normalizeStringArray(fd.links ?? fd.outgoingLinks)) {
      addReverse(simplifySlug(target), src);
    }
    // Also index frontmatter wikilinks (e.g. a Check-in's `on: [[Film]]`), which
    // Quartz omits from `data.links` but Obsidian treats as backlinks.
    const fmLinks: string[] = [];
    extractFrontmatterWikilinks(fd.frontmatter ?? {}, fmLinks);
    for (const name of fmLinks) {
      const resolved = resolveWikiName(name);
      if (resolved) addReverse(simplifySlug(resolved), src);
    }
  }
  const backlinksOf = (slug: string): string[] => reverseLinks.get(simplifySlug(slug)) ?? [];

  const fileLookup = new Map<string, EvalContext["file"]>();
  for (const fd of universe) {
    if ((fd as { unlisted?: unknown }).unlisted === true) continue;
    const fdSlug = typeof fd.slug === "string" ? fd.slug : "";
    if (!fdSlug) continue;
    const fdPath = getFilePath(fd, fdSlug);
    const fm = (fd.frontmatter ?? {}) as Record<string, unknown>;
    const fp = buildFileProperties(fd, fdSlug, fm);
    const fileValue: EvalContext["file"] = { ...fp, properties: fm, backlinks: backlinksOf(fdSlug) };

    fileLookup.set(fdPath, fileValue);
    const withoutExt = fdPath.replace(/\.md$/, "");
    if (withoutExt !== fdPath) fileLookup.set(withoutExt, fileValue);

    // Register by slug and basename so OFM's short embed names (e.g. "Apple"
    // from ![[Apple]]) resolve. First-registered wins to avoid ambiguous overwrites.
    if (fdSlug && !fileLookup.has(fdSlug)) {
      fileLookup.set(fdSlug, fileValue);
    }
    const base = getBaseName(fdPath);
    if (base && !fileLookup.has(base)) {
      fileLookup.set(base, fileValue);
    }
  }

  for (const fileData of allFiles) {
    if ((fileData as { unlisted?: unknown }).unlisted === true) continue;
    const slug = typeof fileData.slug === "string" ? fileData.slug : "";
    if (!slug) continue;

    const filePath = typeof fileData.filePath === "string" ? fileData.filePath : "";
    if (filePath.endsWith(".base") || slug.endsWith(".base")) continue;

    const frontmatter = (fileData.frontmatter ?? {}) as Record<string, unknown>;
    const fileProperties = buildFileProperties(fileData, slug, frontmatter);
    const context = {
      note: frontmatter,
      file: { ...fileProperties, properties: frontmatter, backlinks: backlinksOf(slug) },
      formula: {} as Record<string, unknown>,
      self: selfContext,
      _fileLookup: fileLookup,
    };

    // Evaluate formulas in dependency order so formula-to-formula references resolve.
    for (const name of formulaOrder) {
      context.formula[name] = evaluate(formulas[name] ?? "", context);
    }

    // Apply global filters
    if (!evaluateFilter(basesData.filters, context)) continue;
    // Apply view-specific filters
    if (view?.filters && !evaluateFilter(view.filters, context)) continue;

    const title =
      typeof frontmatter.title === "string"
        ? frontmatter.title
        : fileProperties.basename || slug.split("/").pop() || "Untitled";

    entries.push({
      slug,
      title,
      properties: frontmatter,
      fileProperties,
      formulaValues: context.formula,
    });
  }

  const total = entries.length;
  const sorted = sortEntries(entries, view);
  const limited = view?.limit ? sorted.slice(0, view.limit) : sorted;
  return { entries: limited, total };
}
