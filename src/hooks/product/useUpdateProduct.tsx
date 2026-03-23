import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import type { UpdateProduct } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const updateProduct = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<UpdateProduct>;
}) => {
  const response = await api.patch(`/product/${id}`, payload);
  return response;
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: updateProduct,
    mutationKey: ["update-product"],

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["showMe-product"] });
      toast.success("Product updated successfully.");
    },
    onError: (
      error: AxiosError<{
        msg: string;
      }>,
    ) => {
      console.log(error.response?.statusText);
      toast.error(error.response?.status || "Failed to update the product");
    },
  });
};
