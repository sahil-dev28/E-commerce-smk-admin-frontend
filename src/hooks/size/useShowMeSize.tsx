import api from "@/api/axios-instance";

import { useQuery } from "@tanstack/react-query";

export interface SizeResponse {
  sizes: [];
}

const getSizes = async () => {
  const { data } = await api.get<SizeResponse>("/size");
  return data;
};

export const useShowMeSize = () => {
  return useQuery({
    queryKey: ["showMe-size"],
    queryFn: getSizes,
  });
};
