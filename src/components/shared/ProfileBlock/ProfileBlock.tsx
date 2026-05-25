import { Link } from "@tanstack/react-router";
import { Avatar } from "@components/shared";
import { useUserProfile } from "@root/components/UserProfile/Profile/api";
import { useAuth } from "@root/hooks";
import type { ProfileBlockProps } from "./types";

export const ProfileBlock = ({ collapsed = false }: ProfileBlockProps) => {
  const { userId } = useAuth();
  const { data } = useUserProfile(userId);

  if (!userId) return null;

  const profile = data?.user?.profile;
  const fullName = profile?.full_name ?? "";

  return (
    <Link
      to="/users/$userId/profile"
      params={{ userId }}
      className="flex px-4 items-center gap-2 overflow-hidden"
    >
      <Avatar name={fullName} imageSrc={profile?.avatar ?? ""} className="shrink-0" />
      {!collapsed && fullName && (
        <span className="truncate" title={fullName}>
          {fullName}
        </span>
      )}
    </Link>
  );
};
