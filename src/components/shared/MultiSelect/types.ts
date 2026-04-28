export type MultiSelectProps<T> = {
  label: string;
  data: T[];
  options: T[];
  disabled?: boolean;
  onChange: (value: T[]) => void;
  className?: string;
  placeholder?: string;
};
