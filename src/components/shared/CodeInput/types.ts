export type CodeInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  className?: string;
  error?: boolean;
};
