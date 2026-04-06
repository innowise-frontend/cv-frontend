import React, { useState, useId, forwardRef } from "react";
import { Textarea as UiTextarea } from "@components/ui/textarea";
import { cn } from "@root/lib/utils";
import type { TextareaWithLabelProps } from "./types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaWithLabelProps>(
  ({ label, className, value: controlledValue, onChange, placeholder, ...props }, ref) => {
    const generatedId = useId();

    const [value, setValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (controlledValue === undefined) {
        setValue(e.target.value);
      }

      onChange?.(e);
    };

    return (
      <div className={"relative w-full"}>
        {label && (value || controlledValue) && (
          <label
            htmlFor={generatedId}
            className="absolute left-2.5 -top-5 px-1 text-xs text-gray-2 dark:text-gray-4"
          >
            {label}
          </label>
        )}

        <UiTextarea
          id={generatedId}
          placeholder={placeholder}
          ref={ref}
          value={controlledValue}
          onChange={handleChange}
          className={cn(
            "px-3 py-5 text-base leading-6 placeholder:text-gray-5 border-gray-4 shadow-none outline-none resize-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:shadow-none dark:placeholder:text-gray-2",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
