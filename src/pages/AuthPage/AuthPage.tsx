import { useNavigate, useSearch } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Login } from "@components/Login";
import { PageTabs, TabsContent } from "@components/shared";
import { Signup } from "@components/Signup";
import { getTabs, type TabConfig } from "@root/lib";

const AUTH_TAB_CONFIG: TabConfig[] = [
  { value: "login", labelKey: "page.login.tab" },
  { value: "signup", labelKey: "page.signup.tab" },
];

export const AuthPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const tabs = getTabs(AUTH_TAB_CONFIG, t);

  const { mode } = useSearch({
    from: "/_public/auth",
  });

  return (
    <div className="flex flex-1 mx-auto">
      <PageTabs
        className="w-[560px] flex-1"
        isCentered
        tabs={tabs}
        value={mode}
        defaultValue="login"
        onValueChange={(value) => {
          navigate({
            to: "/auth",
            search: { mode: value as "login" | "signup" },
          });
        }}
      >
        <div className="w-[560px] flex items-center">
          <TabsContent value={AUTH_TAB_CONFIG[0].value}>
            <Login />
          </TabsContent>
          <TabsContent value={AUTH_TAB_CONFIG[1].value}>
            <Signup />
          </TabsContent>
        </div>
      </PageTabs>
    </div>
  );
};
