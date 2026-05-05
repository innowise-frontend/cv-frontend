import type { Select as SelectBase } from "@base-ui/react/select";

export type SelectProps = {
  list: { value: string; label: string }[];
  label: string;
  placeholder?: string;
  className?: string;
  popupClassName?: string;
  itemClassName?: string;
  disabled?: boolean;
  disablePortal?: boolean;
  align?: SelectBase.Positioner.Props["align"];
  side?: SelectBase.Positioner.Props["side"];
  disabled?: boolean;
  value: string | number;
  onValueChange?: (value: string) => void;
};
