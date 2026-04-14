import React, { useState, useId, forwardRef } from "react";
import CloseEyeIcon from "@assets/icon/CloseEyeIcon.svg?react";
import OpenEyeIcon from "@assets/icon/OpenEyeIcon.svg?react";
import { Input as UiInput } from "@components/ui/input";
import { cn } from "@root/lib/utils";
import type { InputWithLabelProps } from "./types";

export const Input = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, className, value: controlledValue, onChange, type, error, ...props }, ref) => {
    const generatedId = useId();

    const [value, setValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordField = type === "password";
    const inputType = isPasswordField && showPassword ? "text" : type;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (controlledValue === undefined) {
        setValue(e.target.value);
      }

      onChange?.(e);
    };

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="relative w-full">
        {label && (value || controlledValue) && (
          <label
            htmlFor={generatedId}
            className={cn(
              "absolute z-10 left-2.5 -top-5 px-1 text-xs text-gray-3 dark:text-gray-5",
              error && "text-red",
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <UiInput
            id={generatedId}
            ref={ref}
            type={inputType}
            value={controlledValue}
            onChange={handleChange}
            className={cn(
              "h-12 px-3 py-3 text-base leading-6 placeholder:text-gray-6 border-gray-5 shadow-none outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:shadow-none dark:text-white dark:placeholder:text-gray-3",
              className,
              error &&
                "border-red focus-visible:border-red dark:border-red dark:focus-visible:border-red",
            )}
            {...props}
          />
          {isPasswordField && (
            <button
              type="button"
              aria-label="Toggle password visibility"
              onClick={togglePasswordVisibility}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-3 focus:outline-none dark:text-gray-8 dark:hover:text-gray-8"
            >
              {showPassword ? <OpenEyeIcon /> : <CloseEyeIcon />}
            </button>
          )}
        </div>
        {error && (
          <p id={`${generatedId}-error`} className="pl-2 mt-1.5 text-left text-sm text-red">
            {error}
          </p>
        )}
      </div>
    );
  },
);
