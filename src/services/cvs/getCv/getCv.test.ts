import { describe, expect, it, vi } from "vitest";
import { getCv } from "./getCv";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  CvDocument: "CV_DOCUMENT",
}));

describe("getCv", () => {
  it("requests cv by id with the same field selection as Cvs items", async () => {
    const cv = {
      id: "cv-762",
      name: "Software Engineer",
      education: "Computer Systems Design",
      description: "Highly motivated engineer",
      user: { id: "user-1", email: "dev@example.com" },
    };

    requestWithAuthMock.mockResolvedValue({ cv });

    const result = await getCv("cv-762");

    expect(requestWithAuthMock).toHaveBeenCalledWith("CV_DOCUMENT", { cvId: "cv-762" });
    expect(result).toEqual(cv);
  });
});
