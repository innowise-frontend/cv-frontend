import { Link } from "@tanstack/react-router";

interface LinkButtonProps {
  title: string;
  to: string;
  icon: React.ElementType;
}

export const LinkButton = ({ title, to, icon: Icon }: LinkButtonProps) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 p-4 rounded-r-40 cursor-pointer"
      activeProps={{ className: "opacity-100 bg-gray-6 dark:bg-gray-3" }}
      inactiveProps={{ className: "text-gray-2 dark:text-gray-4" }}
    >
      <Icon alt={title} width={24} height={24} />
      {title}
    </Link>
  );
};
