import api from "@/api/axios-instance";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const logoutAccount = async () => {
  const response = await api.delete("/auth/logout");
  return response.data;
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  return useMutation({
    mutationFn: logoutAccount,
    mutationKey: ["logout"],

    onSuccess: (data) => {
      toast.success(data.message || "Logged out successfully");
      logout();
    },
    onError: (
      error: AxiosError<{
        msg: string;
      }>
    ) => {
      toast.error(
        error.response?.data.msg || "Failed to logout. Please try again."
      );
    },
  });
};
