import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AuthForm } from "@components/AuthForm";
import { Button } from "@components/shared";
import { useLocalStorage } from "@hooks/index";
import { LOCAL_STORAGE_KEYS } from "@root/constants";
import { getErrorToastMessage } from "@root/lib";
import { getMe, signup } from "@services/auth";

export const Signup = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const [, setAccessToken] = useLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, "");
  const [, setRefreshToken] = useLocalStorage(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, "");

  const { mutate } = useMutation({
    mutationFn: (data: { email: string; password: string }) => {
      return signup({
        email: data.email,
        password: data.password,
      });
    },
    onSuccess: async (response) => {
      setAccessToken(() => response.access_token);
      setRefreshToken(() => response.refresh_token);

      await queryClient.fetchQuery({
        queryKey: ["me"],
        queryFn: getMe,
      });

      await navigate({ to: "/", search: (prev) => ({ ...prev, search: undefined }) });
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });

  return (
    <div className="flex items-center h-screen justify-center">
      <div className="flex flex-col w-full">
        <h2 className="text-34 mb-6">Sign up now</h2>
        <p className="mb-10">Welcome! Sign up to continue</p>
        <AuthForm onSubmit={mutate} label="Create account" />
        <Button
          type="button"
          variant="default"
          className="w-55 mx-auto"
          onClick={() => {
            navigate({
              to: "/auth",
              search: { mode: "login" },
            });
          }}
        >
          I have an account
        </Button>
      </div>
    </div>
  );
};
