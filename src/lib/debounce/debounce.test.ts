import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { debounce } from "./debounce";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("should not call callback immediately", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 300);

    debounced("value");

    expect(callback).not.toHaveBeenCalled();
  });

  it("should call callback after wait time", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 300);

    debounced("value");
    vi.advanceTimersByTime(299);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("value");
  });

  it("should reset timer on rapid consecutive calls", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 300);

    debounced("first");
    vi.advanceTimersByTime(150);
    debounced("second");
    vi.advanceTimersByTime(150);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(150);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("second");
  });

  it("should pass through all arguments from latest call", () => {
    const callback = vi.fn<(query: string, page: number) => void>();
    const debounced = debounce(callback, 200);

    debounced("anna", 2);
    debounced("john", 4);

    vi.advanceTimersByTime(200);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("john", 4);
  });
});
