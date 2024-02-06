import Image from "next/image";
import Container from "../commons/container";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-4">
      <Container>
        <div
          className={`${
            open
              ? "bg-white rounded-md flex flex-1 items-center p-6 flex-wrap"
              : "flex flex-1 items-center lg:px-[15px] pb-12"
          }`}
        >
          <div className="w-[130px] h-[50px]relative">
            <Image
              src={"/panglima-propertindo.png"}
              alt="panglima propertindo"
              width={130}
              height={50}
            />
          </div>
          <div className={`${open ? "w-8 h-8 ml-auto" : "hidden"}`}>
            <XMarkIcon onClick={() => setOpen(false)} />
          </div>
          <div
            className={`${
              open
                ? "hidden"
                : "flex lg:hidden mt-0 ml-auto w-[30px] h-[30px] justify-center items-center"
            }`}
          >
            <Bars3Icon
              color="white"
              onClick={() => setOpen(true)}
            />
          </div>
          <div
            className={`${
              open
                ? "flex flex-col w-full text-[#172b4d] font-medium"
                : "hidden lg:flex mt-0 ml-auto items-center justify-center text-white text-sm leading-normal"
            } `}
          >
            <Link
              href="/"
              className={`${open ? "py-4" : "p-4"}`}
            >
              Beranda
            </Link>
            <Link
              href="/login"
              className={`${open ? "py-4" : "p-4"}`}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={`${open ? "py-4" : "p-4"}`}
            >
              Daftar
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
