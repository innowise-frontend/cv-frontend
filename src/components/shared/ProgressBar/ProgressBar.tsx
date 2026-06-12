import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { ProgressIndicator, ProgressTrack } from "@root/components/ui/progress";
import { cn } from "@root/lib/utils";
import { COLORS } from "./constants";
import { getMasteryBarStyles, getProficiencyBarStyles } from "./progressLevelUtils";
import { ProgressBarProps } from "./types";

export const ProgressBar = (props: ProgressBarProps) => {
  const { label, className, chosen, interactive = false } = props;
  const baseStyles =
    "mastery" in props && props.mastery !== undefined
      ? getMasteryBarStyles(props.mastery)
      : getProficiencyBarStyles(props.proficiency);

  const { value, trackClassName, indicatorClassName } = chosen
    ? { ...baseStyles, ...COLORS.default }
    : baseStyles;

  return (
    <div
      className={cn(
        "flex w-71 h-12 items-center gap-4 text-left",
        interactive && "w-full cursor-pointer",
        !chosen && "hover:[&_span]:text-gray-2 dark:hover:[&_span]:text-gray-8",
        className,
      )}
    >
      <ProgressPrimitive.Root value={value} data-slot="progress" className="flex w-19.5 h-1">
        <ProgressTrack className={cn(trackClassName, "rounded-none")}>
          <ProgressIndicator className={indicatorClassName} />
        </ProgressTrack>
      </ProgressPrimitive.Root>
      <span className={cn("shrink-0 text-base transition-colors duration-150 text-gray-3")}>
        {label}
      </span>
    </div>
  );
};
