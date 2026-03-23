import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const deleteProduct = async (id: string) => {
  const response = await api.delete(`/product/${id}`);
  return response.data;
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: deleteProduct,
    mutationKey: ["delete-product"],

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["showMe-product"] });
      toast.success(data.message || "Product deleted successfully");
    },

    onError: (
      error: AxiosError<{
        msg: string;
      }>,
    ) => {
      toast.error(
        error.response?.data.msg ||
          "Failed to delete the product. Please try again.",
      );
    },
  });
};
