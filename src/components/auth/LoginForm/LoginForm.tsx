import { useCallback, useContext, useMemo, useState } from "react";
import { CardContent, CardFooter, CardHeader } from "../../ui/card";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../../hooks/useRegister";
import { AuthContext } from "../../../context/auth/AuthContext";
import { TextFormGroup } from "../../common/TextFormGroup/TextFormGroup";
import { validateSymbol } from "../../../helpers/validators/symbolValidator";
import { validateFaction } from "../../../helpers/validators/factionValidator";
import { LoadingSpinner } from "../../common/LoadingSpinner/LoadingSpinner";
import { Button } from "../../ui/button";
import { TokenAlert } from "../TokenAlert/TokenAlert";

/**
 * Login form component.
 * @returns { JSX.Element } - the login form component.
 */
export function LoginForm() {
  const navigate = useNavigate();
  const { register, inProgress, error } = useRegister();
	const { token } = useContext(AuthContext);
  const [ formData, setFormData ] = useState({ symbol: "", faction: "COSMIC" });
  const [ symbolValid, setSymbolValid ] = useState(false);
  const [ factionValid, setFactionValid ] = useState(true);

  /**
   * Handle form submission.
   * @param { React.FormEvent<HTMLFormElement> } e - The form event.
   * @returns { Promise<void> }
   */
  const handleFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      register(formData.symbol, formData.faction);
    },
    [formData, register]
  );

  /**
   * Handle symbol change.
   * @param { string } value - The symbol value.
   * @param { boolean } valid - Whether the symbol is valid.
   * @returns { void }
   */
  const handleSymbolChange = useCallback(
    (value: string, valid: boolean) => {
      setFormData({ ...formData, symbol: value });
      setSymbolValid(valid);
    },
    [formData, setFormData]
  );

  /**
   * Handle faction change.
   * @param { string } value - The faction value.
   * @param { boolean } valid - Whether the faction is valid.
   * @returns { void }
   */
  const handleFactionChange = useCallback(
    (value: string, valid: boolean) => {
      setFormData({ ...formData, faction: value });
      setFactionValid(valid);
    },
    [formData, setFormData]
  );

  /**
   * Handle token alert continue button click.
   * @returns { void }
   */
  const handleTokenAlertContinue = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

	/** Whether the form is valid. */
	const isFormValid = useMemo(
    () => symbolValid && factionValid,
    [symbolValid, factionValid]
  );

  return (
    <form onSubmit={handleFormSubmit} className="w-full p-8">
      <CardHeader>
        <h1 className="mb-4 text-6xl">Get started</h1>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 mb-4">
        <TextFormGroup
          label="Symbol"
          name="symbol"
          value={formData.symbol}
          onChange={handleSymbolChange}
          validateFn={validateSymbol}
        />
        <TextFormGroup
          label="Faction"
          name="faction"
          value={formData.faction}
          onChange={handleFactionChange}
          validateFn={validateFaction}
        />
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {inProgress ? (
          <LoadingSpinner />
        ) : (
          <Button type="submit" className="w-full" disabled={!isFormValid} data-testid="register-button">
            Register
          </Button>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </CardFooter>
      {token && (
        <TokenAlert token={token} onContinue={handleTokenAlertContinue} />
      )}
    </form>
  );
}