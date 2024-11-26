import { it, expect, describe } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { DashboardPage } from "./DashboardPage";
import { QueryClient, QueryClientProvider } from "react-query";

describe("DashboardPage", () => {
  it("renders", async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <DashboardPage />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Your Ships")).toBeInTheDocument();
      expect(screen.getByText("Your Contracts")).toBeInTheDocument();
    });
  });
});