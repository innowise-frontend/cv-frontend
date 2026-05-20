import { themeTextClassName } from "@components/shared/formFieldStyles";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@components/ui/input-otp";
import { cn } from "@root/lib/utils";
import { CodeInputProps } from "./types";

export const CodeInput = ({ value, onChange, length = 6, className, error }: CodeInputProps) => {
  return (
    <InputOTP
      value={value}
      onChange={onChange}
      maxLength={length}
      className={cn("justify-center", className)}
      inputMode="numeric"
      pattern="[0-9]"
    >
      <InputOTPGroup className="gap-4 rounded-none">
        {Array.from({ length }, (_, index) => (
          <InputOTPSlot
            key={`otp-slot-${index}`}
            inputMode="numeric"
            index={index}
            className={cn(
              "size-12 rounded-none border border-gray-5 text-base shadow-none dark:border-gray-5",
              themeTextClassName,
              "data-[active=true]:ring-0 data-[active=true]:ring-transparent data-[active=true]:ring-offset-0",
              "data-[active=true]:border-gray-5 data-[active=true]:shadow-none",
              error && "border-red dark:border-red",
            )}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
};
