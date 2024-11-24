import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardPage } from "./DashboardPage";

describe("DashboardPage", () => {
  it("renders", async () => {
    render(<DashboardPage />);

    expect(screen.getByText("Your Ships")).toBeInTheDocument();
    expect(screen.getByText("Your Contracts")).toBeInTheDocument();
  });
});