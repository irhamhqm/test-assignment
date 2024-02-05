import MainLayout from "@/components/layout/MainLayout";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <MainLayout>
      <div>
        <button onClick={() => null}>Logout</button>
      </div>
    </MainLayout>
  );
}
