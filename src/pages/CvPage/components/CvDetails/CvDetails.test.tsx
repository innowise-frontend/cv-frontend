import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { forwardRef } from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { CvDetails } from "../CvDetails/CvDetails";

const useCvQueryMock = vi.hoisted(() => vi.fn());
const updateCvMutationMock = vi.hoisted(() => vi.fn());
const invalidateQueriesMock = vi.hoisted(() => vi.fn());

const cvMock = {
  id: "cv-762",
  name: "Software Engineer",
  education: "Computer Systems Design",
  description: "Highly motivated engineer",
};

vi.mock("../../api", () => ({
  useCvQuery: (cvId: string) => useCvQueryMock(cvId),
}));

vi.mock("@tanstack/react-router", () => ({
  useParams: () => ({ cvId: "cv-762" }),
}));

vi.mock("@tanstack/react-query", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-query")>();

  return {
    ...actual,
    useQueryClient: () => ({
      invalidateQueries: invalidateQueriesMock,
    }),
  };
});

vi.mock("@root/pages/UserCvsPage/api", () => ({
  useUpdateCvMutation: ({ onSuccess }: { onSuccess?: () => Promise<void> }) => ({
    mutateAsync: async (...args: unknown[]) => {
      await updateCvMutationMock(...args);
      await onSuccess?.();
    },
    isPending: false,
  }),
}));

vi.mock("@root/pages/ErrorPage", () => ({
  ErrorPage: ({ error }: { error: string }) => <div data-testid="error-page">{error}</div>,
}));

vi.mock("@components/shared", () => ({
  Button: ({
    children,
    onClick,
    disabled,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }) => (
    <button type="button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  ),
  Input: forwardRef<
    HTMLInputElement,
    {
      label: string;
      value?: string;
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
  >(({ label, value, onChange }, ref) => (
    <input aria-label={label} ref={ref} value={value ?? ""} onChange={onChange} />
  )),
  Textarea: forwardRef<
    HTMLTextAreaElement,
    {
      label: string;
      value?: string;
      onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    }
  >(({ label, value, onChange }, ref) => (
    <textarea aria-label={label} ref={ref} value={value ?? ""} onChange={onChange} />
  )),
}));

describe("CvDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    updateCvMutationMock.mockResolvedValue(undefined);
    useCvQueryMock.mockReturnValue({
      data: cvMock,
      isLoading: false,
      isError: false,
    });
  });

  it("renders nothing while loading", () => {
    useCvQueryMock.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    const { container } = render(<CvDetails />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders ErrorPage when query fails or cv is missing", () => {
    useCvQueryMock.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(<CvDetails />);

    expect(screen.getByTestId("error-page")).toBeInTheDocument();
    expect(useCvQueryMock).toHaveBeenCalledWith("cv-762");
  });

  it("renders cv fields with loaded data", () => {
    render(<CvDetails />);

    expect(screen.getByLabelText("Name")).toHaveValue(cvMock.name);
    expect(screen.getByLabelText("Education")).toHaveValue(cvMock.education);
    expect(screen.getByLabelText("Description")).toHaveValue(cvMock.description);
  });

  it("disables update when there are no changes", () => {
    render(<CvDetails />);

    expect(screen.getByRole("button", { name: "Update" })).toBeDisabled();
  });

  it("disables update when a field is cleared", async () => {
    const user = userEvent.setup();

    render(<CvDetails />);

    await user.clear(screen.getByLabelText("Name"));

    expect(screen.getByRole("button", { name: "Update" })).toBeDisabled();
  });

  it("enables update when all fields are filled and values changed", async () => {
    const user = userEvent.setup();

    render(<CvDetails />);

    await user.clear(screen.getByLabelText("Name"));
    await user.type(screen.getByLabelText("Name"), "Updated name");

    expect(screen.getByRole("button", { name: "Update" })).toBeEnabled();
  });

  it("submits trimmed values and invalidates cv query", async () => {
    const user = userEvent.setup();

    render(<CvDetails />);

    await user.clear(screen.getByLabelText("Name"));
    await user.type(screen.getByLabelText("Name"), "  Updated name  ");

    await user.click(screen.getByRole("button", { name: "Update" }));

    await waitFor(() =>
      expect(updateCvMutationMock).toHaveBeenCalledWith({
        cvId: cvMock.id,
        name: "Updated name",
        education: cvMock.education,
        description: cvMock.description,
      }),
    );

    expect(invalidateQueriesMock).toHaveBeenCalledWith({ queryKey: ["cv", "cv-762"] });
  });
});
