import { Link } from "@tanstack/react-router";

export const ProfileBlock = () => {
  return (
    <Link to="/profile" className="flex items-center gap-2.5 pl-2">
      <div className="w-10 h-10 rounded-full bg-red text-white dark:text-black flex items-center justify-center ">
        R
      </div>
      Rostislav Harlanov
    </Link>
  );
};
