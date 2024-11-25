import { RefreshCw } from "lucide-react";

/** Summary card header props. */
type SummaryCardHeaderProps = {
    title: string;
    onRefresh: () => void;
}

/**
 * Summary card header component.
 * @param { SummaryCardHeaderProps } props - Props for the summary card header.
 * @returns { JSX.Element } The summary card header.
 */
export function SummaryCardHeader({ title, onRefresh }: SummaryCardHeaderProps): JSX.Element {
  return (
    <div className="flex items-center justify-center justify-between mb-4 w-full">
        <div></div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <RefreshCw className="w-4 h-4" onClick={onRefresh} data-testid="summary-card-refresh-icon" />
    </div>
  );
}
