import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import type { CreateSize } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const updateSize = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<CreateSize>;
}) => {
  const response = await api.patch(`/size/${id}`, payload);
  return response.data;
};

export const useUpdateSize = () => {
  return useMutation({
    mutationFn: updateSize,
    mutationKey: ["update-size"],

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["showMe-size"] });
      toast.success(data.message || "Size updated successfully");
    },
    onError: (
      error: AxiosError<{
        msg: string;
      }>,
    ) => {
      toast.error(
        error.response?.data.msg ||
          "Failed to update the size. Please try again.",
      );
    },
  });
};
