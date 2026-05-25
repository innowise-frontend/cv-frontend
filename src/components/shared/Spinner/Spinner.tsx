import { Spinner as UISpinner } from "@components/ui/spinner";

export const Spinner = () => {
  return (
    <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-gray/60">
      <UISpinner className="size-24 text-red" />
    </div>
  );
};
