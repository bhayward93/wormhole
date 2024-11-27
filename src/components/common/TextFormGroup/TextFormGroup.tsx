import { useState } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

/** Text form group props. */
type FormGroupProps = {
  label: string;
  name: string;
  id: string;
  value: string;
  onChange: (value: string, isValid: boolean) => void;
  validateFn?: (value: string) => boolean;
};

/**
 * A grouping of label, input and validation error handling for use in forms.
 * @param { FormGroupProps } props - props.
 * @returns { JSX.Element } The component.
 */
export function TextFormGroup({
  label,
  name,
  id,
  value,
  onChange,
  validateFn,
}: FormGroupProps): JSX.Element {
  const [validationError, setValidationError] = useState<string>('');

  /**
   * Handle input change.
   * @param { React.ChangeEvent<HTMLInputElement> } e - The change event.
   * @returns { void }
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue: string = e.currentTarget.value;
    let isValid = true;

    try {
      validateFn?.(newValue);
      setValidationError('');
    } catch (e: unknown) {
      if (e instanceof Error) {
        setValidationError(e.message);
      } else {
        setValidationError('Invalid value');
      }
      isValid = false;
    }

    onChange(newValue, isValid);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} data-testid={`text-form-group-label-${name}`}>
        {label}
      </Label>
      <Input
        type="text"
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
        aria-invalid={Boolean(validationError)}
        aria-describedby={validationError ? `${id}-error` : undefined}
        data-testid={`text-form-group-input-${name}`}
      />
      <div className="min-h-6" role="alert" aria-live="assertive">
        {validationError && (
          <p
            id={`${id}-error`}
            className="text-red-500"
            data-testid={`text-form-group-error-${name}`}
          >
            {validationError}
          </p>
        )}
      </div>
    </div>
  );
}
