import MainLayout from "@/components/layout/MainLayout";
import { useLogout } from "@/hooks/auth-query";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";

const HomePage: NextPageWithLayout = () => {
  const logout = useLogout();
  return (
    <div>
      <button onClick={() => logout.mutate()}>Logout</button>
    </div>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage;
