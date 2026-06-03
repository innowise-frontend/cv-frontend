import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { forwardRef, useCallback, useId, useState, type ChangeEvent, type FocusEvent } from "react";
import { useTranslation } from "react-i18next";
import CalendarIcon from "@assets/icon/CalendarIcon.svg?react";
import { Input } from "@components/shared";
import {
  nativeAutofillClassName,
  nativePlaceholderClassName,
  themeTextClassName,
} from "@components/shared/formFieldStyles";
import { Calendar } from "@components/ui/calendar";
import { Label } from "@components/ui/label";
import { Popover, PopoverTrigger } from "@components/ui/popover";
import { useCalendarConfig } from "@root/i18n/useCalendarConfig";
import { cn } from "@root/lib/utils";
import { datePickerCalendarClassNames } from "./calendarStyles";
import { DatePickerDayButton } from "./DatePickerDayButton";
import {
  createDateDisabledMatcher,
  formatProjectDate,
  formatProjectDateDisplay,
  isDateInRange,
  parseProjectDate,
} from "./dateUtils";
import type { DatePickerProps } from "./types";

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
  {
    label,
    placeholder,
    value = "",
    onChange,
    onBlur,
    disabled = false,
    error,
    disablePortal = false,
    minDate,
    maxDate,
    className,
    id: idProp,
    name,
  },
  ref,
) {
  const { t } = useTranslation();
  const { locale, labels } = useCalendarConfig();
  const generatedId = useId();
  const inputId = idProp ?? generatedId;
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [draftText, setDraftText] = useState<string | null>(null);
  const [month, setMonth] = useState<Date>(() => parseProjectDate(value) ?? new Date());
  const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(null);

  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    setContainerNode(node);
  }, []);

  const dialogContainer = containerNode?.closest("dialog");
  const positionMethod = disablePortal ? "absolute" : "fixed";
  const collisionSide = disablePortal ? "flip" : "shift";

  const selectedDate = parseProjectDate(value);
  const displayValue = draftText ?? formatProjectDateDisplay(value);
  const hasValue = Boolean(value.trim());
  const isLabelFloating = hasValue || open || focused || Boolean(displayValue.trim());

  const isAllowedDate = (date: Date) => isDateInRange(date, minDate, maxDate);

  const commitDate = (date: Date) => {
    if (!isAllowedDate(date)) return;

    const next = formatProjectDate(date);
    onChange?.(next);
    setDraftText(null);
    setMonth(date);
    setOpen(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraftText(event.target.value);
  };

  const handleInputFocus = () => {
    setFocused(true);
    setDraftText(formatProjectDateDisplay(value));
  };

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    setFocused(false);

    const trimmed = (draftText ?? "").trim();

    if (!trimmed) {
      onChange?.("");
      setDraftText(null);
      onBlur?.(event);

      return;
    }

    const parsed = parseProjectDate(trimmed);

    if (parsed && isAllowedDate(parsed)) {
      onChange?.(formatProjectDate(parsed));
    }

    setDraftText(null);
    onBlur?.(event);
  };

  const popup = (
    <PopoverPrimitive.Positioner
      side="bottom"
      align="end"
      sideOffset={4}
      positionMethod={positionMethod}
      collisionAvoidance={{ side: collisionSide, align: "none" }}
      className="isolate z-50"
    >
      <PopoverPrimitive.Popup
        data-slot="popover-content"
        className="z-50 w-auto overflow-hidden rounded-md border border-gray-5 bg-gray-8 p-0 text-gray-2 shadow-none ring-0 dark:border-gray-5 dark:bg-gray-2 dark:text-gray-5"
      >
        <Calendar
          mode="single"
          locale={locale}
          labels={labels}
          selected={selectedDate}
          month={month}
          onMonthChange={setMonth}
          disabled={createDateDisabledMatcher(minDate, maxDate)}
          classNames={datePickerCalendarClassNames}
          components={{
            DayButton: (dayButtonProps) => (
              <DatePickerDayButton locale={locale} {...dayButtonProps} />
            ),
          }}
          onSelect={(date) => {
            if (date) commitDate(date);
          }}
        />
      </PopoverPrimitive.Popup>
    </PopoverPrimitive.Positioner>
  );

  return (
    <div ref={setContainerRef} className={cn("relative w-full", className)}>
      <Popover
        open={open}
        onOpenChange={(next) => {
          if (disabled) return;
          setOpen(next);
        }}
      >
        <div className="relative">
          <Input
            ref={ref}
            id={inputId}
            name={name}
            disabled={disabled}
            placeholder={placeholder}
            value={displayValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setOpen(true);
              }
            }}
            className={cn(
              "peer block h-12 w-full cursor-text rounded-md border border-gray-5 bg-gray-8 px-3 py-3 pr-10 text-base leading-6 shadow-none outline-none dark:border-gray-5 dark:bg-gray-2",
              themeTextClassName,
              "transition-[border-color,box-shadow] duration-300",
              "focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:shadow-none",
              "disabled:cursor-not-allowed disabled:bg-gray-6 dark:disabled:bg-gray-3",
              nativePlaceholderClassName,
              "transition-opacity duration-300",
              open && "placeholder:opacity-0",
              nativeAutofillClassName,
              error &&
                "border-red focus-visible:border-red dark:border-red dark:focus-visible:border-red",
            )}
          />

          {label && (
            <Label
              htmlFor={inputId}
              className={cn(
                isLabelFloating
                  ? "-top-0.5 translate-x-2.5 -translate-y-4 text-xs text-gray-3 opacity-100 dark:text-gray-5"
                  : "top-1/2 -translate-y-1/2 translate-x-2.5 text-sm text-gray-6 opacity-0 dark:text-gray-3",
                error && "text-red",
              )}
            >
              {label}
            </Label>
          )}

          <PopoverTrigger
            type="button"
            disabled={disabled}
            aria-label={label ?? placeholder ?? t("page.calendar.openCalendar")}
            className={cn(
              "absolute top-1/2 right-3 flex size-6 -translate-y-1/2 items-center justify-center rounded-sm text-gray-8 dark:text-gray-4 outline-none cursor-pointer",
              "hover:transition-scale hover:scale-115 hover:transition-duration-300",
              disabled && "pointer-events-none opacity-50",
            )}
            onPointerDown={(event) => event.preventDefault()}
          >
            <CalendarIcon height={16} width={16} />
          </PopoverTrigger>
        </div>

        {!disabled &&
          (disablePortal ? (
            <PopoverPrimitive.Portal container={containerNode ?? undefined}>
              {popup}
            </PopoverPrimitive.Portal>
          ) : dialogContainer ? (
            <PopoverPrimitive.Portal container={dialogContainer}>{popup}</PopoverPrimitive.Portal>
          ) : (
            <PopoverPrimitive.Portal>{popup}</PopoverPrimitive.Portal>
          ))}
      </Popover>

      <p
        id={`${inputId}-error`}
        className={cn("pl-2 text-left text-xs text-red", !error && "opacity-0")}
      >
        {error || " "}
      </p>
    </div>
  );
});
