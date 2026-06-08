import { cn } from "@root/lib/utils";
import type { EmptyContentProps } from "./types";

export const EmptyContent = ({ message, className }: EmptyContentProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <p className="text-base leading-6">{message}</p>
    </div>
  );
};
