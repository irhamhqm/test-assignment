import {
  useState,
  useEffect,
  ReactNode,
  useContext,
  ReactElement,
} from "react";
import { useRouter } from "next/router";
import AuthContext from "@/context/auth";

type RouteGuardProps = {
  children: ReactElement;
};

function RouteGuard({ children }: RouteGuardProps): ReactElement {
  const router = useRouter();
  const { accessToken } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    function authCheck(url: string) {
      const publicPaths = ["/register", "/login"];
      const path = url.split("?")[0];
      if (!accessToken && !publicPaths.includes(path)) {
        setAuthorized(false);
        router.push({
          pathname: "/login",
          // query: { returnUrl: router.asPath }
        });
      } else {
        setAuthorized(true);
      }
    }

    authCheck(router.asPath);
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    router.events.on("routeChangeComplete", authCheck);
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [accessToken, router]);

  if (authorized) return children;

  return <div className="xl:flex min-h-[calc(100vh-190px)]">test</div>;
}

export default RouteGuard;
