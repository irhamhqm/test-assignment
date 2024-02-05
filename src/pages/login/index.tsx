import Container from "@/components/commons/container";
import FormTextInput from "@/components/commons/form/TextInput";
import MainLayout from "@/components/layout/MainLayout";
import Navbar from "@/components/navbar";
import { useLogin } from "@/hooks/auth-query";
import { DeviceTabletIcon, LockOpenIcon } from "@heroicons/react/16/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

type FormData = {
  whatsapp: string;
  password: string;
};

const schema = yup
  .object({
    whatsapp: yup.string().required("Nomor whatsapp tidak boleh kosong."),
    password: yup.string().required("Password tidak boleh kosong"),
  })
  .required();

const containerClass = "mb-6";
const textInputClass = "px-2.5 py-3 text-[#8898aa] shadow-md";

const LoginForm = () => {
  const { register, handleSubmit, ...rest } = useForm<FormData>({
    defaultValues: {
      whatsapp: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const login = useLogin();

  const onSubmit = (data: FormData) => {
    login.mutate(data);
  };

  return (
    <div className="flex flex-col mx-auto lg:px-[15px] pb-12">
      <div className="bg-[#f7fafc] rounded-md mt-14 p-12 w-[540px] mx-auto">
        <div className="text-sm text-[#8898aa] text-center mb-6">Login</div>
        <FormProvider
          register={register}
          handleSubmit={handleSubmit}
          {...rest}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormTextInput
              containerClass={containerClass}
              inputClass={textInputClass}
              label=""
              placeholder="Nomor WA"
              name="whatsapp"
              icon={<DeviceTabletIcon />}
            />
            <FormTextInput
              containerClass={containerClass}
              inputClass={textInputClass}
              label=""
              placeholder="Password"
              name="password"
              type="password"
              icon={<LockOpenIcon />}
            />
            <button
              type="submit"
              value="Submit"
              className="bg-[#287d3e] block px-5 py-[10px] text-white font-semibold text-sm mx-auto rounded-[4px] shadow-md"
            >
              Masuk
            </button>
          </form>
        </FormProvider>
      </div>
      <Link
        className="block mt-4 text-[#ced4da] text-sm"
        href="/register"
      >
        Buat akun baru
      </Link>
    </div>
  );
};

export default function LoginPage() {
  return (
    <MainLayout>
      <Container>
        <LoginForm />
      </Container>
    </MainLayout>
  );
}
