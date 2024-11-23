import { useState } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

/** Text form group props. */
type FormGroupProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string, isValid: boolean) => void;
  validateFn?: (value: string) => boolean;
}

/**
 * A grouping of label, input and validation error handling for use in forms.
 * @param { FormGroupProps } props - props.
 * @returns { JSX.Element } The component.
 */
export function TextFormGroup({ label, name, value, onChange, validateFn }: FormGroupProps) {
  const [validationError, setValidationError] = useState<string>("");

  /**
   * Handle input change.
   * @param { React.ChangeEvent<HTMLInputElement> } e - The change event.
   * @returns { void }
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = e.currentTarget.value;
    let isValid = true;

    try {
      validateFn?.(newValue);
      setValidationError("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setValidationError(error.message);
      } else {
        setValidationError("Invalid value");
      }
      isValid = false;
    }

    onChange(newValue, isValid);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name} data-testid={`text-form-group-label-${name}`}>{label}</Label>
      <Input type="text" name={name} value={value} onChange={handleChange} data-testid={`text-form-group-input-${name}`} />
      <div className="h-6">
        {validationError && <p className="text-red-500" data-testid={`text-form-group-error-${name}`}>{validationError}</p>}
      </div>
    </div>
  );
}
