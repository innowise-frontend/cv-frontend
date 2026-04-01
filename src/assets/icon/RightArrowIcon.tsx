import { cn } from "@root/lib/utils";

export const RightArrowIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 7 10"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
    className={cn("inline-block shrink-0 size-2.5", className)}
  >
    <path d="M1.175 0L0 1.175L3.81667 5L0 8.825L1.175 10L6.175 5L1.175 0Z" fill="currentColor" />
  </svg>
);
