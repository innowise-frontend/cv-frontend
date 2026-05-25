import { describe, expect, it, vi } from "vitest";
import type { DeleteCvInput } from "@services/graphql/__generated__/graphql";
import { deleteCv } from "./deleteCv";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  DeleteCvDocument: "DELETE_CV_DOCUMENT",
}));

describe("deleteCv", () => {
  it("sends delete cv mutation and returns result", async () => {
    requestWithAuthMock.mockResolvedValue({ deleteCv: true });

    const input: DeleteCvInput = { cvId: "cv-1" };

    const result = await deleteCv(input);

    expect(requestWithAuthMock).toHaveBeenCalledWith("DELETE_CV_DOCUMENT", { cv: input });
    expect(result).toBe(true);
  });
});
