import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useMobileDevice } from "./useMobileDevice";

describe("useMobileDevice", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns true for mobile user agents", async () => {
    vi.spyOn(window.navigator, "userAgent", "get").mockReturnValue(
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
    );

    const { result } = renderHook(() => useMobileDevice());

    await waitFor(() => {
      expect(result.current.isMobileDevice).toBe(true);
    });
  });

  it("returns false for desktop user agents", async () => {
    vi.spyOn(window.navigator, "userAgent", "get").mockReturnValue(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    );

    const { result } = renderHook(() => useMobileDevice());

    await waitFor(() => {
      expect(result.current.isMobileDevice).toBe(false);
    });
  });
});
