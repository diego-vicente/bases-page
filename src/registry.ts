import type { ViewTypeRegistration, ViewRenderer } from "./types";

/**
 * Central registry for Bases view types.
 *
 * Built-in views (table, list, cards, gallery, board) are registered at plugin
 * init time. Community plugins can register additional view types by importing
 * this singleton and calling {@link viewRegistry.register}.
 *
 * @example Community plugin registering a custom view:
 * ```ts
 * import { viewRegistry } from "@quartz-community/bases-page";
 *
 * viewRegistry.register({
 *   id: "timeline",
 *   name: "Timeline",
 *   icon: "git-branch",
 *   render: ({ entries, view }) => <div class="bases-timeline">...</div>,
 * });
 * ```
 */
class ViewRegistry {
  private views = new Map<string, ViewTypeRegistration>();

  /**
   * Register a view type. If a view with the same ID already exists it is
   * silently replaced — this lets config-level `customViews` override built-in
   * renderers for the same type.
   */
  register(registration: ViewTypeRegistration): void {
    this.views.set(registration.id, registration);
  }

  /** Look up a registered view type by ID. */
  get(id: string): ViewTypeRegistration | undefined {
    return this.views.get(id);
  }

  /** Return all registered view types (insertion order). */
  getAll(): ViewTypeRegistration[] {
    return Array.from(this.views.values());
  }

  /** Check whether a view type is registered. */
  has(id: string): boolean {
    return this.views.has(id);
  }

  /** Remove a view type registration. Returns true if it existed. */
  unregister(id: string): boolean {
    return this.views.delete(id);
  }
}

/**
 * Singleton view registry instance.
 *
 * Community plugins import this to register custom view types.
 * Built-in views are registered by `registerBuiltinViews()` during plugin init.
 */
export const viewRegistry = new ViewRegistry();

/**
 * Convenience: bulk-register views from a `customViews` config record.
 * Called during plugin init to merge user-provided renderers into the registry.
 */
export function registerCustomViews(customs: Record<string, ViewRenderer>): void {
  for (const [id, render] of Object.entries(customs)) {
    viewRegistry.register({ id, name: id, render });
  }
}
