import api from "@/api/axios-instance";
import type { CreateNewCoupon } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { queryClient } from "@/main";

export const createCouponApi = async (createCoupon: CreateNewCoupon) => {
  const response = await api.post("/coupon", createCoupon);
  return response;
};

export const useCreateNewCoupon = () => {
  return useMutation({
    mutationFn: createCouponApi,
    mutationKey: ["create-coupon"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["showMe-coupon"] });
      toast.success("Coupon created successfully");
    },
    onError: (
      error: AxiosError<{
        msg: string;
      }>
    ) => {
      toast.error(error.response?.status || "Failed to create coupon");
    },
  });
};
