import { describe, expect, it, vi } from "vitest";
import {
  fetchUserProfile,
  submitUpdateProfile,
  submitUpdateUser,
  submitUploadAvatar,
} from "./updateUserProfile";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  UserDocument: "USER_DOCUMENT",
  UpdateUserDocument: "UPDATE_USER_DOCUMENT",
  UpdateProfileDocument: "UPDATE_PROFILE_DOCUMENT",
  UploadAvatarDocument: "UPLOAD_AVATAR_DOCUMENT",
}));

describe("updateUserProfile services", () => {
  it("fetchUserProfile requests user by id", async () => {
    requestWithAuthMock.mockResolvedValue({ user: { id: "u-1" } });

    const result = await fetchUserProfile("u-1");

    expect(requestWithAuthMock).toHaveBeenCalledWith("USER_DOCUMENT", { userId: "u-1" });
    expect(result).toEqual({ user: { id: "u-1" } });
  });

  it("submitUpdateUser sends user payload", async () => {
    requestWithAuthMock.mockResolvedValue({ updateUser: { id: "u-1" } });

    const result = await submitUpdateUser({ id: "u-1", first_name: "Ann" } as never);

    expect(requestWithAuthMock).toHaveBeenCalledWith("UPDATE_USER_DOCUMENT", {
      user: { id: "u-1", first_name: "Ann" },
    });
    expect(result).toEqual({ updateUser: { id: "u-1" } });
  });

  it("submitUpdateProfile sends profile payload", async () => {
    requestWithAuthMock.mockResolvedValue({ updateProfile: { id: "p-1" } });

    const result = await submitUpdateProfile({ userId: "u-1" } as never);

    expect(requestWithAuthMock).toHaveBeenCalledWith("UPDATE_PROFILE_DOCUMENT", {
      profile: { userId: "u-1" },
    });
    expect(result).toEqual({ updateProfile: { id: "p-1" } });
  });

  it("submitUploadAvatar sends avatar payload", async () => {
    requestWithAuthMock.mockResolvedValue({ uploadAvatar: "https://cdn/avatar.png" });

    const result = await submitUploadAvatar({ userId: "u-1", avatar: "base64" } as never);

    expect(requestWithAuthMock).toHaveBeenCalledWith("UPLOAD_AVATAR_DOCUMENT", {
      avatar: { userId: "u-1", avatar: "base64" },
    });
    expect(result).toEqual({ uploadAvatar: "https://cdn/avatar.png" });
  });
});
