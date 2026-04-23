import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CodeInput } from "./CodeInput";

const inputOTPMock = vi.fn();
const inputOTPGroupMock = vi.fn();
const inputOTPSlotMock = vi.fn();

vi.mock("@components/ui/input-otp", () => ({
  InputOTP: (props: {
    value: string;
    onChange: (value: string) => void;
    maxLength: number;
    className?: string;
    children: React.ReactNode;
  }) => inputOTPMock(props),
  InputOTPGroup: (props: { className?: string; children: React.ReactNode }) =>
    inputOTPGroupMock(props),
  InputOTPSlot: (props: { index: number; className?: string }) => inputOTPSlotMock(props),
}));

describe("CodeInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should pass value, change handler, and max length to InputOTP", () => {
    const onChange = vi.fn();

    inputOTPMock.mockImplementation(({ value, onChange: onChangeProp, children }) => (
      <div data-testid="otp-root">
        <button type="button" onClick={() => onChangeProp("654321")}>
          trigger-change
        </button>
        <span data-testid="otp-value">{value}</span>
        {children}
      </div>
    ));
    inputOTPGroupMock.mockImplementation(({ children }) => <div>{children}</div>);
    inputOTPSlotMock.mockImplementation(({ index }) => <div data-testid="otp-slot">{index}</div>);

    render(<CodeInput value="123456" onChange={onChange} />);

    expect(inputOTPMock).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "123456",
        onChange: expect.any(Function),
        maxLength: 6,
      }),
    );
    expect(screen.getByTestId("otp-value")).toHaveTextContent("123456");

    screen.getByRole("button", { name: "trigger-change" }).click();
    expect(onChange).toHaveBeenCalledWith("654321");
  });

  it("should render as many slots as provided by length", () => {
    inputOTPMock.mockImplementation(({ children }) => <div>{children}</div>);
    inputOTPGroupMock.mockImplementation(({ children }) => <div>{children}</div>);
    inputOTPSlotMock.mockImplementation(({ index }) => <div data-testid="otp-slot">{index}</div>);

    render(<CodeInput value="" onChange={vi.fn()} length={4} />);

    expect(screen.getAllByTestId("otp-slot")).toHaveLength(4);
  });

  it("should add error class to slots when error is true", () => {
    inputOTPMock.mockImplementation(({ children }) => <div>{children}</div>);
    inputOTPGroupMock.mockImplementation(({ children }) => <div>{children}</div>);
    inputOTPSlotMock.mockImplementation(({ className }) => (
      <div data-testid="otp-slot" className={className} />
    ));

    render(<CodeInput value="" onChange={vi.fn()} error />);

    const slotProps = inputOTPSlotMock.mock.calls.map((call) => call[0] as { className?: string });
    expect(slotProps.some((slot) => slot.className?.includes("border-red"))).toBe(true);
    expect(screen.getAllByTestId("otp-slot")[0]).toHaveClass("border-red");
  });
});
