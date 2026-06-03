import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { UpdateProjectModal } from "./UpdateProjectModal";

const mutateMock = vi.hoisted(() => vi.fn());

vi.mock("@components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: vi.fn() }),
}));

vi.mock("../../api", () => ({
  useUpdateProjectMutation: () => ({ mutate: mutateMock, isPending: false }),
  useProjectSkillsQuery: () => ({
    data: { items: [{ name: "React" }] },
  }),
}));

vi.mock("@components/shared", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@components/shared")>();

  return {
    ...actual,
    Modal: {
      Trigger: ({ children }: { children: ReactNode }) => <button>{children}</button>,
      Content: ({ children }: { children: ReactNode }) => <div>{children}</div>,
      Header: ({ children }: { children: ReactNode }) => <h2>{children}</h2>,
      Body: ({ children }: { children: ReactNode }) => <div>{children}</div>,
      Footer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
      Close: ({ children }: { children: ReactNode }) => <button type="button">{children}</button>,
    },
    Button: ({
      children,
      disabled,
      type,
    }: {
      children: ReactNode;
      disabled?: boolean;
      type?: "submit" | "button";
    }) => (
      <button type={type ?? "button"} disabled={disabled}>
        {children}
      </button>
    ),
    DatePicker: ({
      label,
      value,
      onChange,
      onBlur,
    }: {
      label: string;
      value: string;
      onChange: (value: string) => void;
      onBlur?: () => void;
    }) => (
      <input
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
    ),
    MultiSelect: ({
      label,
      data,
      onChange,
    }: {
      label: string;
      data: string[];
      onChange: (value: string[]) => void;
    }) => (
      <button type="button" aria-label={label} onClick={() => onChange(data)}>
        select-env
      </button>
    ),
  };
});

const initialValues = {
  name: "CV App",
  domain: "Web",
  description: "Internal CV tool",
  startDate: "01/01/2025",
  endDate: "",
  environment: ["React"],
};

const defaultProps = { projectId: "proj-1", initialValues };

describe("UpdateProjectModal", () => {
  it("disables submit button when form is unchanged", () => {
    render(<UpdateProjectModal {...defaultProps} />);

    expect(screen.getByRole("button", { name: "Update" })).toBeDisabled();
  });

  it("submits updated project payload with API dates", async () => {
    render(<UpdateProjectModal {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByLabelText("Name")).toHaveValue("CV App");
    });

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "CV Platform" } });
    fireEvent.blur(screen.getByLabelText("Name"));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Update" })).not.toBeDisabled();
    });

    fireEvent.submit(screen.getByRole("button", { name: "Update" }).closest("form")!);

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith({
        projectId: "proj-1",
        name: "CV Platform",
        domain: "Web",
        description: "Internal CV tool",
        start_date: "2025-01-01",
        end_date: null,
        environment: ["React"],
      });
    });
  });
});
