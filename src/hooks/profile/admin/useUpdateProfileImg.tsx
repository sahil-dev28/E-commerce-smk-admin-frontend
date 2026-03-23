import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const updateProfileImg = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await api.post("/users/profile-image", formData);
  return res.data;
};

export const useUploadProfileImg = () => {
  return useMutation({
    mutationFn: updateProfileImg,
    mutationKey: ["upload-img"],
    onSuccess: (data) => {
      toast.success(data.msg);
      queryClient.invalidateQueries({ queryKey: ["show-me"] });
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      toast.error(error.response?.data.msg || "Failed to upload profile image");
    },
  });
};
