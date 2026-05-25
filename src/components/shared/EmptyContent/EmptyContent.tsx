import type { EmptyContentProps } from "./types";

export const EmptyContent = ({ message }: EmptyContentProps) => {
  return (
    <div className="flex flex-col items-center justify-center my-24">
      <p className="text-sm">{message}</p>
    </div>
  );
};
