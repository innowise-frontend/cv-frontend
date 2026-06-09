import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SortOrder } from "@root/constants";
import { useUserTableColumns } from "./useUserTableColumns";

const navigateMock = vi.hoisted(() => vi.fn());

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigateMock,
}));

vi.mock("@root/hooks", () => ({
  useAuth: () => ({ isAdmin: true }),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock("@components/shared", () => ({
  TableColumnHeader: ({ title }: { title: string }) => (
    <span data-testid={`header-${title}`}>{title}</span>
  ),
  Avatar: () => <div data-testid="avatar" />,
  TableActions: () => <div data-testid="table-actions" />,
  ROUTES: { USER_PAGE: "/users/$userId" },
  Modal: ({ children }: { children: React.ReactNode }) => <div data-testid="modal">{children}</div>,
}));

vi.mock("./components/DeleteUserModal/DeleteUserModal", () => ({
  DeleteUserModal: () => <div data-testid="delete-user-modal" />,
}));

vi.mock("./components/UpdateUserModal/UpdateUserModal", () => ({
  UpdateUserModal: () => <div data-testid="update-user-modal" />,
}));

const defaultOptions = {
  currentSort: SortOrder.ASC,
  currentSortBy: "first_name" as const,
  onSort: vi.fn(),
};

describe("useUserTableColumns", () => {
  it("returns columns including an actions column last", () => {
    const { result } = renderHook(() => useUserTableColumns(defaultOptions));

    const { columns } = result.current;

    expect(columns).toHaveLength(7);
    expect(columns[columns.length - 1]?.id).toBe("actions");
  });
});
