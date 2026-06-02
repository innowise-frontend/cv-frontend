import { useParams } from "@tanstack/react-router";
import { useAuth } from "@root/hooks";
import { ProfileSkillsEditor, ProfileSkillsView } from "./index";

export const Skills = () => {
  const { userId: profileUserId } = useParams({ from: "/_app/users/$userId" });
  const { userId: viewerId, isAdmin } = useAuth();
  const canEdit = isAdmin || (!!viewerId && viewerId === profileUserId);

  return (
    <div className="mx-auto flex flex-col w-[852px] pt-8">
      {canEdit ? (
        <ProfileSkillsEditor userId={profileUserId} />
      ) : (
        <ProfileSkillsView userId={profileUserId} />
      )}
    </div>
  );
};
