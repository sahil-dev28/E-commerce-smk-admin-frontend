import { useAuthStore } from "../../store/authStore";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface RedirectIfLoggedInProps {
  children: ReactNode;
  isAuth?: boolean;
}

export default function RedirectIfLoggedIn({
  children,
  isAuth = true,
}: RedirectIfLoggedInProps) {
  const isAuthorized = useAuthStore((state) => state.isAuthorized);

  if (isAuthorized && isAuth) return <Navigate to="/" replace />;

  if (!isAuthorized && !isAuth)
    return <Navigate to="/auth/admin/login" replace />;

  return children;
}
