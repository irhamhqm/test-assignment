import Container from "@/components/commons/container";
import FormSelectInput from "@/components/commons/form/SelectInput";
import FormTextInput from "@/components/commons/form/TextInput";
import { PROFESSIONS } from "@/constants";
import {
  useGetProvinces,
  useGetCitiesByProvinceId,
  useGetMarketings,
  useGetProjects,
  useGetUnitTypesByProjectId,
} from "@/hooks/master-data-query";
import { useRegisterAndBuyNub } from "@/hooks/auth-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";

import {
  CreditCardIcon,
  DeviceTabletIcon,
  EnvelopeIcon,
  LockOpenIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import axios from "axios";

type FormData = {
  id_number?: string;
  name: string;
  email?: string;
  province_id: string;
  city_id: string;
  profession?: string;
  professionManualInput?: string;
  sales_id: string;
  project_id: string;
  unit_type_id: string;
  whatsapp: string;
  password: string;
  password_confirmation: string;
};

const schema = yup
  .object({
    id_number: yup.string(),
    name: yup.string().required("Nama tidak boleh kosong."),
    email: yup.string().email(),
    province_id: yup.string().required("Provinsi tidak valid."),
    city_id: yup.string().required("Kota tidak valid."),
    profession: yup.string(),
    professionManualInput: yup.string(),
    sales_id: yup.string().required("Marketing tidak valid."),
    project_id: yup.string().required("Project tidak valid."),
    unit_type_id: yup.string().required("Tipe unit tidak valid."),
    whatsapp: yup.string().required("Nomor whatsapp tidak boleh kosong."),
    password: yup
      .string()
      .required("Password tidak boleh kosong")
      .min(8, "Password minimal 8 karakter."),
    password_confirmation: yup
      .string()
      .required("Konfirmasi password tidak boleh kosong.")
      .min(8, "Password minimal 8 karakter.")
      .oneOf([yup.ref("password")], "Password harus sama."),
  })
  .required();

const containerClass = "mb-6";
const labelClass = "mb-2 text-[#212529]";
const textInputClass = "px-2.5 py-3 text-[#8898aa] shadow-md";
const selectInputClass = "px-2.5 py-3 border border-gray";

const RegisterPage: NextPageWithLayout = () => {
  const { register, handleSubmit, formState, watch, ...rest } =
    useForm<FormData>({
      defaultValues: {
        id_number: "",
        name: "",
        email: "",
        province_id: "",
        city_id: "",
        profession: "",
        professionManualInput: "",
        sales_id: "",
        project_id: "",
        unit_type_id: "",
        whatsapp: "",
        password: "",
        password_confirmation: "",
      },
      resolver: yupResolver(schema),
      mode: "onBlur",
    });
  const provinces = useGetProvinces();
  const citiesById = useGetCitiesByProvinceId({ id: watch("province_id") });
  const marketings = useGetMarketings();
  const projects = useGetProjects();
  const unitTypes = useGetUnitTypesByProjectId({ id: watch("project_id") });
  const registerAndBuyNub = useRegisterAndBuyNub();

  const onSubmit = (data: FormData) => {
    const { professionManualInput, ...rest } = data;
    if (data.profession === "7" && professionManualInput) {
      registerAndBuyNub.mutate({ ...rest, profession: professionManualInput });
    } else {
      registerAndBuyNub.mutate({ ...rest });
    }
  };

  return (
    <div className="bg-[#f7fafc] rounded-md mt-14 p-4 sm:p-12 3xs:w-72 2xs:w-[21.5rem] xs:w-96 md:w-[540px] mx-auto mb-20">
      <FormProvider
        register={register}
        handleSubmit={handleSubmit}
        formState={formState}
        watch={watch}
        {...rest}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-[26px] font-semibold text-brand-blue text-center">
            Daftar
          </div>
          <div className="text-center text-text-muted text-xs mt-2 mb-6">
            Silahkan login jika sudah memiliki akun{" "}
            <Link
              className="text-[#287d3e]"
              href="/login"
            >
              di sini
            </Link>
          </div>
          <div className="pt-2 pb-1 mb-3 bg-[#ced4da] text-center text-[#212529]  h-11">
            Data Diri
          </div>
          <FormTextInput
            containerClass={containerClass}
            labelClass={labelClass}
            inputClass={textInputClass}
            label="No. KTP"
            placeholder="No. KTP"
            name="id_number"
            icon={<CreditCardIcon />}
            type="number"
            registerOption={{
              pattern: {
                value:
                  /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/,
              },
            }}
          />
          <FormTextInput
            containerClass={containerClass}
            labelClass={labelClass}
            inputClass={textInputClass}
            label="Nama (Sesuai KTP)"
            placeholder="Nama"
            name="name"
            icon={<UserCircleIcon />}
            isRequired
          />
          <FormTextInput
            containerClass={containerClass}
            labelClass={labelClass}
            inputClass={textInputClass}
            label="Email"
            placeholder="Email"
            name="email"
            icon={<EnvelopeIcon />}
          />
          <FormSelectInput
            containerClass={containerClass}
            labelClass={labelClass}
            inputClass={selectInputClass}
            name="province_id"
            label="Provinsi"
            isRequired
            data={provinces.data || []}
            disabled={
              provinces.isPending || provinces.isLoading || provinces.isError
            }
          />
          <FormSelectInput
            containerClass={containerClass}
            labelClass={labelClass}
            inputClass={selectInputClass}
            name="city_id"
            label="Kota"
            isRequired
            data={citiesById.data?.cities || []}
            disabled={
              citiesById.isPending || citiesById.isLoading || citiesById.isError
            }
          />
          <FormSelectInput
            containerClass={containerClass}
            labelClass={labelClass}
            inputClass={selectInputClass}
            label="Profesi"
            name="profession"
            data={PROFESSIONS}
          />
          {watch("profession") === "7" && (
            <div className="mb-6">
              <FormTextInput
                inputClass="px-2.5 py-3 text-[#8898aa] border border-gray mb-1"
                label=""
                name="professionManualInput"
              />
              <div className="text-[#8898aa] text-xs">
                Mohon masukkan nama pekerjaan.
              </div>
            </div>
          )}
          <FormSelectInput
            containerClass={containerClass}
            labelClass={labelClass}
            inputClass={selectInputClass}
            name="sales_id"
            label="Nama Marketing"
            isRequired
            data={marketings.data || []}
            disabled={
              marketings.isPending || marketings.isLoading || marketings.isError
            }
          />
          <FormSelectInput
            containerClass={containerClass}
            labelClass={labelClass}
            inputClass={selectInputClass}
            name="project_id"
            label="Nama Project"
            isRequired
            data={projects.data || []}
            disabled={
              projects.isPending || projects.isLoading || projects.isError
            }
          />
          <FormSelectInput
            containerClass={containerClass}
            labelClass={labelClass}
            inputClass={selectInputClass}
            name="unit_type_id"
            label="Tipe Unit"
            isRequired
            data={unitTypes.data?.unit_types || []}
            disabled={
              unitTypes.isPending || unitTypes.isLoading || unitTypes.isError
            }
          />
          <div className="pt-2 pb-1 mb-3 bg-[#ced4da] text-center text-[#212529] h-11">
            Data Login
          </div>
          <FormTextInput
            containerClass={containerClass}
            labelClass={labelClass}
            inputClass={`${textInputClass} appearance-none`}
            label="No. WA"
            placeholder="0812xxxxx"
            name="whatsapp"
            isRequired
            type="number"
            icon={<DeviceTabletIcon />}
            registerOption={{
              pattern: {
                value:
                  /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/,
              },
            }}
          />
          <FormTextInput
            containerClass="mb-2"
            labelClass={labelClass}
            inputClass={textInputClass}
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            icon={<LockOpenIcon />}
            isRequired
          />
          <div className="text-[#8898aa] text-xs mb-6">
            Password minimal 8 karakter.
          </div>
          <FormTextInput
            containerClass={containerClass}
            labelClass={labelClass}
            inputClass={textInputClass}
            label="Konfirmasi Password"
            placeholder="Konfirmasi Password"
            name="password_confirmation"
            type="password"
            icon={<LockOpenIcon />}
            isRequired
          />
          {axios.isAxiosError(registerAndBuyNub.error) && (
            <span className="block text-red-500 mt-2 mb-6">
              {registerAndBuyNub.error?.response?.data?.message}
            </span>
          )}
          {registerAndBuyNub.isPending ? (
            <Image
              className="block mx-auto"
              src={"./spinner.svg"}
              width={50}
              height={50}
              alt="loading..."
            />
          ) : (
            <button
              type="submit"
              value="Submit"
              className="bg-[#287d3e] block px-5 py-[10px] text-white font-semibold text-sm mx-auto rounded-[4px] shadow-md"
            >
              Buat Akun
            </button>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Container>{page}</Container>
    </MainLayout>
  );
};

export default RegisterPage;
