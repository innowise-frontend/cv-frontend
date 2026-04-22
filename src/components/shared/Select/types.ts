export interface SelectProps {
  options: {
    label: string;
    value: number;
  }[];
  onValueChange: (value: number) => void;
}
