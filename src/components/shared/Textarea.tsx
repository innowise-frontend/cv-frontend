import React, { useState, useId, forwardRef } from "react";
import { Textarea } from "@components/ui/textarea";

export interface TextareaWithLabelProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

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
          className={className}
          {...props}
        />
      </div>
    );
  },
);

TextareaWithLabel.displayName = "TextareaWithLabel";
