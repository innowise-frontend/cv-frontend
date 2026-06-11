/** Matches body/#root theme text; use where inheritance breaks (e.g. portaled modals). */
export const themeTextClassName = "text-gray-2 dark:text-gray-8";

/** Native placeholder (Input, Textarea) */
export const nativePlaceholderClassName =
  "placeholder:text-base placeholder:text-gray-6 dark:placeholder:text-gray-3 disabled:placeholder:text-gray-2 disabled:dark:placeholder:text-gray-6 focus:placeholder:opacity-0";

/** Override browser autofill background/text (Input, Textarea) */
export const nativeAutofillClassName =
  "autofill:shadow-[inset_0_0_0_1000px_var(--color-gray-8)_inset] autofill:[-webkit-text-fill-color:var(--color-gray-2)] autofill:[caret-color:var(--color-gray-2)] autofill:[transition:background-color_99999s_ease-out_0s] dark:autofill:shadow-[inset_0_0_0_1000px_var(--color-gray-2)_inset] dark:autofill:[-webkit-text-fill-color:var(--color-gray-8)] dark:autofill:[caret-color:var(--color-gray-8)] dark:autofill:[transition:background-color_99999s_ease-out_0s,-webkit-text-fill-color_99999s_ease-out_0s]";

/** Select trigger placeholder (SelectValue data-placeholder) */
export const selectPlaceholderClassName =
  "data-placeholder:text-base data-placeholder:text-gray-6 dark:data-placeholder:text-gray-3 disabled:data-placeholder:text-gray-2 disabled:dark:data-placeholder:text-gray-6";

/** Custom placeholder element (MultiSelect trigger span) */
export const customPlaceholderClassName = "text-base text-gray-6 dark:text-gray-3";

export const formFieldErrorBorderClassName =
  "border-red focus-visible:border-red dark:border-red dark:focus-visible:border-red";

/** Reserved placeholder so the error slot keeps height when empty */
export const formFieldErrorPlaceholder = "\u00A0";

export const formFieldErrorHiddenClassName = "opacity-0";

/** Fixed-height error slot: prevents layout shift when validation messages appear */
export const formFieldErrorMessageClassName =
  "h-4 shrink-0 overflow-hidden pl-2 pt-[2px] text-left text-[12px] leading-4 text-red truncate";

export const getFormFieldErrorClassName = (error?: string) =>
  `${formFieldErrorMessageClassName}${error ? "" : ` ${formFieldErrorHiddenClassName}`}`;

export const getFormFieldClassList = (classNames: string) => classNames.split(" ").filter(Boolean);

export const modalFormBodyClassName = "flex flex-col gap-y-5";

export const modalFormRowGridClassName = "grid grid-cols-2 gap-x-3";

export const modalFormTwoColumnGridClassName = "grid grid-cols-2 gap-x-3 gap-y-5";

export const modalFormWideTwoColumnGridClassName = "grid grid-cols-[400px_400px] gap-y-5 gap-x-3";
