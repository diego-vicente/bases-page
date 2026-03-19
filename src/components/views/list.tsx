import type { ComponentChild } from "preact";
import type { ViewRenderer, ViewTypeRegistration } from "../../types";
import { i18n } from "../../i18n";
import {
  getColumns,
  isEmptyValue,
  renderCellValue,
  resolveEntryPropertyValue,
} from "../shared/cell";
import { resolveRelative } from "../../util/path";

function formatMessage(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

const ListView: ViewRenderer = ({ entries, view, basesData, total, locale, slug }) => {
  const columns = getColumns(view, basesData, entries);
  const localeStrings = i18n(locale).components.bases;

  return (
    <div class="bases-list-wrapper">
      <div class="bases-view-meta">
        {formatMessage(localeStrings.showingCount, {
          count: entries.length,
          total,
        })}
      </div>
      <div class="bases-list-group">
        <div class="bases-list-group-list">
          {entries.map((entry) => {
            const ctx = { slug: entry.slug };
            const primaryColumn = columns[0] ?? "file.name";
            const secondaryColumns = columns.slice(1);

            const primaryValue: ComponentChild =
              primaryColumn === "file.name" ? (
                <a href={resolveRelative(slug, entry.slug)} class="internal" data-slug={entry.slug}>
                  {entry.title}
                </a>
              ) : (
                renderCellValue(resolveEntryPropertyValue(primaryColumn, entry), ctx)
              );

            const secondaryItems: ComponentChild[] = [];
            for (const column of secondaryColumns) {
              const value = resolveEntryPropertyValue(column, entry);
              if (isEmptyValue(value)) continue;
              secondaryItems.push(
                <span class="bases-list-property">
                  <span class="bases-rendered-value">{renderCellValue(value, ctx)}</span>
                </span>,
              );
            }

            return (
              <div class="bases-list-item">
                <div class="bases-list-item-properties">
                  <span class="bases-list-property">
                    <span class="list-bullet">-</span>
                    <span class="bases-rendered-value">{primaryValue}</span>
                  </span>
                  {secondaryItems.map((item) => (
                    <>
                      <span class="bases-list-separator">, </span>
                      {item}
                    </>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const listViewRegistration: ViewTypeRegistration = {
  id: "list",
  name: "List",
  icon: "list",
  render: ListView,
};

export { ListView };
