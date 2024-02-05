import { API_URL } from "@/constants";
import axios from "axios";

export interface Province {
  id: number;
  name: string;
  slug: string;
}

export interface City extends Province {
  province: number;
}

export interface Marketing {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
  role_id: number;
}

export interface Project {
  id: number;
  name: string;
  type: string;
  number_of_blocks: number;
}

export interface UnitType {
  id: number;
  name: string;
}

export interface GetAllProvinceResponse {
  status: string;
  message: string;
  data: Province[];
}

export interface GetCitiesByProvinceIdPayload {
  id: string;
}

export interface GetCitiesByProvinceIdResponse {
  status: string;
  message: string;
  data: {
    id: number;
    name: string;
    slug: string;
    cities: Array<City & { province_id: number }>;
  };
}

export interface GetMarketingsResponse {
  status: string;
  message: string;
  data: Marketing[];
}

export interface GetProjectsResponse {
  status: string;
  message: string;
  data: Project[];
}

export interface GetUnitTypesByProjectIdPayload {
  id: string;
}

export interface GetUnitTypesByProjectIdResponse {
  status: string;
  message: string;
  data: {
    id: number;
    name: string;
    unit_types: UnitType[];
  };
}

export const getAllProvince: () => Promise<GetAllProvinceResponse> =
  async () => {
    const result = await axios.get(`${API_URL}/api/get-province`);
    return result.data;
  };

export const getCitiesByProvinceId: (
  payload: GetCitiesByProvinceIdPayload
) => Promise<GetCitiesByProvinceIdResponse> = async (payload) => {
  const result = await axios.get(`${API_URL}/api/get-province/${payload.id}`);

  return result.data;
};

export const getMarketings: () => Promise<GetMarketingsResponse> = async () => {
  const result = await axios.get(`${API_URL}/api/get-marketings`);

  return result.data;
};

export const getProjects: () => Promise<GetProjectsResponse> = async () => {
  const result = await axios.get(`${API_URL}/api/get-project`);

  return result.data;
};

export const getUnitTypesByProjectId: (
  payload: GetUnitTypesByProjectIdPayload
) => Promise<GetUnitTypesByProjectIdResponse> = async (payload) => {
  const result = await axios.get(`${API_URL}/api/get-project/${payload.id}`);

  return result.data;
};
