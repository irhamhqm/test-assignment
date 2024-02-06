import Image from "next/image";
import Container from "../commons/container";
import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function Navbar() {
  return (
    <div className="p-4">
      <Container>
        <div className="flex flex-1 items-center lg:px-[15px] pb-12">
          <div className="w-[130px] h-[50px]relative">
            <Image
              src={"/panglima-propertindo.png"}
              alt="panglima propertindo"
              width={130}
              height={50}
            />
          </div>
          <div className="hidden lg:flex mt-0 ml-auto items-center justify-center text-white text-sm leading-normal">
            <Link
              href="/home"
              className="p-4"
            >
              Beranda
            </Link>
            <Link
              href="/login"
              className="p-4"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="p-4"
            >
              Daftar
            </Link>
          </div>
          <div className="flex lg:hidden mt-0 ml-auto w-[30px] h-[30px] justify-center items-center">
            <Bars3Icon color="white" />
          </div>
        </div>
      </Container>
    </div>
  );
}
