import { ReactNode, useCallback, useState } from "react";

import AuthContext from "@/context/auth";

import RouteGuard from "../routeGuard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "../navbar";

type MainLayoutProps = {
  children: ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});

export default function MainLayout({ children }: MainLayoutProps) {
  const [accessToken, setAccessTokenState] = useState<string>("");

  const setAccessToken = useCallback((token: string) => {
    setAccessTokenState(token);
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      <QueryClientProvider client={queryClient}>
        <RouteGuard>
          <>
            <Navbar />
            <>{children}</>
          </>
        </RouteGuard>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}
