import { Button, ProgressBar } from "@components/shared";
import { cn } from "@root/lib";
import { CvSkillProgressBarProps } from "./types";

export const CvSkillProgressBar = ({
  name,
  mastery,
  chosen = false,
  isDeleteMode = false,
  onClick,
}: CvSkillProgressBarProps) => {
  if (isDeleteMode) {
    return (
      <Button variant="ghost" className="capitalize" onClick={onClick}>
        <ProgressBar
          className={cn(
            "px-2 cursor-pointer transition-colors duration-150 hover:bg-gray-7 dark:hover:bg-gray-5",
            chosen && "*:text-gray *:dark:text-gray-8",
          )}
          key={name}
          label={name}
          mastery={mastery}
          chosen={chosen}
        />
      </Button>
    );
  }

  return <ProgressBar className="px-2 capitalize" key={name} label={name} mastery={mastery} />;
};
