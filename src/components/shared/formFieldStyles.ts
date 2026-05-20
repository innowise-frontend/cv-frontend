/** Native placeholder (Input, Textarea) */
export const nativePlaceholderClassName =
  "placeholder:text-base placeholder:text-gray-6 dark:placeholder:text-gray-3 disabled:placeholder:text-gray-2 disabled:dark:placeholder:text-gray-6 focus:placeholder:opacity-0";

/** Select trigger placeholder (SelectValue data-placeholder) */
export const selectPlaceholderClassName =
  "data-placeholder:text-base data-placeholder:text-gray-6 dark:data-placeholder:text-gray-3 disabled:data-placeholder:text-gray-2 disabled:dark:data-placeholder:text-gray-6";

/** Custom placeholder element (MultiSelect trigger span) */
export const customPlaceholderClassName = "text-base text-gray-6 dark:text-gray-3";

export const getFormFieldClassList = (classNames: string) => classNames.split(" ").filter(Boolean);
