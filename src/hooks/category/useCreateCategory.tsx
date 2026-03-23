import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import type { CreateCategory } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const createCategory = async (createCategory: CreateCategory) => {
  const response = await api.post("/category", createCategory);
  return response.data;
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategory,
    mutationKey: ["create-category"],

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["showMe-category"] });
      toast.success(data.msg || "Category created successfully");
    },
    onError: (
      error: AxiosError<{
        msg: string;
      }>,
    ) => {
      toast.error(error.response?.data?.msg || "Failed to create category");
    },
  });
};
