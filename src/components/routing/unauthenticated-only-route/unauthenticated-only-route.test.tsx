import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { UnauthenticatedOnlyRoute } from "./unauthenticated-only-route";
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from "../../../consts/local-storage-keys/local-storage-keys";

describe("UnauthenticatedOnlyRoute", () => {
  it("renders route when not authenticated", () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
    const { getByText } = render(
      <MemoryRouter>
        <UnauthenticatedOnlyRoute>
          <div>Unauthenticated Content</div>
        </UnauthenticatedOnlyRoute>
      </MemoryRouter>
    );
    expect(getByText("Unauthenticated Content")).toBeInTheDocument();
  });

  it("redirects when authenticated", () => {
    localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, "test");
    const { queryByText } = render(
      <MemoryRouter>
        <UnauthenticatedOnlyRoute>
          <div>Unauthenticated Content</div>
        </UnauthenticatedOnlyRoute>
      </MemoryRouter>
    );
    expect(queryByText("Unauthenticated Content")).not.toBeInTheDocument();
  });
});