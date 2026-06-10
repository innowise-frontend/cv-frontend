import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@components/shared";
import { useLocalStorage } from "@hooks/index";
import { LOCAL_STORAGE_KEYS } from "@root/constants";
import { getErrorToastMessage } from "@root/lib";
import { login, getMe } from "@services/auth";
import { AuthForm } from "../AuthForm";
import type { AuthFormValues } from "../AuthForm/validation";

export const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [, setAccessToken] = useLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, "");
  const [, setRefreshToken] = useLocalStorage(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, "");

  const { mutate } = useMutation({
    mutationFn: (data: AuthFormValues) => {
      return login({ email: data.email, password: data.password });
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

  const handleFormSubmit = ({ email, password }: AuthFormValues) => {
    mutate({ email, password });
  };

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col w-full">
        <h2 className="text-34 mb-6">Welcome back</h2>
        <p className="mb-10">Hello again! Sign in to continue</p>
        <AuthForm onSubmit={handleFormSubmit} label="Sign in" />
        <Button type="button" variant="default" className="w-40 mx-auto">
          <Link to={"/forgot-password"}>Forgot password</Link>
        </Button>
      </div>
    </div>
  );
};
