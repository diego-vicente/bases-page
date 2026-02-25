# @quartz-community/bases-page

A page type and component plugin that provides support for [Obsidian Bases](https://obsidian.md/changelog/2025-04-15-desktop-v1.8.0/) (`.base` files) in Quartz. It reads `.base` files from your vault, resolves matching notes based on the query definition, and renders them as interactive database-like views with support for tables, lists, cards, and maps.

## Installation

```bash
npx quartz plugin add github:quartz-community/bases-page
```

## Usage

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/bases-page
    enabled: true
```

For advanced use cases (e.g. custom view renderers), you can override in TypeScript:

```ts title="quartz.ts (override)"
import * as ExternalPlugin from "./.quartz/plugins";

ExternalPlugin.BasesPage({
  defaultViewType: "table",
  customViews: {
    myView: ({ entries, view, basesData, total, locale }) => {
      // return JSX
    },
  },
});
```

## Features

- **Table view**: Sortable columns with automatic type rendering (strings, numbers, booleans, arrays, links).
- **List view**: Compact list with metadata chips for each entry.
- **Cards view**: Card layout with optional image property support.
- **Map view**: Placeholder for future map-based visualization.
- **Multiple views**: A single `.base` file can define multiple views, displayed as switchable tabs.
- **Filters**: Recursive filter trees with `and`/`or`/`not` operators.
- **Formulas**: Computed properties via formula expressions.
- **Summaries**: Column-level aggregations (Sum, Average, Min, Max, Median, etc.).
- **Property configuration**: Custom display names for properties.
- **Link rendering**: Wikilinks and Markdown links within cell values are rendered as clickable links.

## Configuration

| Option            | Type     | Default   | Description                                                                       |
| ----------------- | -------- | --------- | --------------------------------------------------------------------------------- |
| `defaultViewType` | `string` | `"table"` | The default view type when none is specified in the `.base` file.                 |
| `customViews`     | `object` | `{}`      | A map of custom view renderers. Keys are view type names. Requires a TS override. |

## Documentation

See the [Quartz documentation](https://quartz.jzhao.xyz/plugins/BasesPage) for more information.

## License

MIT
