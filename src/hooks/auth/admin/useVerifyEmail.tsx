import api from "@/api/axios-instance";
import type { VerifyEmailData } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { toast } from "sonner";

export const verifyEmail = async (data: VerifyEmailData) => {
  const response = await api.post("/auth/verify", data);
  console.log(response.data);
  return response.data;
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
    mutationKey: ["verify-email"],
    onSuccess: (data) => {
      toast.success(data.message || "Email verified successfully");
    },
    onError: (
      error: AxiosError<{
        msg: string;
      }>
    ) => {
      toast.error(error.response?.data.msg || "Verification failed");
    },
  });
};
