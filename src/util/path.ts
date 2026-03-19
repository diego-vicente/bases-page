export function simplifySlug(slug: string): string {
  if (slug.endsWith("/index")) return slug.slice(0, -6);
  return slug;
}

export function resolveRelative(current: string, target: string): string {
  const simpleCurrent = simplifySlug(current);
  const simpleTarget = simplifySlug(target);
  const currentParts = simpleCurrent.split("/").filter(Boolean);
  const targetParts = simpleTarget.split("/").filter(Boolean);
  currentParts.pop();
  let prefix = "";
  const commonLength = Math.min(currentParts.length, targetParts.length);
  let common = 0;
  for (let i = 0; i < commonLength; i++) {
    if (currentParts[i] === targetParts[i]) {
      common++;
    } else {
      break;
    }
  }
  const ups = currentParts.length - common;
  if (ups > 0) {
    prefix = "../".repeat(ups);
  } else {
    prefix = "./";
  }
  return prefix + targetParts.slice(common).join("/");
}

/**
 * Slugify a file path for use as an href, matching Quartz's _sluggify behavior.
 * Replaces whitespace→hyphens, &→-and-, %→-percent, removes ? and #.
 */
export function slugifyPath(path: string): string {
  return path
    .split("/")
    .map((segment) =>
      segment
        .replace(/\s/g, "-")
        .replace(/&/g, "-and-")
        .replace(/%/g, "-percent")
        .replace(/\?/g, "")
        .replace(/#/g, ""),
    )
    .join("/")
    .replace(/\/$/, "");
}

export function pathToRoot(slug: string): string {
  const parts = simplifySlug(slug).split("/").filter(Boolean);
  if (parts.length <= 1) return ".";
  return "../".repeat(parts.length - 1).slice(0, -1);
}
