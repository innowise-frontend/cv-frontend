import { cn } from "@root/lib/utils";
import { AvatarProps } from "./types";

export const Avatar = ({ name, imageSrc, className }: AvatarProps) => {
  return imageSrc ? (
    <img
      src={imageSrc}
      alt={name ?? ""}
      className={cn("w-10 h-10 rounded-full object-cover", className)}
    />
  ) : (
    <div
      className={cn(
        "w-10 h-10 rounded-full bg-red capitalize flex items-center justify-center",
        className,
      )}
    >
      <span className="text-gray-8 dark:text-gray capitalize">{name?.charAt(0) ?? ""}</span>
    </div>
  );
};
