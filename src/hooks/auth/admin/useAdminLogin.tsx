import api from "@/api/axios-instance";
import type { AdminLoginData } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const loginAdmin = async (data: AdminLoginData) => {
  const response = await api.post("/auth/admin/login", data);
  return response.data;
};

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: loginAdmin,
    mutationKey: ["admin-login"],

    onSuccess: (data) => {
      toast.success(data.message || "Admin logged in successfully");
    },
    onError: (
      error: AxiosError<{
        msg: string;
      }>,
    ) => {
      toast.error(
        error.response?.data.msg || "Failed to login. Please try again.",
      );
    },
  });
};
