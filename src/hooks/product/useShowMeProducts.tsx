import api from "@/api/axios-instance";
import type { Product } from "@/types/auth.types";
import { useQuery } from "@tanstack/react-query";

export interface ProductParams {
  page?: number;
  search?: string;
  sort?: string;
  featured?: string;
  categoryId?: string;
  sizeId?: string;
  priceSort?: string;
}
export interface ProductResponse {
  products: Product[];
  totalProducts: number;
  numOfPages: number;
}

const getData = async (
  params: ProductParams = {},
): Promise<ProductResponse> => {
  const { data } = await api.get<ProductResponse>(`/product`, {
    params: {
      page: params.page,
      search: params.search,
      sort: params.sort,
      featured: params.featured,
      categoryId: params.categoryId,
      sizeId: params.sizeId,
      priceSort: params.priceSort,
    },
  });
  console.log(data.products);
  return data;
};

export const useShowMeProductQuery = (params: ProductParams = {}) => {
  return useQuery<ProductResponse>({
    queryKey: ["showMe-product", JSON.stringify(params)],
    queryFn: () => getData(params),
  });
};
