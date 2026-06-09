import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Proficiency } from "@services/graphql/__generated__/graphql";
import { LanguagesEditor } from "./LanguagesEditor";

const useUserLanguagesQueryMock = vi.hoisted(() => vi.fn());
const useLanguagesQueryMock = vi.hoisted(() => vi.fn());

vi.mock("../../api", () => ({
  getProficiencyOptions: () => [{ label: "B2", value: "B2" }],
  useUserLanguagesQuery: (...args: unknown[]) => useUserLanguagesQueryMock(...args),
  useLanguagesQuery: (...args: unknown[]) => useLanguagesQueryMock(...args),
}));

vi.mock("../AddLanguageModal/AddLanguageModal", () => ({
  AddLanguageModal: () => <div>add-modal</div>,
}));

vi.mock("../RemoveLanguageModal/RemoveLanguageModal", () => ({
  RemoveLanguageModal: () => <div>remove-modal</div>,
}));

vi.mock("../LanguageProgressBar/LanguageProgressBar", () => ({
  LanguageProgressBar: ({ name, onClick }: { name: string; onClick?: () => void }) => (
    <button onClick={onClick}>{name}</button>
  ),
}));

vi.mock("@components/shared", () => ({
  Modal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Button: ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Spinner: () => <div data-testid="spinner" />,
}));

describe("LanguagesEditor", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useUserLanguagesQueryMock.mockReturnValue({
      data: { languages: [{ name: "English", proficiency: Proficiency.B2 }] },
      isLoading: false,
    });
    useLanguagesQueryMock.mockReturnValue({ data: { items: [{ name: "English" }] } });
  });

  it("shows spinner while profile languages are loading", () => {
    useUserLanguagesQueryMock.mockReturnValue({ data: undefined, isLoading: true });

    render(<LanguagesEditor userId="u-1" />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.queryByText("No data results")).not.toBeInTheDocument();
  });

  it("shows empty state only after loading when user has no languages", () => {
    useUserLanguagesQueryMock.mockReturnValue({ data: { languages: [] }, isLoading: false });

    render(<LanguagesEditor userId="u-1" />);

    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    expect(screen.getByText("No data results")).toBeInTheDocument();
  });

  it("renders user's languages and the add affordance by default", () => {
    render(<LanguagesEditor userId="u-1" />);

    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("add-modal")).toBeInTheDocument();
    expect(screen.queryByText("remove-modal")).not.toBeInTheDocument();
  });

  it("switches to delete mode and shows the remove modal", () => {
    render(<LanguagesEditor userId="u-1" />);

    fireEvent.click(screen.getByRole("button", { name: "Delete language" }));

    expect(screen.getByText("remove-modal")).toBeInTheDocument();
    expect(screen.queryByText("add-modal")).not.toBeInTheDocument();
  });

  it("returns from delete mode to default view via cancel", () => {
    render(<LanguagesEditor userId="u-1" />);

    fireEvent.click(screen.getByRole("button", { name: "Delete language" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.getByText("add-modal")).toBeInTheDocument();
    expect(screen.queryByText("remove-modal")).not.toBeInTheDocument();
  });
});
