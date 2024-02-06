import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const AuthContext = createContext({
  accessToken: "",
  setAccessToken: (token: string) => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState("");
  const contextValue = useMemo(
    () => ({
      accessToken,
      setAccessToken,
    }),
    [accessToken, setAccessToken]
  );

  useEffect(() => {
    if (accessToken) {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, [accessToken, router]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
