import { ReactNode, useState } from "react";

import RouteGuard from "../routeGuard"; // bug
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "../navbar";
import WhatsappPlugin from "../whatsapp-plugin";
import { AuthContextProvider } from "@/context/auth";

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
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouteGuard>
          <>
            <Navbar />
            <>{children}</>
            <WhatsappPlugin />
          </>
        </RouteGuard>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
