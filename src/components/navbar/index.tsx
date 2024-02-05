import Image from "next/image";
import Container from "../commons/container";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="p-4">
      <Container>
        <div className="w-[130px] h-[50px] relative">
          <Image
            src={"/panglima-propertindo.png"}
            alt="panglima propertindo"
            fill
          />
        </div>
        <div className="flex mt-0 ml-auto items-center justify-center text-white text-sm leading-normal">
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
        <div className="hidden">Menu</div>
      </Container>
    </div>
  );
}
