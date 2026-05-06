import { afterEach, describe, expect, it } from "vitest";
import { getMobileDevice } from "./getMobileDevice";

const initialUserAgent = navigator.userAgent;

const setUserAgent = (userAgent: string) => {
  Object.defineProperty(window.navigator, "userAgent", {
    value: userAgent,
    configurable: true,
  });
};

describe("getMobileDevice", () => {
  afterEach(() => {
    setUserAgent(initialUserAgent);
  });

  it("should return true for known mobile device user agents", () => {
    setUserAgent(
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1",
    );

    expect(getMobileDevice()).toBe(true);
  });

  it("should return true when user agent contains Mobile", () => {
    setUserAgent("Mozilla/5.0 (Linux; U; en-us) AppleWebKit/525.13. Mobile Safari/525.13");

    expect(getMobileDevice()).toBe(true);
  });

  it("should return false for desktop user agents", () => {
    setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5_0) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",
    );

    expect(getMobileDevice()).toBe(false);
  });
});
