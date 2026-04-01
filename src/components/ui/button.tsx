import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@root/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-40 px-6 py-4 text-sm uppercase font-medium outline-none focus-visible:outline-none cursor-pointer disabled:cursor-not-allowed ",
  {
    variants: {
      variant: {
        default: "text-gray-28 hover:text-gray-16 dark:hover:text-gray-25",
        filled: "bg-red-4 text-white shadow-button disabled:bg-gray-12 disabled:border-gray-12 disabled:text-gray-6 disabled:shadow-none dark:disabled:bg-gray-19 dark:disabled:border-gray-19 dark:disabled:text-gray-29 ",
        outline:
          "border border-gray-11 bg-transparent text-gray-11 dark:border-gray-22 dark:text-gray-25"
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  },
);

function Button({
  className,
  variant = "filled",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Button };
