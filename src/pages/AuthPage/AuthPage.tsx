import { useNavigate, useSearch } from "@tanstack/react-router";
import { Login } from "@components/Login";
import { PageTabs, TabsContent } from "@components/shared";
import { Signup } from "@components/Signup";

const TABS_ITEMS = [
  {
    label: "Sign in",
    value: "login",
  },
  {
    label: "Sign up",
    value: "signup",
  },
];

export const AuthPage = () => {
  const navigate = useNavigate();

  const { mode } = useSearch({
    from: "/_public/auth",
  });

  return (
    <div className="mx-auto">
      <PageTabs
        className="w-[560px]"
        isCentered
        tabs={TABS_ITEMS}
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
          <TabsContent value={TABS_ITEMS[0].value}>
            <Login />
          </TabsContent>
          <TabsContent value={TABS_ITEMS[1].value}>
            <Signup />
          </TabsContent>
        </div>
      </PageTabs>
    </div>
  );
};
