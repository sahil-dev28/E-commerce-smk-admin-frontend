import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const deleteCategory = async (id: string) => {
  const response = await api.delete(`/category/${id}`);
  return response.data;
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: deleteCategory,
    mutationKey: ["delete-category"],

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["showMe-category"] });
      toast.success(data.message || "Category deleted successfully");
    },
    onError: (
      error: AxiosError<{
        msg: string;
      }>,
    ) => {
      toast.error(
        error.response?.data.msg ||
          "Failed to delete the category. Please try again.",
      );
    },
  });
};
