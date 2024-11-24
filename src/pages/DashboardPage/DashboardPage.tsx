import { Card } from "../../components/ui/card";
import { ShipSummaryTable } from "../../components/dashboard/ShipSummaryTable/ShipSummaryTable";
import { ContractSummaryTable } from "../../components/dashboard/ContractSummaryTable/ContractSummaryTable";

/**
 * Dashboard page component.
 * @returns { JSX.Element } The dashboard page component.
 */
export function DashboardPage(): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-8 mt-10">
      <Card className="flex flex-col items-center w-[800px] max-w-full p-4">
        <ShipSummaryTable />
      </Card>
      <Card className="flex flex-col items-center w-[800px] max-w-full p-4">
        <ContractSummaryTable />
      </Card>
    </div>
  )
}
