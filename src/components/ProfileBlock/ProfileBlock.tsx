import { Link } from "@tanstack/react-router";

const ProfileBlock = () => {
  return (
    <Link to="/profile" className="flex items-center gap-2.5 pl-2">
      <div className="w-10 h-10 rounded-full bg-red-4 text-white flex items-center justify-center">
        R
      </div>
      Rostislav Harlanov
    </Link>
  );
};

export default ProfileBlock;
