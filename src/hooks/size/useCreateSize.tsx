import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import type { CreateSize } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const createSize = async (createSize: CreateSize) => {
  const response = await api.post("/size", createSize);
  return response.data;
};

export const useCreateSize = () => {
  return useMutation({
    mutationFn: createSize,
    mutationKey: ["create-size"],

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["showMe-size"] });
      toast.success(data.msg || "Size created successfully");
    },

    onError: (
      error: AxiosError<{
        msg: string;
      }>,
    ) => {
      toast.error(error.response?.data.msg || "Failed to create size");
    },
  });
};
