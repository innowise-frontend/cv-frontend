import { Button as UiButton } from "@components/ui/button";
import { cn } from "@root/lib/utils";
import type { ComponentProps } from "react";

const BUTTON_BASE_STYLES =
  "h-12 inline-flex items-center justify-center rounded-40 px-6 py-4 text-sm uppercase font-medium outline-none focus-visible:outline-none cursor-pointer disabled:cursor-not-allowed";

const BUTTON_VARIANT_STYLES = {
  default:
    "bg-transparent text-gray-28 hover:bg-transparent hover:text-gray-16 dark:hover:text-gray-25",
  filled:
    "bg-red-4 text-white shadow-button hover:!bg-red-4 disabled:bg-gray-12 disabled:border-gray-12 disabled:text-gray-6 disabled:shadow-none dark:disabled:bg-gray-19 dark:disabled:border-gray-19 dark:disabled:text-gray-29",
  outline:
    "border border-gray-11 bg-transparent text-gray-11 hover:bg-transparent dark:border-gray-22 dark:text-gray-25",
} as const;

type ButtonVariant = keyof typeof BUTTON_VARIANT_STYLES;

type ButtonProps = Omit<ComponentProps<typeof UiButton>, "variant"> & {
  variant?: ButtonVariant;
};

export function Button({ variant = "default", className, ...props }: ButtonProps) {
  return (
    <UiButton
      variant="default"
      className={cn(BUTTON_BASE_STYLES, BUTTON_VARIANT_STYLES[variant], className)}
      {...props}
    />
  );
}
