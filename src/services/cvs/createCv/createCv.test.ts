import { describe, expect, it, vi } from "vitest";
import type { CreateCvInput } from "@services/graphql/__generated__/graphql";
import { createCv } from "./createCv";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  CreateCvDocument: "CREATE_CV_DOCUMENT",
}));

describe("createCv", () => {
  it("sends create cv mutation and returns created cv", async () => {
    const created = { id: "cv-1", name: "My CV" };
    requestWithAuthMock.mockResolvedValue({ createCv: created });

    const input: CreateCvInput = {
      name: "My CV",
      education: "BS",
      description: "Details",
      userId: "user-1",
    };

    const result = await createCv(input);

    expect(requestWithAuthMock).toHaveBeenCalledWith("CREATE_CV_DOCUMENT", { cv: input });
    expect(result).toEqual(created);
  });
});
