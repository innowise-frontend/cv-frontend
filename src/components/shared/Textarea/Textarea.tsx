import React, { useState, useId, forwardRef } from "react";
import { nativePlaceholderClassName } from "@components/shared/formFieldStyles";
import { Textarea as UiTextarea } from "@components/ui/textarea";
import { Label } from "@root/components/ui/label";
import { cn } from "@root/lib/utils";
import type { TextareaWithLabelProps } from "./types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaWithLabelProps>(
  (
    { label, className, value: controlledValue, defaultValue, onChange, placeholder, ...props },
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
            "focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:shadow-none transition-all duration-300",
            nativePlaceholderClassName,
            className,
          )}
          {...props}
        />
        {label && <Label htmlFor={generatedId}>{label}</Label>}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
