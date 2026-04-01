import * as React from "react";

import { cn } from "@root/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center text-sm leading-none font-medium dark:border-gray-22 dark:bg-gray-15 dark:text-gray-19",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
