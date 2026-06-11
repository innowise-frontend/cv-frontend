export type MultiSelectOption<T> = {
  value: T;
  label: string;
};

export type MultiSelectProps<
  TValue,
  TOption extends MultiSelectOption<TValue> = MultiSelectOption<TValue>,
> = {
  label: string;
  data: TValue[];
  options: TOption[];
  disabled?: boolean;
  disablePortal?: boolean;
  onChange: (value: TValue[]) => void;
  className?: string;
  placeholder?: string;
  error?: string;
};
