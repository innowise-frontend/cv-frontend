import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AuthForm } from "./AuthForm";

describe("AuthForm", () => {
  it("should render email and password fields and the submit label", () => {
    render(<AuthForm onSubmit={vi.fn()} label="Sign in" />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("should show validation errors when submitted empty", async () => {
    const user = userEvent.setup();
    render(<AuthForm onSubmit={vi.fn()} label="Submit" />);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText("Please enter an email address")).toBeInTheDocument();
    expect(screen.getByText("Please enter a password")).toBeInTheDocument();
  });

  it("should show an error for an invalid email", async () => {
    const user = userEvent.setup();
    render(<AuthForm onSubmit={vi.fn()} label="Submit" />);

    await user.type(screen.getByPlaceholderText("Email"), "not-an-email");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText("Invalid email address")).toBeInTheDocument();
  });

  it("should show an error when the password is too short", async () => {
    const user = userEvent.setup();
    render(<AuthForm onSubmit={vi.fn()} label="Submit" />);

    await user.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "12345");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByText("Password must be at least 6 characters long"),
    ).toBeInTheDocument();
  });

  it("should call onSubmit with trimmed values when valid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<AuthForm onSubmit={onSubmit} label="Go" />);

    await user.type(screen.getByPlaceholderText("Email"), "  user@example.com  ");
    await user.type(screen.getByPlaceholderText("Password"), "  secret12  ");
    await user.click(screen.getByRole("button", { name: "Go" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit).toHaveBeenCalledWith(
      { email: "user@example.com", password: "secret12" },
      expect.anything(),
    );
  });

  it("should not call onSubmit when validation fails", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<AuthForm onSubmit={onSubmit} label="Submit" />);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await screen.findByText("Please enter an email address");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should render confirm password field in signup mode", () => {
    render(<AuthForm onSubmit={vi.fn()} label="Create account" isSignup />);

    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
  });

  it("should show an error when passwords do not match in signup mode", async () => {
    const user = userEvent.setup();
    render(<AuthForm onSubmit={vi.fn()} label="Create account" isSignup />);

    await user.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "secret12");
    await user.type(screen.getByPlaceholderText("Confirm Password"), "different");
    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(await screen.findByText("Passwords don't match")).toBeInTheDocument();
  });

  it("should call onSubmit without confirmPassword in signup mode", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<AuthForm onSubmit={onSubmit} label="Create account" isSignup />);

    await user.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "secret12");
    await user.type(screen.getByPlaceholderText("Confirm Password"), "secret12");
    await user.click(screen.getByRole("button", { name: "Create account" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit).toHaveBeenCalledWith(
      { email: "user@example.com", password: "secret12" },
      expect.anything(),
    );
  });
});
