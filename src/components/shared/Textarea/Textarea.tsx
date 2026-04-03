import React, { useState, useId, forwardRef } from "react";
import { Textarea } from "@components/ui/textarea";
import { cn } from "@root/lib/utils";
import type { TextareaWithLabelProps } from "./types";

export const TextareaWithLabel = forwardRef<HTMLTextAreaElement, TextareaWithLabelProps>(
  ({ label, className, value: controlledValue, onChange, ...props }, ref) => {
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
            className="absolute left-2.5 -top-2 bg-white px-1 text-xs text-gray-9 dark:bg-gray-15 dark:text-gray-26"
          >
            {label}
          </label>
        )}

        <Textarea
          id={generatedId}
          ref={ref}
          value={controlledValue}
          onChange={handleChange}
          className={cn(
            "px-3 py-5 text-base leading-6 text-gray-14 placeholder:text-gray-7 border-gray-11 shadow-none outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:shadow-none dark:border-gray-22 dark:text-white dark:placeholder:text-gray-24",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

TextareaWithLabel.displayName = "TextareaWithLabel";
