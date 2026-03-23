import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import type { CreateProduct } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const createProduct = async (product: CreateProduct) => {
  const formData = new FormData();

  formData.append("name", product.name);
  formData.append("price", product.price.toString());
  formData.append("sizes", JSON.stringify([product.sizes]));
  formData.append("categoryId", product.categoryId);
  formData.append("color", product.color);
  formData.append("description", product.description);

  if (product.discount) {
    formData.append("discount", product.discount);
  }

  if (product.discountAmount) {
    formData.append("discountAmount", product.discountAmount.toString());
  }

  if (product.featured !== undefined) {
    formData.append("featured", String(product.featured));
  }

  if (product.inventory !== undefined) {
    formData.append("inventory", product.inventory.toString());
  }

  formData.append("image", product.image);

  const response = await api.post("/product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
    mutationKey: ["create-product"],

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["showMe-product"] });
      toast.success("Product created successfully");
    },

    onError: (
      error: AxiosError<{
        msg: string;
      }>,
    ) => {
      toast.error(error.response?.status || "Failed to create product");
    },
  });
};
