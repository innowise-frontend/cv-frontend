import { getDefaultClassNames } from "react-day-picker";
import { cn } from "@root/lib/utils";
import type { ClassNames } from "react-day-picker";

const defaultClassNames = getDefaultClassNames();

export const datePickerCalendarClassNames: Partial<ClassNames> = {
  today: cn("rounded-(--cell-radius)", defaultClassNames.today),
  disabled: cn(
    "[&_button]:cursor-not-allowed [&_button]:text-gray-5 [&_button]:opacity-40",
    defaultClassNames.disabled,
  ),
  outside: cn("text-gray-5 dark:text-gray-5", defaultClassNames.outside),
  caption_label: cn(
    "text-sm font-medium text-gray-2 dark:text-gray-8",
    defaultClassNames.caption_label,
  ),
  weekday: cn(
    "text-xs font-normal uppercase text-gray-5 dark:text-gray-5 px-2",
    defaultClassNames.weekday,
  ),
  button_previous: cn(
    "text-gray-3 hover:bg-gray-7 dark:text-gray-8 dark:hover:bg-gray-4 rounded-full cursor-pointer",
    defaultClassNames.button_previous,
  ),
  button_next: cn(
    "text-gray-3 hover:bg-gray-7 dark:text-gray-8 dark:hover:bg-gray-4 rounded-full cursor-pointer",
    defaultClassNames.button_next,
  ),
};
