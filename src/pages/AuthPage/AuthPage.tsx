import { useNavigate, useSearch } from "@tanstack/react-router";
import { Login } from "@components/Login";
import { PageTabs, TabsContent } from "@components/shared";
import { Signup } from "@components/Signup";

export const AuthPage = () => {
  const navigate = useNavigate();

  const { mode } = useSearch({
    from: "/_public/auth",
  });

  return (
    <div className="mx-auto">
      <PageTabs
        className="w-[560px]"
        centered
        tabs={[
          {
            label: "Sign in",
            value: "login",
          },
          {
            label: "Sign up",
            value: "signup",
          },
        ]}
        value={mode}
        defaultValue="login"
        onValueChange={(value) => {
          navigate({
            to: "/auth",
            search: { mode: value as "login" | "signup" },
          });
        }}
      >
        <div className="w-[560px]">
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signup">
            <Signup />
          </TabsContent>
        </div>
      </PageTabs>
    </div>
  );
};
