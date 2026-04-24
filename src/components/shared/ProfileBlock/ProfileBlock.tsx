import { Link } from "@tanstack/react-router";
import { Avatar } from "@components/shared";
import type { ProfileBlockProps } from "./types";

export const ProfileBlock = ({
  collapsed = false,
  firstName,
  lastName,
  avatar,
}: ProfileBlockProps) => {
  return (
    <Link to="/profile" className="flex items-center justify-center gap-2">
      <Avatar name={firstName} link={avatar} />
      {!collapsed && `${firstName} ${lastName}`}
    </Link>
  );
};
