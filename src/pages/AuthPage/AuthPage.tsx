import { Card } from '../../components/ui/card';
import { RegistrationForm } from '../../components/auth/RegistrationForm/RegistrationForm';

/**
 * Auth page component.
 * @returns { JSX.Element } The auth page component.
 */
export function AuthPage() {
  return (
    <div className="flex flex-col items-center mt-20">
      <Card className="flex flex-row justify-center w-[500px] max-w-full">
        <RegistrationForm data-testid="registration-form" />
      </Card>
    </div>
  );
}
