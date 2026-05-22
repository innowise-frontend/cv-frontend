import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthPage } from "./AuthPage";

const mockNavigate = vi.hoisted(() => vi.fn());
const mockSearchState = vi.hoisted(() => ({ mode: "login" as "login" | "signup" }));

vi.mock("@tanstack/react-router", () => ({
  useSearch: () => mockSearchState,
  useNavigate: () => mockNavigate,
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        "page.login.tab": "Sign in",
        "page.signup.tab": "Sign up",
      };

      return map[key] ?? key;
    },
  }),
}));

vi.mock("@components/Login", () => ({
  Login: () => <div>Login form stub</div>,
}));

vi.mock("@components/Signup", () => ({
  Signup: () => <div>Signup form stub</div>,
}));

function renderAuthPage() {
  return render(<AuthPage />);
}

describe("AuthPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchState.mode = "login";
  });

  it("should render sign-in and sign-up tabs", () => {
    renderAuthPage();

    expect(screen.getByRole("tab", { name: "Sign in" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Sign up" })).toBeInTheDocument();
  });

  it("should show the login panel when search mode is login", () => {
    mockSearchState.mode = "login";
    renderAuthPage();

    expect(screen.getByRole("tabpanel", { name: "Sign in" })).toHaveTextContent("Login form stub");
  });

  it("should show the signup panel when search mode is signup", () => {
    mockSearchState.mode = "signup";
    renderAuthPage();

    expect(screen.getByRole("tabpanel", { name: "Sign up" })).toHaveTextContent("Signup form stub");
  });

  it("should navigate with updated search when Sign up tab is selected", async () => {
    const user = userEvent.setup();
    mockSearchState.mode = "login";
    renderAuthPage();

    await user.click(screen.getByRole("tab", { name: "Sign up" }));

    expect(mockNavigate).toHaveBeenCalledWith({
      to: "/auth",
      search: { mode: "signup" },
    });
  });

  it("should navigate with updated search when Sign in tab is selected", async () => {
    const user = userEvent.setup();
    mockSearchState.mode = "signup";
    renderAuthPage();

    await user.click(screen.getByRole("tab", { name: "Sign in" }));

    expect(mockNavigate).toHaveBeenCalledWith({
      to: "/auth",
      search: { mode: "login" },
    });
  });
});
