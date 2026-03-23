import api from "@/api/axios-instance";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface CategoryResponse {
  categories: [];
}

const getCategories = async () => {
  const { data } = await api.get<CategoryResponse>("/category");
  return data;
};

export const useShowMeCategory = () => {
  return useQuery({
    queryKey: ["showMe-category"],
    queryFn: getCategories,
    placeholderData: keepPreviousData,
  });
};
