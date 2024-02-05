import { API_URL, STG_API_URL } from "@/constants";
import axios from "axios";

export interface RegisterAndBuyNubPayload {
  id_number?: string;
  name: string;
  email?: string;
  province_id: string;
  city_id: string;
  profession?: string;
  sales_id: string;
  project_id: string;
  unit_type_id: string;
  whatsapp: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterAndBuyNubResponse {
  status: boolean;
  message: string;
  data: {
    name: string;
    transaction: {
      status: boolean;
      data: {
        order_id: string;
        customer_id: number;
        status: number;
        amount: number;
        payment_type: string | null;
        payment_url: string;
        token: string;
        expired_at: string;
        updated_at: string;
        created_at: string;
        id: number;
        status_text: string;
      };
      message: string;
    };
  };
}

export interface LoginPayload {
  whatsapp: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data: object;
}

export const registerAndBuyNub: (
  payload: RegisterAndBuyNubPayload
) => Promise<RegisterAndBuyNubResponse> = async (
  payload: RegisterAndBuyNubPayload
) => {
  let formattedPayload = {
    ...payload,
    province_id: Number(payload.province_id),
    city_id: Number(payload.city_id),
    sales_id: Number(payload.sales_id),
    project_id: Number(payload.project_id),
    unit_type_id: Number(payload.unit_type_id),
    whatsapp: `0${payload.whatsapp}`,
  };
  const response = await axios.post(
    `${STG_API_URL}/api/customer/register`,
    formattedPayload
  );

  return response.data;
};

export const login: (payload: LoginPayload) => Promise<LoginResponse> = async (
  payload
) => {
  const response = await axios.post(
    `${STG_API_URL}/api/customer/login`,
    payload
  );
  return response.data;
};

export const logout: () => Promise<unknown> = async () => {};
