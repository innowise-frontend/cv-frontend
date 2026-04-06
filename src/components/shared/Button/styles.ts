import { tv } from "tailwind-variants";

export const buttonStyles = tv({
  base: "h-12 inline-flex items-center justify-center rounded-40 px-6 py-4 text-sm font-medium uppercase outline-none focus-visible:outline-none cursor-pointer disabled:cursor-not-allowed",
  variants: {
    variant: {
      default: "bg-transparent text-gray-2 hover:bg-transparent dark:text-gray-5",
      filled:
        "bg-red text-white border-none shadow-button disabled:bg-gray-4 disabled:text-gray-6 disabled:shadow-none dark:disabled:bg-gray-2 dark:disabled:text-gray-5",
      outline:
        "border border-gray-2 bg-transparent text-gray-2 hover:bg-transparent dark:border-gray-6 dark:text-gray-6",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
