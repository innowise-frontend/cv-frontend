import SearchIcon from "@assets/icon/SearchIcon.svg?react";
import { Input } from "../Input/Input";

interface ToolbarProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const Toolbar = ({ value, onValueChange }: ToolbarProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-1space-x-2">
        <div className="relative">
          <Input
            placeholder="Filter"
            value={value}
            onChange={(event) => onValueChange(event.target.value)}
            className=" h-10 w-80 rounded-40 border border-gray-5 pl-10"
          />
          <SearchIcon className="absolute top-2 left-3 text-gray-3 dark:text-gray-5" />
        </div>
      </div>
    </div>
  );
};
