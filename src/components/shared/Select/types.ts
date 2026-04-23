type SelectCommon = {
  list: { value: string; label: string }[];
  label?: string;
  placeholder?: string;
  className?: string;
};

export type SelectProps =
  | (SelectCommon & {
      multiple?: false;
      value: string | null;
      onValueChange: (value: string) => void;
    })
  | (SelectCommon & {
      multiple: true;
      value: string[];
      onValueChange: (value: string[]) => void;
    });

export type SingleSelectProps = Extract<SelectProps, { multiple?: false }>;
export type MultiSelectProps = Extract<SelectProps, { multiple: true }>;
