import api from "@/api/axios-instance";
import type { AdminRegisterData } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const registerAdmin = async (data: AdminRegisterData) => {
  const response = await api.post("/auth/admin/register", data);
  return response.data;
};

export const useAdminRegister = () => {
  return useMutation({
    mutationFn: registerAdmin,
    mutationKey: ["admin-register"],
    onSuccess: (data) => {
      toast.success(data.message || "Admin registered successfully");
    },
    onError: (
      error: AxiosError<{
        msg: string;
      }>,
    ) => {
      toast.error(
        error.response?.data.msg || "Failed to register. Please try again.",
      );
    },
  });
};
