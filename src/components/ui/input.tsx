import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@root/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "w-full min-w-0 rounded-none border border-gray-11 p-3 text-base leading-6 text-gray-14 outline-none placeholder:text-gray-7 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-gray-11 dark:border-gray-22 dark:text-white dark:placeholder:text-gray-24 dark:focus-visible:border-gray-22",
        className
      )}
      {...props}
    />
  )
}

export { Input }
