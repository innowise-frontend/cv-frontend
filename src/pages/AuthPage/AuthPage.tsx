import { useNavigate, useSearch } from "@tanstack/react-router";
import { LoginComponent } from "@components/LoginComponent";
import { PageTabs, TabsContent } from "@components/shared";
import { SignupComponent } from "@components/SignupComponent";

export const AuthPage = () => {
  const navigate = useNavigate();

  const { mode } = useSearch({
    from: "/auth",
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
            <LoginComponent />
          </TabsContent>
          <TabsContent value="signup">
            <SignupComponent />
          </TabsContent>
        </div>
      </PageTabs>
    </div>
  );
};
