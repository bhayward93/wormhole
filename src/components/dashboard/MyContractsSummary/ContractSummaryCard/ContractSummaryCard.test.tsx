import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContractSummaryCard } from "./ContractSummaryCard";
import { Contract } from "../../../../types/game-types";

describe("ContractSummaryCard", () => {
  const mockContract: Contract = {
    id: 'contract1',
    factionSymbol: 'faction1',
    terms: { deliver: [{ destinationSymbol: 'destination1' }] },
    expiration: 'expiration1',
    fulfilled: false,
    accepted: false,
    deadlineToAccept: 'deadline1',
  } as Contract;

  it("renders contract details", () => {
    render(<ContractSummaryCard contract={mockContract} />);

    expect(screen.getByText("contract1")).toBeInTheDocument();
    expect(screen.getByText("faction1")).toBeInTheDocument();
    expect(screen.getByText("destination1")).toBeInTheDocument();
    expect(screen.getByText("expiration1")).toBeInTheDocument();
    expect(screen.getByText("Unfulfilled")).toBeInTheDocument();
    expect(screen.getByText("Available")).toBeInTheDocument();
    expect(screen.getByText("deadline1")).toBeInTheDocument();
  });

  describe("Accept button", () => {
    it("renders Accept button when contract is not accepted or fulfilled", () => {
      render(<ContractSummaryCard contract={mockContract} />);
      expect(screen.getByText("Accept")).toBeInTheDocument();
    });

    it("does not render Accept button when contract is accepted", () => {
      const acceptedContract = { ...mockContract, fulfilled: false, accepted: true };
      render(<ContractSummaryCard contract={acceptedContract} />);
      expect(screen.queryByText("Accept")).not.toBeInTheDocument();
    });

    it("does not render Accept button when contract is fulfilled", () => {
      const fulfilledContract = { ...mockContract, accepted: false, fulfilled: true };
      render(<ContractSummaryCard contract={fulfilledContract} />);
      expect(screen.queryByText("Accept")).not.toBeInTheDocument();
    });
  });
});