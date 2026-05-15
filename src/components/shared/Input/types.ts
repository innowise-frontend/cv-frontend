export interface InputWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}
