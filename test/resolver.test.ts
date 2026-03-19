import { describe, it, expect } from "vitest";
import { resolveBasesEntries } from "../src/resolver";
import type { BasesData, BasesView, QuartzPluginData } from "../src/types";

type FileInput = {
  slug: string;
  filePath?: string;
  frontmatter?: Record<string, unknown>;
  links?: string[];
  outgoingLinks?: string[];
  dates?: Record<string, unknown>;
};

function makeFile(input: FileInput): QuartzPluginData {
  return {
    slug: input.slug,
    filePath: input.filePath ?? `${input.slug}.md`,
    frontmatter: input.frontmatter ?? {},
    links: input.links,
    outgoingLinks: input.outgoingLinks,
    dates: input.dates,
  } as QuartzPluginData;
}

const baseFiles: QuartzPluginData[] = [
  makeFile({
    slug: "notes/alpha",
    filePath: "notes/alpha.md",
    frontmatter: {
      title: "Alpha",
      status: "done",
      priority: 5,
      tags: ["work", "important"],
    },
    links: ["beta"],
    dates: {
      created: "2024-01-01T00:00:00Z",
      modified: "2024-01-02T00:00:00Z",
    },
  }),
  makeFile({
    slug: "notes/bravo",
    filePath: "notes/bravo.md",
    frontmatter: {
      status: "todo",
      priority: 2,
    },
    outgoingLinks: ["gamma"],
  }),
];

