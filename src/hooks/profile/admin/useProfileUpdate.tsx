import { useMutation } from "@tanstack/react-query";
import api from "../../../api/axios-instance";
import { toast } from "sonner";

import type { AxiosError } from "axios";
import type { UpdateProfileData } from "@/types/auth.types";
import { queryClient } from "../../../main";

export const useProfileUpdate = () => {
  return useMutation({
    mutationFn: async (updatedData: UpdateProfileData) => {
      const res = await api.patch("/users", updatedData);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.msg);
      queryClient.invalidateQueries({ queryKey: ["show-me"] });
    },
    onError: (
      error: AxiosError<{
        msg: string;
      }>
    ) => {
      toast.error(error.response?.data.msg || "Failed to update profile");
    },
  });
};
