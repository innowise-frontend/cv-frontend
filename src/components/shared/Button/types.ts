import { buttonStyles } from "./styles";
import type { ComponentProps } from "react";
import type { VariantProps } from "tailwind-variants";

type UiButtonProps = ComponentProps<typeof import("@components/ui/button").Button>;

export type ButtonProps = Omit<UiButtonProps, "variant"> & {
  variant?: VariantProps<typeof buttonStyles>["variant"];
};
