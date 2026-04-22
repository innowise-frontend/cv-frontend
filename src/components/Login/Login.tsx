import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { ClientError } from "graphql-request";
import { toast } from "sonner";
import { Button } from "@components/shared";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "@root/constants";
import { login } from "@services/auth/login";
import { getMe } from "@services/auth/me";
import { AuthForm } from "../AuthForm";

export const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [, setAccessToken] = useLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, "");
  const [, setRefreshToken] = useLocalStorage(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, "");

  const { mutate } = useMutation({
    mutationFn: (data: { email: string; password: string }) => {
      return login({ email: data.email, password: data.password });
    },
    onSuccess: async (response) => {
      setAccessToken(() => response.access_token);
      setRefreshToken(() => response.refresh_token);

      await queryClient.fetchQuery({
        queryKey: ["me"],
        queryFn: getMe,
      });

      await navigate({ to: "/" });
    },
    onError: (error) => {
      const message =
        error instanceof ClientError ? error.response.errors?.[0].message : error.message;
      toast.error(message);
    },
  });

  return (
    <div className="flex items-center h-screen justify-center">
      <div className="flex flex-col w-full">
        <h2 className="text-34 mb-6">Welcome back</h2>
        <p className="mb-10">Hello again! Sign in to continue</p>
        <AuthForm onSubmit={mutate} label="Sign in" />
        <Button type="button" variant="default" className="w-40 mx-auto">
          <Link to={"/forgot-password"}>Forgot password</Link>
        </Button>
      </div>
    </div>
  );
};
