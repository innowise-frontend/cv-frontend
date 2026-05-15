import { describe, expect, it, vi } from "vitest";
import { columns } from "./columns";

vi.mock("@components/shared", () => ({
  Modal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TableActions: () => <div data-testid="table-actions" />,
  TableColumnHeader: ({ title }: { title: string }) => <span>{title}</span>,
}));

vi.mock("../../components", () => ({
  DeleteLanguageModal: () => <div data-testid="delete-language-modal" />,
  UpdateLanguageModal: () => <div data-testid="update-language-modal" />,
}));

vi.mock("@root/i18n/i18n", () => ({
  default: { t: (key: string) => key },
}));

describe("LanguagesTable columns", () => {
  it("defines four columns with actions last", () => {
    expect(columns).toHaveLength(4);
    expect(columns[3]?.id).toBe("actions");
  });
});
