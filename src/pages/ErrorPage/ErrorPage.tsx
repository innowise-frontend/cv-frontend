import { useRouter } from "@tanstack/react-router";
import ErrorIcon from "@assets/icon/ErrorIcon.svg?react";
import { Button } from "@components/shared";

interface ErrorPageProps {
  error: string;
}

export const ErrorPage = ({ error }: ErrorPageProps) => {
  const { history } = useRouter();

  const handleGoBack = () => {
    history.back();
  };

  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <div className="flex w-140 flex-col items-center justify-center gap-6 text-black dark:text-white">
        <ErrorIcon />
        <p className="text-4xl">Oops</p>
        <p className="whitespace-pre-line">{error}</p>
        <Button variant="filled" className="w-55" onClick={handleGoBack}>
          GO BACK
        </Button>
      </div>
    </div>
  );
};
