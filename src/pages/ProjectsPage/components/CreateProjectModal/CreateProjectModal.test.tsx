import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { CreateProjectModal } from "./CreateProjectModal";

const mutateMock = vi.hoisted(() => vi.fn());

vi.mock("@assets/icon/PlusIcon.svg?react", () => ({
  default: () => <span>plus</span>,
}));

vi.mock("@components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: vi.fn() }),
}));

vi.mock("../../api", () => ({
  useCreateProjectMutation: () => ({ mutate: mutateMock, isPending: false }),
  useProjectSkillsQuery: () => ({
    data: { items: [{ name: "React" }] },
  }),
  useProjectRoleOptionsQuery: () => ({ data: [] }),
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
    MultiSelect: ({ label, onChange }: { label: string; onChange: (value: string[]) => void }) => (
      <button type="button" aria-label={label} onClick={() => onChange(["React"])}>
        select-env
      </button>
    ),
  };
});

const fillRequiredFields = async () => {
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "CV App" } });
  fireEvent.blur(screen.getByLabelText("Name"));
  fireEvent.change(screen.getByLabelText("Domain"), { target: { value: "Web" } });
  fireEvent.blur(screen.getByLabelText("Domain"));
  fireEvent.change(screen.getByLabelText("Description"), { target: { value: "Internal CV tool" } });
  fireEvent.blur(screen.getByLabelText("Description"));
  fireEvent.change(screen.getByLabelText("Start Date"), { target: { value: "01/01/2025" } });
  fireEvent.blur(screen.getByLabelText("Start Date"));
  fireEvent.click(screen.getByRole("button", { name: "Technologies" }));

  await waitFor(() => {
    expect(screen.getByRole("button", { name: "Create" })).not.toBeDisabled();
  });
};

describe("CreateProjectModal", () => {
  it("disables submit button when form is empty", () => {
    render(<CreateProjectModal />);

    expect(screen.getByRole("button", { name: "Create" })).toBeDisabled();
  });

  it("submits create project payload with API dates", async () => {
    render(<CreateProjectModal />);

    await fillRequiredFields();
    fireEvent.submit(screen.getByRole("button", { name: "Create" }).closest("form")!);

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith({
        name: "CV App",
        domain: "Web",
        description: "Internal CV tool",
        start_date: "2025-01-01",
        end_date: null,
        environment: ["React"],
      });
    });
  });
});
