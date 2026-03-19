import { describe, it, expect } from "vitest";
import {
  formatValue,
  isEmptyValue,
  getColumnLabel,
  resolveEntryPropertyValue,
  getColumns,
  renderCellValue,
} from "../src/components/shared/cell";
import type { BasesData, BasesEntry, BasesView } from "../src/types";

const sampleEntry: BasesEntry = {
  slug: "notes/alpha",
  title: "Alpha",
  properties: { status: "done", priority: 5, tags: ["work", "important"] },
  fileProperties: {
    name: "alpha.md",
    basename: "alpha",
    path: "notes/alpha.md",
    folder: "notes",
    ext: "md",
    tags: ["work"],
    links: ["beta"],
  },
  formulaValues: { doubled: 10, label: "high" },
};

describe("formatValue", () => {
  it("returns empty string for null/undefined", () => {
    expect(formatValue(null)).toBe("");
    expect(formatValue(undefined)).toBe("");
  });

  it("joins arrays", () => {
    expect(formatValue(["a", "b"])).toBe("a, b");
  });

  it("stringifies objects", () => {
    expect(formatValue({ key: "val" })).toBe('{"key":"val"}');
  });

  it("converts primitives to string", () => {
    expect(formatValue(42)).toBe("42");
    expect(formatValue(true)).toBe("true");
    expect(formatValue("hello")).toBe("hello");
  });
});

describe("isEmptyValue", () => {
  it("detects empty values", () => {
    expect(isEmptyValue(null)).toBe(true);
    expect(isEmptyValue(undefined)).toBe(true);
    expect(isEmptyValue("")).toBe(true);
    expect(isEmptyValue([])).toBe(true);
  });

  it("detects non-empty values", () => {
    expect(isEmptyValue("text")).toBe(false);
    expect(isEmptyValue(0)).toBe(false);
    expect(isEmptyValue([1])).toBe(false);
    expect(isEmptyValue(false)).toBe(false);
  });
});

describe("getColumnLabel", () => {
  it("uses displayName when set", () => {
    const basesData: BasesData = {
      properties: { status: { displayName: "Task Status" } },
    };
    expect(getColumnLabel("status", basesData)).toBe("Task Status");
  });

  it("capitalizes last segment by default", () => {
    const basesData: BasesData = {};
    expect(getColumnLabel("note.my_property", basesData)).toBe("My Property");
  });

  it("handles simple names", () => {
    const basesData: BasesData = {};
    expect(getColumnLabel("priority", basesData)).toBe("Priority");
  });
});

describe("resolveEntryPropertyValue", () => {
  it("resolves note.* properties", () => {
    expect(resolveEntryPropertyValue("note.status", sampleEntry)).toBe("done");
  });

  it("resolves file.* properties", () => {
    expect(resolveEntryPropertyValue("file.name", sampleEntry)).toBe("alpha.md");
    expect(resolveEntryPropertyValue("file.folder", sampleEntry)).toBe("notes");
  });

  it("resolves formula.* properties", () => {
    expect(resolveEntryPropertyValue("formula.doubled", sampleEntry)).toBe(10);
    expect(resolveEntryPropertyValue("formula.label", sampleEntry)).toBe("high");
  });

  it("falls back to frontmatter for unprefixed columns", () => {
    expect(resolveEntryPropertyValue("priority", sampleEntry)).toBe(5);
  });
});

describe("getColumns", () => {
  it("returns view order when specified", () => {
    const view: BasesView = { type: "table", order: ["status", "priority"] };
    const basesData: BasesData = {};
    expect(getColumns(view, basesData, [])).toEqual(["status", "priority"]);
  });

  it("derives columns from basesData properties", () => {
    const view: BasesView = { type: "table" };
    const basesData: BasesData = {
      properties: { status: {}, priority: {} },
    };
    expect(getColumns(view, basesData, [])).toEqual(["file.name", "status", "priority"]);
  });

  it("derives columns from entry properties when no config", () => {
    const view: BasesView = { type: "table" };
    const basesData: BasesData = {};
    expect(getColumns(view, basesData, [sampleEntry])).toEqual([
      "file.name",
      "status",
      "priority",
      "tags",
    ]);
  });
});

describe("renderCellValue", () => {
  const ctx = { slug: "notes/alpha" };

  it("renders null as empty marker", () => {
    const result = renderCellValue(null, ctx) as { type: string; props: Record<string, unknown> };
    expect(result.props.class).toBe("bases-empty");
  });

  it("renders booleans as disabled checkboxes", () => {
    const result = renderCellValue(true, ctx) as { type: string; props: Record<string, unknown> };
    expect(result.type).toBe("input");
    expect(result.props.checked).toBe(true);
    expect(result.props.disabled).toBe(true);
  });

  it("renders numbers with bases-number class", () => {
    const result = renderCellValue(42, ctx) as { type: string; props: Record<string, unknown> };
    expect(result.props.class).toBe("bases-number");
  });

  it("renders strings with bases-text class", () => {
    const result = renderCellValue("hello", ctx) as {
      type: string;
      props: Record<string, unknown>;
    };
    expect(result.props.class).toBe("bases-text");
  });

  it("renders arrays as bases-list", () => {
    const result = renderCellValue(["a", "b"], ctx) as {
      type: string;
      props: Record<string, unknown>;
    };
    expect(result.props.class).toBe("bases-list");
  });

  it("renders file objects as internal links", () => {
    const fileObj = {
      name: "apple.md",
      basename: "apple",
      path: "Compendium/Species/Dryad/apple.md",
      folder: "Compendium/Species/Dryad",
      ext: "md",
      tags: ["lineage"],
      links: [],
    };
    const result = renderCellValue(fileObj, ctx) as {
      type: string;
      props: Record<string, unknown>;
      children?: unknown[];
    };
    expect(result.type).toBe("a");
    expect(result.props.class).toBe("internal");
    expect(typeof result.props.href).toBe("string");
  });

  it("renders an array of file objects as a list of links", () => {
    const files = [
      {
        name: "apple.md",
        basename: "apple",
        path: "Species/Dryad/apple.md",
        folder: "Species/Dryad",
        ext: "md",
        tags: ["lineage"],
        links: [],
      },
      {
        name: "cherry.md",
        basename: "cherry",
        path: "Species/Dryad/cherry.md",
        folder: "Species/Dryad",
        ext: "md",
        tags: ["lineage"],
        links: [],
      },
    ];
    const result = renderCellValue(files, ctx) as {
      type: string;
      props: { class: string; children: unknown[] };
    };
    expect(result.props.class).toBe("bases-list");
  });

  it("renders generic objects as JSON code", () => {
    const obj = { unknown: "value" };
    const result = renderCellValue(obj, ctx) as { type: string };
    expect(result.type).toBe("code");
  });
});
