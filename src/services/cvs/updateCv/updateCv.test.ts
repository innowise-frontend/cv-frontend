import { describe, expect, it, vi } from "vitest";
import type { UpdateCvInput } from "@services/graphql/__generated__/graphql";
import { updateCv } from "./updateCv";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  UpdateCvDocument: "UPDATE_CV_DOCUMENT",
}));

describe("updateCv", () => {
  it("sends update cv mutation and returns updated cv", async () => {
    const updated = { id: "cv-1", name: "Updated CV" };
    requestWithAuthMock.mockResolvedValue({ updateCv: updated });

    const input: UpdateCvInput = {
      cvId: "cv-1",
      name: "Updated CV",
      education: "MS",
      description: "Updated details",
    };

    const result = await updateCv(input);

    expect(requestWithAuthMock).toHaveBeenCalledWith("UPDATE_CV_DOCUMENT", { cv: input });
    expect(result).toEqual(updated);
  });
});
