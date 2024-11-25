import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardPage } from "./DashboardPage";
import { QueryClient, QueryClientProvider } from "react-query";

describe("DashboardPage", () => {
  it("renders", async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <DashboardPage />
      </QueryClientProvider>
    );

    expect(screen.getByText("Your Ships")).toBeInTheDocument();
    expect(screen.getByText("Your Contracts")).toBeInTheDocument();
  });
});