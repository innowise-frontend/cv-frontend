export type SelectProps = {
  list: { value: string; label: string }[];
  label: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  value: string | number;
  onValueChange?: (value: string) => void;
};
