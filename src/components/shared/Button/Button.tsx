import { Button as UiButton } from "@components/ui/button";
import { cn } from "@root/lib/utils";
import { buttonStyles } from "./styles";
import type { ButtonProps } from "./types";

export const Button = ({ variant = "default", className, ...props }: ButtonProps) => {
  return (
    <UiButton variant="ghost" className={cn(buttonStyles({ variant }), className)} {...props} />
  );
};

export type { ButtonProps } from "./types";
