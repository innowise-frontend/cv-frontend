import * as React from "react";
import { Button } from "@components/ui/button";
import { cn } from "@root/lib/utils";
import type { DayButton, Locale } from "react-day-picker";

export function DatePickerDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const isSelected = modifiers.selected;

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      disabled={modifiers.disabled}
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={isSelected}
      className={cn(
        "relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 rounded-full border-0 text-base leading-none font-normal cursor-pointer",
        "hover:bg-gray-7 hover:text-gray-2 dark:hover:bg-gray-4 dark:hover:text-gray-8",
        modifiers.today && !isSelected && "font-semibold text-red hover:text-red dark:text-red",
        isSelected &&
          "bg-red text-gray-8 hover:bg-red hover:text-gray-8 dark:bg-red dark:text-gray-8 dark:hover:bg-red dark:hover:text-gray-8",
        modifiers.disabled &&
          "pointer-events-none text-gray-5 opacity-40 hover:bg-transparent hover:text-gray-5 dark:text-gray-5 dark:hover:bg-transparent dark:hover:text-gray-5",
        modifiers.outside && !modifiers.disabled && "text-gray-5 dark:text-gray-5",
        className,
      )}
      {...props}
    />
  );
}
