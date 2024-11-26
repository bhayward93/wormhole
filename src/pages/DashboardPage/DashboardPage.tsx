import { Card } from '../../components/ui/card';
import { MyShipsSummary } from '../../components/dashboard/MyShipsSummary/MyShipsSummary';
import { MyContractsSummary } from '../../components/dashboard/MyContractsSummary/MyContractsSummary';

/**
 * Dashboard page component.
 * @returns { JSX.Element } The dashboard page component.
 */
export function DashboardPage(): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-8 mt-10">
      <Card className="flex flex-col items-center w-[800px] max-w-full p-4">
        <MyShipsSummary />
      </Card>
      <Card className="flex flex-col items-center w-[800px] max-w-full p-4">
        <MyContractsSummary />
      </Card>
    </div>
  );
}
