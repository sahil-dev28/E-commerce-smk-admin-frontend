import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const deleteSize = async (id: string) => {
  const response = await api.delete(`/size/${id}`);
  return response.data;
};

export const useDeleteSize = () => {
  return useMutation({
    mutationFn: deleteSize,
    mutationKey: ["delete-size"],

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["showMe-size"] });
      toast.success(data.message || "Size deleted successfully");
    },
    onError: (
      error: AxiosError<{
        msg: string;
      }>,
    ) => {
      toast.error(
        error.response?.data.msg ||
          "Failed to delete the size. Please try again.",
      );
    },
  });
};
