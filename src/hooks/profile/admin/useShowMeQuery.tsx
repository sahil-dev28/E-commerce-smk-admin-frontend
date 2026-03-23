import api from "@/api/axios-instance";
import { useAuthStore } from "@/store/authStore";
import type { ShowMeResponse } from "@/types/auth.types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const fetchUserData = async () => {
  const { data } = await api.get<ShowMeResponse>("/users/show-me");
  return data;
};

export const useShowMeQuery = () => {
  const { login, isAuthorized } = useAuthStore();

  const query = useQuery({
    queryKey: ["show-me"],
    queryFn: fetchUserData,
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (query.data?.user) {
      login(query.data.user.email, query.data.user.id);
    }
  }, [query.data, login]);

  return query;
};
