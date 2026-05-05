import { cn } from "@root/lib/utils";
import { AvatarProps } from "./types";

export const Avatar = ({ name, link, className }: AvatarProps) => {
  return link ? (
    <img src={link} alt={name} className={cn("w-10 h-10 rounded-full object-cover", className)} />
  ) : (
    <div
      className={cn(
        "w-10 h-10 rounded-full bg-red text-gray-8 dark:text-gray capitalize flex items-center justify-center",
        className,
      )}
    >
      {name.charAt(0)}
    </div>
  );
};
