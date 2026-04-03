import { tv } from "tailwind-variants";

export const buttonStyles = tv({
  base: "h-12 inline-flex items-center justify-center rounded-40 px-6 py-4 text-sm font-medium uppercase outline-none focus-visible:outline-none cursor-pointer disabled:cursor-not-allowed",
  variants: {
    variant: {
      default:
        "bg-transparent text-gray-28 hover:bg-transparent hover:text-gray-16 dark:hover:text-gray-25",
      filled:
        "bg-red-4 text-white shadow-button hover:!bg-red-4 disabled:bg-gray-12 disabled:border-gray-12 disabled:text-gray-6 disabled:shadow-none dark:disabled:bg-gray-19 dark:disabled:border-gray-19 dark:disabled:text-gray-29",
      outline:
        "border border-gray-11 bg-transparent text-gray-11 hover:bg-transparent dark:border-gray-22 dark:text-gray-25",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
