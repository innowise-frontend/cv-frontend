import { Toaster } from "@components/ui/sonner";

export const Sonner = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        classNames: {
          success: "backdrop-blur-sm rounded-md",
          error: "border-red! text-red! backdrop-blur-sm rounded-md!",
          description: "text-gray-2",
        },
      }}
    />
  );
};
