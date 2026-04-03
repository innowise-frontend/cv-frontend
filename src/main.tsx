import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorPage } from "@pages/errorPage";
import { routeTree } from "./routeTree.gen";
import "./index.css";

const router = createRouter({
  routeTree,
  notFoundMode: "root",
  defaultErrorComponent: () => (
    <ErrorPage
      error={
        "Something went wrong. We’re already working on fixing it. \n Please try again or go back."
      }
    />
  ),
  defaultNotFoundComponent: () => (
    <ErrorPage
      error={
        "Hmm… this doesn’t seem to be the page you were looking for. \n Let’s get you back on track."
      }
    />
  ),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
