import React, { useState, useId, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import CloseEyeIcon from "@assets/icon/CloseEyeIcon.svg?react";
import OpenEyeIcon from "@assets/icon/OpenEyeIcon.svg?react";
import { Input as UiInput } from "@components/ui/input";
import { Label } from "@root/components/ui/label";
import { cn } from "@root/lib/utils";
import type { InputWithLabelProps } from "./types";

export const Input = forwardRef<HTMLInputElement, InputWithLabelProps>(
  (
    {
      label,
      className,
      value: controlledValue,
      defaultValue,
      onChange,
      type,
      error,
      disabled,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const generatedId = useId();
    const [initialDefaultValue] = useState(defaultValue);

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
          <Label
            htmlFor={generatedId}
            className={cn(
              "absolute z-10 left-2.5 -top-4 px-1 text-xs text-gray-3 dark:text-gray-5",
              error && "text-red",
            )}
          >
            {label}
          </Label>
        )}
        <div className="relative">
          <UiInput
            disabled={disabled}
            id={generatedId}
            ref={ref}
            type={inputType}
            onChange={handleChange}
            {...(controlledValue !== undefined
              ? { value: controlledValue }
              : { defaultValue: initialDefaultValue })}
            className={cn(
              "cursor-pointer h-12 px-3 py-3 text-base leading-6 placeholder:text-gray-6 border-gray-5 shadow-none outline-none",
              "focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:shadow-none",
              "dark:text-white dark:placeholder:text-gray-3 disabled:bg-gray-6 dark:disabled:bg-gray-3",
              className,
              error &&
                "border-red focus-visible:border-red dark:border-red dark:focus-visible:border-red",
            )}
            {...props}
          />
          {isPasswordField && (
            <button
              disabled={disabled}
              type="button"
              aria-label={t("page.setting.togglePasswordVisibility")}
              onClick={togglePasswordVisibility}
              className="cursor-pointer absolute right-5 top-1/2 -translate-y-1/2 text-gray-3 focus:outline-none dark:text-gray-8 dark:hover:text-gray-8"
            >
              {showPassword ? <OpenEyeIcon /> : <CloseEyeIcon />}
            </button>
          )}
        </div>
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
