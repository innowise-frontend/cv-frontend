import * as React from "react";
import { cn } from "@root/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "pointer-events-none absolute z-10 flex origin-left select-none items-center gap-2 font-medium leading-none transition-all duration-300",
        "-top-0.5 translate-x-2.5 -translate-y-4 text-xs text-gray-3 opacity-100 dark:text-gray-5",
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:translate-x-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-6 peer-placeholder-shown:opacity-0",
        "peer-focus:-top-0.5 peer-focus:translate-x-2.5 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:opacity-100 peer-focus:text-gray-3 peer-focus:dark:text-gray-5",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
