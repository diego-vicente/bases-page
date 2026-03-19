import type { ViewRenderer, ViewTypeRegistration } from "../../types";
import { i18n } from "../../i18n";
import {
  getColumnLabel,
  getColumns,
  isEmptyValue,
  renderCellValue,
  resolveEntryPropertyValue,
} from "../shared/cell";
import { resolveRelative, slugifyPath } from "../../util/path";

function formatMessage(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

const HEX_COLOR_RE = /^#(?:[0-9a-f]{3}){1,2}$/i;
const WIKILINK_RE = /^\[\[(.+?)(?:\|.*)?\]\]$/;

export function resolveImageSrc(raw: string, slug: string): { src: string; isColor: boolean } {
  if (!raw) return { src: "", isColor: false };

  if (HEX_COLOR_RE.test(raw)) {
    return { src: raw, isColor: true };
  }

  const wikiMatch = WIKILINK_RE.exec(raw);
  if (wikiMatch?.[1]) {
    const target = wikiMatch[1].trim();
    const resolved = resolveRelative(slug, slugifyPath(target));
    return { src: resolved, isColor: false };
  }

  return { src: raw, isColor: false };
}

const CardsView: ViewRenderer = ({ entries, view, basesData, total, locale, slug }) => {
  const imageProperty = typeof view.image === "string" ? view.image : undefined;
  const columns = getColumns(view, basesData, entries).filter((column) => column !== imageProperty);
  const localeStrings = i18n(locale).components.bases;
  const cardSize = view.cardSize;
  const aspectRatio = view.imageAspectRatio ?? view.cardAspect;
  const imageFit = view.imageFit === "contain" ? "contain" : "cover";
  const gridStyle =
    typeof cardSize === "number" && cardSize > 0
      ? { gridTemplateColumns: `repeat(auto-fit, minmax(${cardSize}px, 1fr))` }
      : undefined;

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
          const ctx = { slug: entry.slug };
          const imageValue = imageProperty
            ? resolveEntryPropertyValue(imageProperty, entry)
            : undefined;
          const rawImage = imageValue ? String(imageValue) : "";
          const { src: imageSrc, isColor } = resolveImageSrc(rawImage, slug);
          const imageAspect =
            typeof aspectRatio === "number" && aspectRatio > 0
              ? { aspectRatio: String(aspectRatio) }
              : undefined;
          const href = resolveRelative(slug, entry.slug);
          return (
            <a href={href} class="internal bases-card" data-slug={entry.slug}>
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
                <span class="bases-card-title">{entry.title}</span>
                <div class="bases-card-meta">
                  {columns.map((column) => {
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
            </a>
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
