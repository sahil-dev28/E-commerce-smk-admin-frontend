import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import type { CreateNewCoupon } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const updateCoupon = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<CreateNewCoupon>;
}) => {
  const response = await api.patch(`/coupon/${id}`, payload);
  return response;
};

export const useUpdateCoupon = () => {
  return useMutation({
    mutationFn: updateCoupon,
    mutationKey: ["update-coupon"],

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["showMe-coupon"] });
      toast.success("Coupon updated successfully.");
    },
    onError: (
      error: AxiosError<{
        msg: string;
      }>,
    ) => {
      toast.error(error.response?.status || "Failed to update the coupon");
    },
  });
};
