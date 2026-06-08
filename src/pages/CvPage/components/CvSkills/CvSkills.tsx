import { useParams } from "@tanstack/react-router";
import { CvSkillsEditor } from "./CvSkillsEditor";

export const CvSkills = () => {
  const { cvId } = useParams({ from: "/_app/cvs/$cvId" });

  return (
    <div className="mx-auto flex flex-col w-[852px] pt-8">
      <CvSkillsEditor cvId={cvId} />
    </div>
  );
};
