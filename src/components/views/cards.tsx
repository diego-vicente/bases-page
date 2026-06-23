import type { ViewRenderer, ViewTypeRegistration } from "../../types";
import type { FullSlug } from "@quartz-community/types";
import { i18n } from "../../i18n";
import {
  getColumnLabel,
  isEmptyValue,
  renderCellValue,
  resolveEntryPropertyValue,
} from "../shared/cell";
import { transformLink } from "@quartz-community/utils";
import { safeTransformLink } from "../shared/links";

function formatMessage(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

const HEX_COLOR_RE = /^#(?:[0-9a-f]{3}){1,2}$/i;
const WIKILINK_RE = /^\[\[(.+?)(?:\|.*)?\]\]$/;

export interface ResolveImageOpts {
  slug: string;
  allSlugs: string[];
  linkResolution: "absolute" | "relative" | "shortest";
}

export function resolveImageSrc(
  raw: string,
  opts: ResolveImageOpts,
): { src: string; isColor: boolean } {
  if (!raw) return { src: "", isColor: false };

  if (HEX_COLOR_RE.test(raw)) {
    return { src: raw, isColor: true };
  }

  const wikiMatch = WIKILINK_RE.exec(raw);
  if (wikiMatch?.[1]) {
    const target = wikiMatch[1].trim();
    const resolved = safeTransformLink(opts.slug as FullSlug, target, {
      strategy: opts.linkResolution,
      allSlugs: opts.allSlugs as FullSlug[],
    });
    return { src: resolved, isColor: false };
  }

  return { src: raw, isColor: false };
}

const CardsView: ViewRenderer = ({
  entries,
  view,
  basesData,
  total,
  locale,
  slug,
  allSlugs,
  linkResolution,
}) => {
  const imageProperty = typeof view.image === "string" ? view.image : undefined;
  const cardMetaColumns =
    view.order && view.order.length > 0
      ? view.order.filter((column) => column !== imageProperty && column !== "file.name")
      : [];
  const localeStrings = i18n(locale).components.bases;
  const cardSize = view.cardSize;
  const aspectRatio = view.imageAspectRatio ?? view.cardAspect;
  const imageFit = view.imageFit === "contain" ? "contain" : "cover";
  const gridStyle =
    typeof cardSize === "number" && cardSize > 0
      ? { gridTemplateColumns: `repeat(auto-fit, minmax(${cardSize}px, 1fr))` }
      : undefined;
  const imageOpts: ResolveImageOpts = { slug, allSlugs, linkResolution };
  const transformOpts = { strategy: linkResolution, allSlugs: allSlugs as FullSlug[] };

  return (
    <div class="bases-cards-wrapper">
      <div class="bases-view-meta">
        {formatMessage(localeStrings.showingCount, {
          count: entries.length,
          total,
        })}
      </div>
      <div class="bases-cards" style={gridStyle}>
        {entries.map((entry) => {
          const ctx = { slug, allSlugs, linkResolution };
          const imageValue = imageProperty
            ? resolveEntryPropertyValue(imageProperty, entry)
            : undefined;
          const rawImage = imageValue ? String(imageValue) : "";
          const { src: imageSrc, isColor } = resolveImageSrc(rawImage, imageOpts);
          // Obsidian's imageAspectRatio is height:width (posters use > 1), but the
          // CSS aspect-ratio property is width:height — so invert it.
          const imageAspect =
            typeof aspectRatio === "number" && aspectRatio > 0
              ? { aspectRatio: String(1 / aspectRatio) }
              : undefined;
          const href = transformLink(slug as FullSlug, entry.slug, transformOpts);
          // The card is a <div>, NOT an <a>: cell values (e.g. Directors) are
          // themselves links, and nesting <a> inside <a> is invalid HTML — browsers
          // auto-close the outer anchor and shatter the card. The title is the link.
          return (
            <div class="bases-card">
              {imageSrc && !isColor && (
                <div class="bases-card-image" style={imageAspect}>
                  <img
                    src={imageSrc}
                    alt={entry.title}
                    loading="lazy"
                    style={{ objectFit: imageFit }}
                  />
                </div>
              )}
              {imageSrc && isColor && (
                <div
                  class="bases-card-image bases-card-color"
                  style={{ ...imageAspect, backgroundColor: imageSrc }}
                />
              )}
              <div class="bases-card-body">
                <a
                  href={href}
                  class="bases-card-title internal internal-link"
                  data-slug={entry.slug}
                >
                  {entry.title}
                </a>
                <div class="bases-card-meta">
                  {cardMetaColumns.map((column) => {
                    const value = resolveEntryPropertyValue(column, entry);
                    if (isEmptyValue(value)) return null;
                    return (
                      <div class="bases-card-row">
                        <span class="bases-card-label">{getColumnLabel(column, basesData)}</span>
                        <span class="bases-card-value">{renderCellValue(value, ctx)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const cardsViewRegistration: ViewTypeRegistration = {
  id: "cards",
  name: "Cards",
  icon: "layout-grid",
  render: CardsView,
};

export { CardsView };
