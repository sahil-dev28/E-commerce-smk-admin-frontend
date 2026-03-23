import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import type { CreateCategory } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const updateCategory = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<CreateCategory>;
}) => {
  const response = await api.patch(`/category/${id}`, payload);
  return response.data;
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: updateCategory,
    mutationKey: ["update-category"],

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["showMe-category"] });
      toast.success(data.message || "Category updated successfully");
    },
    onError: (
      error: AxiosError<{
        msg: string;
      }>,
    ) => {
      toast.error(
        error.response?.data.msg ||
          "Failed to update the category. Please try again.",
      );
    },
  });
};
