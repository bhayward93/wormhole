import { Card } from "../../components/ui/card";
import { LoginForm } from "../../components/auth/LoginForm/LoginForm";

/**
 * Auth page component.
 * @returns { JSX.Element } The auth page component.
 */
export function AuthPage() {
  return (
    <div className="flex flex-col items-center mt-20">
      <Card className="flex flex-row justify-center w-[500px] max-w-full">
        <LoginForm data-testid="login-form" />
      </Card>
    </div>
  )
}
