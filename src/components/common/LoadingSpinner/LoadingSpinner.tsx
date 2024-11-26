import { Loader } from 'lucide-react';
import { cn } from '../../../lib/utils';

/** Loading spinner props type. */
type LoadingSpinnerProps = {
  size?: number;
  className?: string;
};

/**
 * Loading spinner component.
 * @param { LoadingSpinnerProps } props - props.
 * @returns { JSX.Element } The loading spinner component.
 */
export function LoadingSpinner({
  size = 24,
  className = '',
}: LoadingSpinnerProps) {
  return (
    <Loader
      size={size}
      className={cn('animate-spin text-primary', className)}
      data-testid="loading-spinner"
    />
  );
}
