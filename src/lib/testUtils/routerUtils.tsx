import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { render, type RenderOptions } from "@testing-library/react";

interface RenderWithFileRoutesOptions extends Omit<RenderOptions, "wrapper"> {
  initialLocation?: string;
  routerContext?: Record<string, unknown>;
}

export async function renderWithFileRoutes(
  ui: React.ReactElement,
  { initialLocation = "/", routerContext = {}, ...renderOptions }: RenderWithFileRoutesOptions = {},
) {
  const rootRoute = createRootRoute({
    component: () => <>{ui}</>,
  });

  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
    context: routerContext,
  });

  await router.load();

  return {
    ...render(<RouterProvider router={router} />, renderOptions),
    router,
  };
}
