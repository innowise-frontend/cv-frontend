import React, { useState, useId, forwardRef } from "react";
import { Input } from "@components/ui/input";
import OpenEyeIcon from "@assets/icon/OpenEyeIcon.svg?react";
import CloseEyeIcon from "@assets/icon/CloseEyeIcon.svg?react";
import { cn } from "@root/lib/utils";

export interface InputWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
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
              "absolute z-10 left-2.5 -top-2 bg-white px-1 text-xs text-gray-9 dark:bg-gray-15 dark:text-gray-26",
              error && "text-red dark:text-red",
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <Input
            id={generatedId}
            ref={ref}
            type={inputType}
            value={controlledValue}
            onChange={handleChange}
            className={cn(
              className,
              error &&
                "border-red focus-visible:border-red dark:border-red dark:focus-visible:border-red",
            )}
            {...props}
          />
          {isPasswordField && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-9 hover:text-gray-14 focus:outline-none dark:text-white dark:hover:text-white"
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
