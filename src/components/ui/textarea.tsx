import * as React from "react"

import { cn } from "@root/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full min-w-0 rounded-none min-h-16 border border-gray-11 px-3 py-5 text-base leading-6 text-gray-14 outline-none placeholder:text-gray-7 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-gray-11 dark:border-gray-22 dark:text-white dark:placeholder:text-gray-24 dark:focus-visible:border-gray-22",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
