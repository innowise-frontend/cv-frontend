import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { SortOrder } from "@root/constants";
import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useProjectSkillsQuery,
  useProjectsTableQuery,
  useUpdateProjectMutation,
} from "./api";

const getProjectsMock = vi.hoisted(() => vi.fn());
const getSkillsMock = vi.hoisted(() => vi.fn());
const createProjectMock = vi.hoisted(() => vi.fn());
const updateProjectMock = vi.hoisted(() => vi.fn());
const deleteProjectMock = vi.hoisted(() => vi.fn());
const toastSuccessMock = vi.hoisted(() => vi.fn());
const toastErrorMock = vi.hoisted(() => vi.fn());

vi.mock("@services/projects", () => ({
  getProjects: (...args: unknown[]) => getProjectsMock(...args),
  createProject: (...args: unknown[]) => createProjectMock(...args),
  updateProject: (...args: unknown[]) => updateProjectMock(...args),
  deleteProject: (...args: unknown[]) => deleteProjectMock(...args),
}));

vi.mock("@services/skills", () => ({
  getSkills: (...args: unknown[]) => getSkillsMock(...args),
}));

vi.mock("sonner", () => ({
  toast: {
    success: (...args: unknown[]) => toastSuccessMock(...args),
    error: (...args: unknown[]) => toastErrorMock(...args),
  },
}));

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

const queryParams = {
  search: "cv",
  page: 2,
  limit: 20,
  sortOrder: SortOrder.DESC,
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider
    client={
      new QueryClient({
        defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
      })
    }
  >
    {children}
  </QueryClientProvider>
);

describe("useProjectsTableQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getProjectsMock.mockResolvedValue({ items: [], total_pages: 0 });
  });

  it("fetches projects with search, pagination, and sort params", async () => {
    renderHook(() => useProjectsTableQuery(queryParams), { wrapper });

    await waitFor(() => expect(getProjectsMock).toHaveBeenCalled());

    expect(getProjectsMock).toHaveBeenCalledWith({
      search: "cv",
      page: 2,
      limit: 20,
      sort_order: SortOrder.DESC,
      sort_by: "name",
    });
  });
});

describe("useProjectSkillsQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getSkillsMock.mockResolvedValue({ items: [], total_pages: 0 });
  });

  it("fetches skills for environment options", async () => {
    renderHook(() => useProjectSkillsQuery(), { wrapper });

    await waitFor(() => expect(getSkillsMock).toHaveBeenCalled());

    expect(getSkillsMock).toHaveBeenCalledWith({
      page: 1,
      limit: 100,
      sort_order: SortOrder.ASC,
      sort_by: "name",
    });
  });
});

describe("useCreateProjectMutation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    createProjectMock.mockResolvedValue({ id: "p1" });
  });

  it("invalidates projects and shows success toast", async () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useCreateProjectMutation({ onSuccess }), { wrapper });

    result.current.mutate({
      name: "Project",
      domain: "Web",
      description: "Desc",
      start_date: "2025-01-01",
      end_date: null,
      environment: ["React"],
    });

    await waitFor(() => expect(onSuccess).toHaveBeenCalled());
    expect(toastSuccessMock).toHaveBeenCalledWith("page.projects.toast.created");
  });
});

describe("useUpdateProjectMutation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    updateProjectMock.mockResolvedValue({ id: "p1" });
  });

  it("invalidates projects and shows success toast", async () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useUpdateProjectMutation({ onSuccess }), { wrapper });

    result.current.mutate({
      projectId: "p1",
      name: "Updated",
      domain: "Web",
      description: "Desc",
      start_date: "2025-01-01",
      end_date: null,
      environment: ["React"],
    });

    await waitFor(() => expect(onSuccess).toHaveBeenCalled());
    expect(toastSuccessMock).toHaveBeenCalledWith("page.projects.toast.updated");
  });
});

describe("useDeleteProjectMutation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    deleteProjectMock.mockResolvedValue({ affected: 1 });
  });

  it("invalidates projects and shows success toast", async () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useDeleteProjectMutation({ onSuccess }), { wrapper });

    result.current.mutate({ projectId: "p1" });

    await waitFor(() => expect(onSuccess).toHaveBeenCalled());
    expect(toastSuccessMock).toHaveBeenCalledWith("page.projects.toast.deleted");
  });
});
