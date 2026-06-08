import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { CvPage } from "./CvPage";

const navigateMock = vi.hoisted(() => vi.fn());
const useCvQueryMock = vi.hoisted(() => vi.fn());
const useAuthMock = vi.hoisted(() => vi.fn());

const cvMock = {
  id: "cv-762",
  name: "Software Engineer with 5+ years of experience",
  education: "Computer Systems Design",
  description: "Highly motivated and experienced Software Engineer",
};

vi.mock("@root/hooks", () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock("./api", () => ({
  useCvQuery: (cvId: string) => useCvQueryMock(cvId),
}));

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigateMock,
  useParams: () => ({ cvId: "cv-762" }),
  useRouterState: ({ select }: { select: (s: { location: { pathname: string } }) => string }) =>
    select({ location: { pathname: "/cvs/cv-762/details" } }),
}));

vi.mock("@root/pages/ErrorPage", () => ({
  ErrorPage: ({ error }: { error: string }) => <div data-testid="error-page">{error}</div>,
}));

vi.mock("@components/shared", () => ({
  Spinner: () => <div data-testid="spinner" />,
  Breadcrumbs: ({ items }: { items: Array<{ label: string; href: string }> }) => (
    <nav data-testid="breadcrumbs">
      {items.map((item) => (
        <span key={item.href} data-href={item.href}>
          {item.label}
        </span>
      ))}
    </nav>
  ),
}));

vi.mock("@components/shared/Tabs/Tabs", () => ({
  PageTabs: ({
    children,
    onValueChange,
    value,
    tabs,
  }: {
    children: React.ReactNode;
    onValueChange: (next: string) => void;
    value: string;
    tabs: Array<{ value: string; label: string }>;
  }) => (
    <div data-testid="page-tabs" data-active={value} data-tab-count={tabs.length}>
      <button type="button" onClick={() => onValueChange("skills")}>
        switch-skills
      </button>
      {children}
    </div>
  ),
}));

describe("CvPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthMock.mockReturnValue({ userId: "u-1", isAdmin: true });
    useCvQueryMock.mockReturnValue({
      data: cvMock,
      isLoading: false,
      isError: false,
    });
  });

  it("renders Spinner while loading", () => {
    useCvQueryMock.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(
      <CvPage>
        <div>tab-body</div>
      </CvPage>,
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders ErrorPage when query fails or cv is missing", () => {
    useCvQueryMock.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(
      <CvPage>
        <div>tab-body</div>
      </CvPage>,
    );

    expect(screen.getByTestId("error-page")).toBeInTheDocument();
    expect(useCvQueryMock).toHaveBeenCalledWith("cv-762");
  });

  it("renders breadcrumbs with cvs list, cv name, and active tab", () => {
    render(
      <CvPage>
        <div data-testid="tab-body">tab-body</div>
      </CvPage>,
    );

    expect(screen.getByTestId("breadcrumbs")).toBeInTheDocument();
    expect(screen.getByText("CVs")).toHaveAttribute("data-href", "/cvs");
    expect(screen.getByText(cvMock.name)).toHaveAttribute("data-href", "/cvs/cv-762/details");
    expect(screen.getByText("Details")).toHaveAttribute("data-href", "/cvs/cv-762/details");
    expect(screen.getByTestId("tab-body")).toBeInTheDocument();
    expect(screen.getByTestId("page-tabs")).toHaveAttribute("data-tab-count", "4");
    expect(screen.getByTestId("page-tabs")).toHaveAttribute("data-active", "details");
  });

  it("navigates when tab value changes", async () => {
    const user = userEvent.setup();

    render(
      <CvPage>
        <div>content</div>
      </CvPage>,
    );

    await user.click(screen.getByRole("button", { name: "switch-skills" }));

    expect(navigateMock).toHaveBeenCalledWith({
      to: "/cvs/$cvId/skills",
      params: { cvId: "cv-762" },
    });
  });
});
