import { renderHook } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { AuthContext, type AuthContextType } from "@root/context/AuthContext";
import { useAuth } from "./useAuth";

describe("useAuth", () => {
  it("should throw when used outside of AuthProvider", () => {
    expect(() => renderHook(() => useAuth())).toThrowError(
      "useAuth must be used within an AuthProvider",
    );
  });

  it("should return auth context values when provider is present", () => {
    const authValue: AuthContextType = {
      userId: "user-1",
      isAdmin: true,
      isAuthenticated: true,
      isFirstLoad: false,
      isVerified: false,
    };

    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(AuthContext.Provider, { value: authValue }, children);

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toEqual(authValue);
  });
});