describe("resolveBasesEntries", () => {
  it("returns all files when no filters are set", () => {
    const basesData: BasesData = {};
    const result = resolveBasesEntries(basesData, baseFiles);
    expect(result.entries).toHaveLength(2);
    expect(result.total).toBe(2);
  });

  it("excludes .base files", () => {
    const basesData: BasesData = {};
    const files = [
      ...baseFiles,
      makeFile({
        slug: "notes/excluded.base",
        filePath: "notes/excluded.base",
        frontmatter: { status: "done" },
      }),
    ];
    const result = resolveBasesEntries(basesData, files);
    expect(result.entries).toHaveLength(2);
    expect(result.entries.find((entry) => entry.slug.endsWith(".base"))).toBeUndefined();
  });

  it("applies global filters", () => {
    const basesData: BasesData = {
      filters: 'status == "done"',
    };
    const result = resolveBasesEntries(basesData, baseFiles);
    expect(result.entries).toHaveLength(1);
    expect(result.entries[0]?.slug).toBe("notes/alpha");
  });

  it("applies view-specific filters", () => {
    const basesData: BasesData = {};
    const view: BasesView = {
      type: "table",
      filters: "priority > 3",
    };
    const result = resolveBasesEntries(basesData, baseFiles, view);
    expect(result.entries).toHaveLength(1);
    expect(result.entries[0]?.slug).toBe("notes/alpha");
  });

  it("evaluates formulas on entries", () => {
    const basesData: BasesData = {
      formulas: {
        doubled: "priority * 2",
        label: 'if(priority > 3, "high", "low")',
      },
    };
    const result = resolveBasesEntries(basesData, baseFiles);
    const alpha = result.entries.find((entry) => entry.slug === "notes/alpha");
    expect(alpha?.formulaValues.doubled).toBe(10);
    expect(alpha?.formulaValues.label).toBe("high");
  });

  it("sorts entries by property", () => {
    const basesData: BasesData = {};
    const view: BasesView = {
      type: "table",
      order: ["priority"],
    };
    const result = resolveBasesEntries(basesData, baseFiles, view);
    expect(result.entries.map((entry) => entry.slug)).toEqual(["notes/bravo", "notes/alpha"]);
  });

  it("sorts entries by direction", () => {
    const basesData: BasesData = {};
    const view: BasesView = {
      type: "table",
      groupBy: { property: "priority", direction: "DESC" },
    };
    const result = resolveBasesEntries(basesData, baseFiles, view);
    expect(result.entries.map((entry) => entry.slug)).toEqual(["notes/alpha", "notes/bravo"]);
  });

  it("applies view limits", () => {
    const basesData: BasesData = {};
    const view: BasesView = {
      type: "table",
      limit: 1,
      order: ["priority"],
    };
    const result = resolveBasesEntries(basesData, baseFiles, view);
    expect(result.entries).toHaveLength(1);
    expect(result.total).toBe(2);
  });

  it("builds file properties correctly", () => {
    const basesData: BasesData = {};
    const result = resolveBasesEntries(basesData, baseFiles);
    const alpha = result.entries.find((entry) => entry.slug === "notes/alpha");
    expect(alpha?.fileProperties).toEqual({
      name: "alpha.md",
      basename: "alpha",
      path: "notes/alpha.md",
      folder: "notes",
      ext: "md",
      tags: ["work", "important"],
      links: ["beta"],
      embeds: [],
      created: "2024-01-01T00:00:00.000Z",
      modified: "2024-01-02T00:00:00.000Z",
      ctime: new Date("2024-01-01T00:00:00Z"),
      mtime: new Date("2024-01-02T00:00:00Z"),
    });
  });

  it("falls back to file name when title is missing", () => {
    const basesData: BasesData = {};
    const result = resolveBasesEntries(basesData, baseFiles);
    const bravo = result.entries.find((entry) => entry.slug === "notes/bravo");
    expect(bravo?.title).toBe("bravo");
  });

  it("sorts entries by sort field with multiple keys", () => {
    const files: QuartzPluginData[] = [
      makeFile({
        slug: "a",
        frontmatter: { status: "done", priority: 3 },
      }),
      makeFile({
        slug: "b",
        frontmatter: { status: "done", priority: 1 },
      }),
      makeFile({
        slug: "c",
        frontmatter: { status: "todo", priority: 2 },
      }),
    ];
    const basesData: BasesData = {};
    const view: BasesView = {
      type: "table",
      sort: [
        { property: "status", direction: "ASC" },
        { property: "priority", direction: "ASC" },
      ],
    };
    const result = resolveBasesEntries(basesData, files, view);
    // "done" < "todo" alphabetically, then by priority ascending
    expect(result.entries.map((entry) => entry.slug)).toEqual(["b", "a", "c"]);
  });

  it("sort field takes priority over groupBy and order", () => {
    const files: QuartzPluginData[] = [
      makeFile({ slug: "x", frontmatter: { priority: 3, status: "done" } }),
      makeFile({ slug: "y", frontmatter: { priority: 1, status: "todo" } }),
    ];
    const basesData: BasesData = {};
    const view: BasesView = {
      type: "table",
      sort: [{ property: "priority", direction: "DESC" }],
      groupBy: { property: "status", direction: "ASC" },
      order: ["status"],
    };
    const result = resolveBasesEntries(basesData, files, view);
    // sort field wins: priority DESC → x(3) first, y(1) second
    expect(result.entries.map((entry) => entry.slug)).toEqual(["x", "y"]);
  });

  it("includes embeds in file properties", () => {
    const files: QuartzPluginData[] = [makeFile({ slug: "notes/embed-test", frontmatter: {} })];
    // Manually add embeds to the file data
    (files[0] as Record<string, unknown>).embeds = ["image.png", "doc.pdf"];
    const basesData: BasesData = {};
    const result = resolveBasesEntries(basesData, files);
    expect(result.entries[0]?.fileProperties.embeds).toEqual(["image.png", "doc.pdf"]);
  });

  it("spreads frontmatter into file.properties for formula access", () => {
    const basesData: BasesData = {
      formulas: {
        customTitle: "file.properties.title",
      },
    };
    const files: QuartzPluginData[] = [
      makeFile({
        slug: "notes/props-test",
        frontmatter: { title: "My Custom Title" },
      }),
    ];
    const result = resolveBasesEntries(basesData, files);
    expect(result.entries[0]?.formulaValues.customTitle).toBe("My Custom Title");
  });
});
