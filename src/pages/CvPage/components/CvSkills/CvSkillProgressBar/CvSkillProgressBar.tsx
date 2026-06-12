import { Button, ProgressBar } from "@components/shared";
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
      <Button variant="ghost" className="capitalize hover:bg-transparent!" onClick={onClick}>
        <ProgressBar
          interactive
          className="px-2"
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
