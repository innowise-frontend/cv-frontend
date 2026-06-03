import type { FocusEventHandler } from "react";

export interface DatePickerProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  error?: string;
  disablePortal?: boolean;
  className?: string;
  id?: string;
  name?: string;
}
