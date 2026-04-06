import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PageTabs, TabsContent } from "./Tabs";

const twoTabs = [
  { value: "overview", label: "Overview" },
  { value: "history", label: "History" },
];

describe("PageTabs", () => {
  it("should render a tab for each item", () => {
    render(
      <PageTabs tabs={twoTabs} defaultValue="overview">
        <TabsContent value="overview">Overview panel</TabsContent>
        <TabsContent value="history">History panel</TabsContent>
      </PageTabs>,
    );

    expect(screen.getByRole("tab", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "History" })).toBeInTheDocument();
  });

  it("should show the default tab panel", () => {
    render(
      <PageTabs tabs={twoTabs} defaultValue="overview">
        <TabsContent value="overview">Overview panel</TabsContent>
        <TabsContent value="history">History panel</TabsContent>
      </PageTabs>,
    );

    expect(screen.getByRole("tabpanel", { name: "Overview" })).toHaveTextContent("Overview panel");
  });

  it("should switch panels when a tab is activated", async () => {
    const user = userEvent.setup();
    render(
      <PageTabs tabs={twoTabs} defaultValue="overview">
        <TabsContent value="overview">Overview panel</TabsContent>
        <TabsContent value="history">History panel</TabsContent>
      </PageTabs>,
    );

    await user.click(screen.getByRole("tab", { name: "History" }));

    expect(screen.getByRole("tabpanel", { name: "History" })).toHaveTextContent("History panel");
  });

  it("should call onValueChange when the active tab changes", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <PageTabs tabs={twoTabs} defaultValue="overview" onValueChange={onValueChange}>
        <TabsContent value="overview">Overview panel</TabsContent>
        <TabsContent value="history">History panel</TabsContent>
      </PageTabs>,
    );

    await user.click(screen.getByRole("tab", { name: "History" }));

    expect(onValueChange).toHaveBeenCalled();
    expect(onValueChange.mock.calls[0]?.[0]).toBe("history");
  });

  it("should merge className onto the outer wrapper", () => {
    const { container } = render(
      <PageTabs tabs={[{ value: "a", label: "A" }]} defaultValue="a" className="page-tabs-extra">
        <TabsContent value="a">Content</TabsContent>
      </PageTabs>,
    );

    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveClass("page-tabs-extra");
    expect(wrapper).toHaveClass("w-full");
  });

  it("should render additional children inside the tabs root", () => {
    render(
      <PageTabs tabs={twoTabs} defaultValue="overview">
        <TabsContent value="overview">Overview panel</TabsContent>
        <TabsContent value="history">History panel</TabsContent>
        <p>Extra markup</p>
      </PageTabs>,
    );

    expect(screen.getByText("Extra markup")).toBeInTheDocument();
  });
});
