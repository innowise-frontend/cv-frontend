import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Skills } from "./Skills";

const useParamsMock = vi.hoisted(() => vi.fn());
const useAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@tanstack/react-router", () => ({
  useParams: () => useParamsMock(),
}));

vi.mock("@root/hooks", () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock("./components/ProfileSkillsEditor/ProfileSkillsEditor", () => ({
  ProfileSkillsEditor: () => <div>editor</div>,
}));

vi.mock("./components/ProfileSkillsView/ProfileSkillsView", () => ({
  ProfileSkillsView: () => <div>viewer</div>,
}));

describe("UserProfile Skills", () => {
  it("renders editor when admin views any profile", () => {
    useParamsMock.mockReturnValue({ userId: "u-2" });
    useAuthMock.mockReturnValue({ userId: "u-1", isAdmin: true });

    render(<Skills />);

    expect(screen.getByText("editor")).toBeInTheDocument();
    expect(screen.queryByText("viewer")).not.toBeInTheDocument();
  });

  it("renders editor when viewer is the profile owner", () => {
    useParamsMock.mockReturnValue({ userId: "u-1" });
    useAuthMock.mockReturnValue({ userId: "u-1", isAdmin: false });

    render(<Skills />);

    expect(screen.getByText("editor")).toBeInTheDocument();
  });

  it("renders read-only view for a non-owner non-admin viewer", () => {
    useParamsMock.mockReturnValue({ userId: "u-2" });
    useAuthMock.mockReturnValue({ userId: "u-1", isAdmin: false });

    render(<Skills />);

    expect(screen.getByText("viewer")).toBeInTheDocument();
    expect(screen.queryByText("editor")).not.toBeInTheDocument();
  });
});
