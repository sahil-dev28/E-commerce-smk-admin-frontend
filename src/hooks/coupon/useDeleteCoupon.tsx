import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const deleteCoupon = async (id: string) => {
  const response = await api.delete(`/coupon/${id}`);
  return response.data;
};

export const useDeleteCoupon = () => {
  return useMutation({
    mutationFn: deleteCoupon,
    mutationKey: ["delete-coupon"],

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["showMe-coupon"] });
      toast.success(data.message || "Coupon deleted successfully");
    },
    onError: (
      error: AxiosError<{
        msg: string;
      }>,
    ) => {
      toast.error(
        error.response?.data.msg ||
          "Failed to deleted the coupon. Please try again.",
      );
    },
  });
};
