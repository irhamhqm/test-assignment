import {
  getAllProvince,
  GetCitiesByProvinceIdPayload,
  getCitiesByProvinceId,
  getMarketings,
  getProjects,
  GetUnitTypesByProjectIdPayload,
  getUnitTypesByProjectId,
} from "@/api/master-data";
import { useQuery } from "@tanstack/react-query";

export const useGetProvinces = () => {
  return useQuery({
    queryKey: ["all-province"],
    queryFn: () => getAllProvince(),
    select: ({ data }) => data,
  });
};

export const useGetCitiesByProvinceId = (
  payload: GetCitiesByProvinceIdPayload
) => {
  return useQuery({
    queryKey: ["cities-by-province-id", payload.id],
    queryFn: () => getCitiesByProvinceId(payload),
    enabled: !!payload.id,
    select: ({ data }) => data,
  });
};

export const useGetMarketings = () => {
  return useQuery({
    queryKey: ["marketings"],
    queryFn: () => getMarketings(),
    select: ({ data }) => data,
  });
};

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
    select: ({ data }) => data,
  });
};

export const useGetUnitTypesByProjectId = (
  payload: GetUnitTypesByProjectIdPayload
) => {
  return useQuery({
    queryKey: ["unit-types-by-project-id", payload.id],
    queryFn: () => getUnitTypesByProjectId(payload),
    enabled: !!payload.id,
    select: ({ data }) => data,
  });
};
