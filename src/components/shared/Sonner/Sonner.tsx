import { Toaster } from "@components/ui/sonner";

export const Sonner = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        classNames: {
          success: "z-50 backdrop-blur-sm rounded-md",
          error: "z-50 border-red! text-red! backdrop-blur-sm rounded-md!",

          description: "text-gray-2",
        },
      }}
    />
  );
};
