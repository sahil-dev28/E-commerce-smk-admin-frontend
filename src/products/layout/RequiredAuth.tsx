import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthStore } from "../../store/authStore";

interface RequiredAuthProps {
  children: ReactNode;
}

export default function RequiredAuth({ children }: RequiredAuthProps) {
  const isAuthorized = useAuthStore((state) => state.isAuthorized);

  if (!isAuthorized) return <Navigate to="/auth/admin/login" replace />;

  return children;
}
