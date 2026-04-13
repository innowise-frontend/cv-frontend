import { tv } from "tailwind-variants";

export const buttonStyles = tv({
  base: "h-12 inline-flex items-center justify-center rounded-40 px-6 py-4 text-sm font-medium uppercase outline-none focus-visible:outline-none cursor-pointer disabled:cursor-not-allowed",
  variants: {
    variant: {
      default: "bg-transparent text-gray-3 hover:bg-transparent dark:text-gray-6",
      filled:
        "bg-red text-gray-8 border-none shadow-button disabled:bg-gray-5 disabled:text-gray-7 disabled:shadow-none dark:disabled:bg-gray-3 dark:disabled:text-gray-6",
      outline:
        "border border-gray-3 bg-transparent text-gray-3 hover:bg-transparent dark:border-gray-7 dark:text-gray-7",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
