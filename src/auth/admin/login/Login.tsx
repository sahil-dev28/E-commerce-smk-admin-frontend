"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAdminLogin } from "@/hooks/auth/admin/useAdminLogin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas ";
import type { AdminLoginData } from "@/types/auth.types";
import { useAuthStore } from "@/store/authStore";

export default function Login() {
  const { isPending, mutateAsync: loginAdmin } = useAdminLogin();

  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "sahilkolge028@gmail.com",
      password: "Test@123",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: AdminLoginData) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await loginAdmin(loginData);

      login(response.email, response.userId);

      reset();
      navigate({
        pathname: "/",
      });
    } catch (error) {
      console.log("Login Failed", error);
    }
  };
  return (
    <Card className="w-full max-w-sm justify-center mx-auto mt-10">
      <CardHeader className="text-left">
        <CardTitle className="text-xl">Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link to="/auth/admin/register" className="hover:underline">
            Sign up
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="font-semibold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g. howard.thurman@gmail.com"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {<p className="text-red-700 text-sm">{errors.email?.message}</p>}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="font-semibold">
                  Password
                </Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="••••••••"
                aria-invalid={errors.password ? "true" : "false"}
              />
              {
                <p className="text-red-700 text-sm">
                  {errors.password?.message}
                </p>
              }
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full h-10 cursor-pointer"
          disabled={isPending}
          onClick={handleSubmit(onSubmit)}
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
}
