import { it, expect, describe, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import { TextFormGroup } from './TextFormGroup';

describe('TextFormGroup', () => {
  it('should render', () => {
    const onChange = vi.fn();

    render(<TextFormGroup label={"label"} name={"name"} value={"value"} onChange={onChange} />);

    expect(screen.getByTestId(`text-form-group-label-name`)).toBeInTheDocument();
    expect(screen.getByTestId(`text-form-group-input-name`)).toBeInTheDocument();
  });

  it('should call onChange', () => {
    const newValue = "newValue";
    const onChange = vi.fn();

    render(<TextFormGroup label={"label"} name={"name"} value={"value"} onChange={onChange} />);

    const input = screen.getByTestId(`text-form-group-input-name`);
    fireEvent.change(input, { target: { value: newValue } });

    expect(onChange).toHaveBeenCalledWith(newValue, true);
  });

  it('should display validation errors', () => {
    const onChange = vi.fn();
    const validateFn = vi.fn(() => { throw new Error("Invalid value"); });

    render(<TextFormGroup label={"label"} name={"name"} value={"value"} onChange={onChange} validateFn={validateFn} />);

    const input = screen.getByTestId(`text-form-group-input-name`);
    fireEvent.change(input, { target: { value: "invalidValue" } });

    expect(screen.getByTestId(`text-form-group-error-name`)).toBeInTheDocument();
  });
});
