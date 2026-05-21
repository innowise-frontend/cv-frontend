import { describe, expect, it, vi } from "vitest";
import { buildColumns } from "./columns";

vi.mock("@components/shared", () => ({
  Modal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TableActions: () => <div data-testid="table-actions" />,
  TableColumnHeader: ({ title }: { title: string }) => <span>{title}</span>,
}));

vi.mock("../index", () => ({
  DeleteSkillModal: () => <div data-testid="delete-skill-modal" />,
  UpdateSkillModal: () => <div data-testid="update-skill-modal" />,
}));

vi.mock("@root/i18n/i18n", () => ({
  default: { t: (key: string) => key },
}));

describe("buildColumns", () => {
  it("returns 4 columns", () => {
    const columns = buildColumns(undefined);
    expect(columns).toHaveLength(4);
  });

  it("last column is actions", () => {
    const columns = buildColumns(undefined);
    expect(columns[3]?.id).toBe("actions");
  });

  it("second column is category_type", () => {
    const columns = buildColumns(undefined);
    expect(columns[1]?.id).toBe("category_type");
  });

  it("third column is category", () => {
    const columns = buildColumns(undefined);
    expect(columns[2]?.id).toBe("category");
  });

  it("accepts undefined categories without throwing", () => {
    expect(() => buildColumns(undefined)).not.toThrow();
  });

  it("accepts an empty categories array", () => {
    expect(() => buildColumns([])).not.toThrow();
  });
});
