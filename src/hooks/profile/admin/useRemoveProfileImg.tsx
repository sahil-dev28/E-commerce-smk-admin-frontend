import api from "@/api/axios-instance";
import { queryClient } from "@/main";

import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const removeProfileImg = async (profileImageId: string) => {
  const res = await api.delete("/users/profile-image", {
    params: {
      profileImageId,
    },
  });
  return res.data;
};

export const useRemoveProfileImg = () => {
  return useMutation({
    mutationFn: removeProfileImg,
    mutationKey: ["remove-img"],
    onSuccess: (data) => {
      toast.success(data.msg);
      queryClient.invalidateQueries({ queryKey: ["show-me"] });
    },

    onError: (
      error: AxiosError<{
        msg: string;
      }>
    ) => {
      toast.error(error.response?.data.msg || "Failed to remove profile image");
    },
  });
};
