import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import type { BasesData, BasesPageOptions } from "../types";
import { resolveBasesEntries } from "../resolver";
import { i18n } from "../i18n";
import { registerCustomViews, viewRegistry } from "../registry";
import { ViewSelector } from "./ViewSelector";
import { registerBuiltinViews } from "./views";
import style from "./styles/bases.scss";
// @ts-expect-error inline script import handled by esbuild plugin
import script from "./scripts/bases.inline.ts";

let builtinViewsRegistered = false;

export default ((opts?: BasesPageOptions) => {
  const Component: QuartzComponent = (props: QuartzComponentProps) => {
    const locale = props.cfg?.locale ?? "en-US";
    const localeStrings = i18n(locale).components.bases;
    const fileData = props.fileData as { basesData?: BasesData; basesOptions?: BasesPageOptions };
    const basesData = fileData.basesData;
    const basesOptions = fileData.basesOptions ?? opts;

    if (!basesData) {
      return <div class="bases-page bases-empty">{localeStrings.noData}</div>;
    }

    const views = basesData.views ?? [];
    if (views.length === 0) {
      return <div class="bases-page bases-empty">{localeStrings.noViews}</div>;
    }

    const preferredType = basesOptions?.defaultViewType ?? "table";
    const initialIndex = Math.max(
      0,
      views.findIndex((view) => view.type === preferredType),
    );
    if (!builtinViewsRegistered) {
      registerBuiltinViews();
      builtinViewsRegistered = true;
    }

    if (basesOptions?.customViews) {
      registerCustomViews(basesOptions.customViews);
    }

    return (
      <div class="bases-page" data-initial-view={initialIndex}>
        <ViewSelector views={views} activeIndex={initialIndex} locale={locale} />
        <div class="bases-view-container">
          {views.map((view, index) => {
            const { entries, total } = resolveBasesEntries(basesData, props.allFiles, view);
            const registration = viewRegistry.get(view.type);
            const Renderer = registration?.render;
            return (
              <div
                class={`bases-view ${index === initialIndex ? "is-active" : ""}`}
                data-view-index={index}
                data-view-type={view.type}
              >
                {entries.length === 0 ? (
                  <div class="bases-empty">{localeStrings.noData}</div>
                ) : Renderer ? (
                  <Renderer
                    entries={entries}
                    view={view}
                    basesData={basesData}
                    total={total}
                    locale={locale}
                  />
                ) : (
                  <div class="bases-empty">Unknown view type: {view.type}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  Component.css = style;
  Component.afterDOMLoaded = script;

  return Component;
}) satisfies QuartzComponentConstructor<BasesPageOptions>;
