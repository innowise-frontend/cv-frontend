import React, { useState, useId, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import CloseEyeIcon from "@assets/icon/CloseEyeIcon.svg?react";
import OpenEyeIcon from "@assets/icon/OpenEyeIcon.svg?react";
import { nativePlaceholderClassName } from "@components/shared/formFieldStyles";
import { Input as UiInput } from "@components/ui/input";
import { Label } from "@root/components/ui/label";
import { cn } from "@root/lib/utils";
import type { InputWithLabelProps } from "./types";

export const Input = forwardRef<HTMLInputElement, InputWithLabelProps>(
  (
    {
      label,
      placeholder,
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

    const [showPassword, setShowPassword] = useState(false);

    const isPasswordField = type === "password";
    const inputType = isPasswordField && showPassword ? "text" : type;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    };

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="relative w-full">
        <div className="relative">
          <UiInput
            disabled={disabled}
            id={generatedId}
            ref={ref}
            placeholder={placeholder}
            type={inputType}
            onChange={handleChange}
            {...(controlledValue !== undefined
              ? { value: controlledValue }
              : { defaultValue: initialDefaultValue })}
            className={cn(
              "peer block h-12 cursor-pointer border-gray-5 px-3 py-3 text-base leading-6 shadow-none outline-none",
              "focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:shadow-none transition-all duration-300",
              "dark:text-white disabled:bg-gray-6 dark:disabled:bg-gray-3",
              nativePlaceholderClassName,
              className,
              error &&
                "border-red focus-visible:border-red dark:border-red dark:focus-visible:border-red",
            )}
            {...props}
          />
          <Label htmlFor={generatedId} className={cn("", error && "text-red")}>
            {label}
          </Label>

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
          className={cn("pl-2 text-left text-xs text-red", !error && "opacity-0")}
        >
          {error || " "}
        </p>
      </div>
    );
  },
);
