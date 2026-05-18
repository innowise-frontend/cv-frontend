import * as React from "react";
import { cn } from "@root/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 absolute z-10 duration-300 origin-left transition-all -translate-y-4 translate-x-2.5 -top-0.5 text-xs text-gray-3 opacity-100 peer-placeholder-shown:text-sm peer-placeholder-shown:opacity-0 peer-placeholder-shown:text-gray-6 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus: peer-focus:-translate-y-4 peer-focus:translate-x-2.5 peer-focus:text-xs peer-focus:-top-0.5 peer-focus:opacity-100 peer-focus:text-gray-3 peer-focus:dark:text-gray-5 dark:text-gray-5",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
