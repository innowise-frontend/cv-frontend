import { useQuery } from "@tanstack/react-query";
import { createContext, type ReactNode } from "react";
import { LOCAL_STORAGE_KEYS } from "@root/constants/localStorage";
import { getMe } from "@services/auth";
import { UserRole } from "@services/graphql/__generated__/graphql";

export interface AuthContextType {
  userId: string;
  isAdmin: boolean;
  isAuthenticated: boolean;
  isFirstLoad: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const hasAccessToken = !!localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

  const { data, isLoading: isFirstLoad } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: hasAccessToken,
    retry: false,
  });

  const isAdmin = data?.role === UserRole.Admin;
  const isAuthenticated = hasAccessToken && (isFirstLoad || !!data);
  const userId = data?.id ?? "";

  return (
    <AuthContext.Provider value={{ userId, isAdmin, isAuthenticated, isFirstLoad }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
