import React, { useState, useId, forwardRef } from "react";
import {
  nativeAutofillClassName,
  nativePlaceholderClassName,
  themeTextClassName,
} from "@components/shared/formFieldStyles";
import { Textarea as UiTextarea } from "@components/ui/textarea";
import { Label } from "@root/components/ui/label";
import { cn } from "@root/lib/utils";
import type { TextareaWithLabelProps } from "./types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaWithLabelProps>(
  (
    {
      label,
      error,
      className,
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const [initialDefaultValue] = useState(defaultValue);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
    };

    return (
      <div className="relative w-full">
        <UiTextarea
          id={generatedId}
          placeholder={placeholder}
          ref={ref}
          onChange={handleChange}
          {...(controlledValue !== undefined
            ? { value: controlledValue }
            : { defaultValue: initialDefaultValue })}
          className={cn(
            "peer resize-none border-gray-5 px-3 py-5 text-base leading-6 shadow-none outline-none",
            themeTextClassName,
            "focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:shadow-none transition-[border-color,box-shadow] duration-300",
            "disabled:bg-gray-6 dark:disabled:bg-gray-3",
            nativePlaceholderClassName,
            nativeAutofillClassName,
            className,
            error &&
              "border-red focus-visible:border-red dark:border-red dark:focus-visible:border-red",
          )}
          {...props}
        />
        {label && (
          <Label htmlFor={generatedId} className={cn("", error && "text-red dark:text-red")}>
            {label}
          </Label>
        )}
        <p
          id={`${generatedId}-error`}
          className={cn("pl-2 mt-1 text-left text-xs text-red h-3", !error && "invisible")}
        >
          {error || " "}
        </p>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
