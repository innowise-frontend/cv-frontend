export interface InputWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  disabled?: boolean;
}
