import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { Proficiency } from "@services/graphql/__generated__/graphql";
import { LanguagesPage } from "./LanguagesPage";

const useAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@root/hooks", () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock("@tanstack/react-router", () => ({
  useLocation: () => ({ pathname: "/_app/languages" }),
}));

vi.mock("@root/lib", async () => {
  const actual = await vi.importActual<object>("@root/lib");

  return {
    ...actual,
    getBreadcrumbsLink: () => ({ title: "languages", href: "/_app/languages" }),
  };
});

vi.mock("./api", () => ({
  getProficiencyOptions: () => [{ label: "B2", value: "B2" }],
  useUserLanguagesQuery: () => ({
    data: { languages: [{ name: "English", proficiency: Proficiency.B2 }] },
  }),
  useLanguagesQuery: () => ({ data: { items: [{ name: "English" }] } }),
}));

vi.mock("./components", () => ({
  AddLanguageModal: () => <div>add-modal</div>,
  RemoveLanguageModal: () => <div>remove-modal</div>,
  LanguageProgressBar: ({ name }: { name: string }) => <div>{name}</div>,
  LanguagesTable: () => <div>languages-table</div>,
}));

vi.mock("@components/shared", () => ({
  Breadcrumbs: () => <div>breadcrumbs</div>,
  Modal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Button: ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe("LanguagesPage", () => {
  it("renders admin table", () => {
    useAuthMock.mockReturnValue({ userId: "u-1", isAdmin: true });
    render(<LanguagesPage />);
    expect(screen.getByText("languages-table")).toBeInTheDocument();
  });

  it("renders user content and toggles delete mode", () => {
    useAuthMock.mockReturnValue({ userId: "u-1", isAdmin: false });
    render(<LanguagesPage />);

    expect(screen.getByText("English")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Delete language" }));
    expect(screen.getByText("remove-modal")).toBeInTheDocument();
  });
});
