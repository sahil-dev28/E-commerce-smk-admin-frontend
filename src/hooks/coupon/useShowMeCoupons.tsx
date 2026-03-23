import api from "@/api/axios-instance";
import type { Coupon } from "@/types/auth.types";
import { useQuery } from "@tanstack/react-query";
export interface CouponResponse {
  coupons: Coupon[];
  totalCoupons: number;
  numOfPages: number;
}

export interface CouponParams {
  page?: number;
  search?: string;
}

const getData = async (params: CouponParams = {}): Promise<CouponResponse> => {
  const { data } = await api.get<CouponResponse>(`/coupon`, {
    params: {
      search: params.search,
      page: params.page,
    },
  });
  console.log(data);
  return data;
};

export const useShowMeCouponQuery = (params: CouponParams = {}) => {
  return useQuery<CouponResponse>({
    queryKey: ["showMe-coupon", JSON.stringify(params)],
    queryFn: () => getData(params),
  });
};
