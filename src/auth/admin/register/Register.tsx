"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAdminRegister } from "@/hooks/auth/admin/useAdminRegister";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { signUpSchema } from "@/schemas ";
import type { AdminRegisterData } from "@/types/auth.types";

export default function AdminRegistration() {
  const { isPending, mutateAsync: registerAdmin } = useAdminRegister();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminRegisterData>({
    resolver: zodResolver(signUpSchema),
    shouldUseNativeValidation: true,
    defaultValues: {
      firstName: "",
      lastName: "",
      contactNo: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AdminRegisterData) => {
    console.log("SUBMIT DATA:", data);

    await registerAdmin(data);
    reset();
    navigate({
      pathname: "/auth/admin/sign-up-success",
      search: `?email=${data.email}`,
    });
  };
  console.log({
    state: errors,
  });

  return (
    <Card className="w-100 max-w-lg justify-center mx-auto mt-7">
      <CardHeader className="text-left">
        <CardTitle className="text-xl">Register a new account</CardTitle>
        <CardDescription>
          Fill in the details below to create a new admin account
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <FieldSet>
              <FieldGroup>
                <div className="grid grid-cols-2 gap-3">
                  <Field className="grid gap-2 relative">
                    <FieldLabel htmlFor="firstName" className="font-semibold">
                      First Name
                    </FieldLabel>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="e.g. Howard"
                      {...register("firstName")}
                      aria-invalid={errors.firstName ? "true" : "false"}
                    />
                    {<FieldError>{errors.firstName?.message}</FieldError>}
                  </Field>
                  <Field className="grid gap-2">
                    <FieldLabel htmlFor="lastName" className="font-semibold">
                      Last Name
                    </FieldLabel>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="e.g. Thurman"
                      {...register("lastName")}
                      aria-invalid={errors.lastName ? "true" : "false"}
                    />
                    <FieldError>{errors.lastName?.message}</FieldError>
                  </Field>
                </div>

                <Field className="grid gap-2">
                  <FieldLabel htmlFor="contactNo" className="font-semibold">
                    Contact Number
                  </FieldLabel>

                  <Controller
                    control={control}
                    name="contactNo"
                    render={({ field }) => {
                      return (
                        <PhoneInput
                          placeholder="Enter your contact number"
                          country="in"
                          value={field.value}
                          onChange={(value: string) => {
                            field.onChange(value);
                          }}
                          enableSearch
                        />
                      );
                    }}
                  />
                  <FieldError>{errors.contactNo?.message}</FieldError>
                </Field>

                <Field className="grid gap-2">
                  <FieldLabel htmlFor="email" className="font-semibold">
                    Email
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. howard.thurman@gmail.com"
                    {...register("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  <FieldError>{errors.email?.message}</FieldError>
                </Field>
                <Field className="grid gap-2">
                  <FieldLabel htmlFor="password" className="font-semibold">
                    Password
                  </FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  <FieldError>{errors.password?.message}</FieldError>
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>
        </CardContent>
        <CardFooter>
          <CardAction className="flex flex-col w-full">
            <Button
              className="w-full py-2 px-4 mt-5 mb-5 h-10 rounded-md hover:scale-105 cursor-pointer"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Registering..." : "Register"}
            </Button>
            <FieldSeparator>Or continue with</FieldSeparator>
            <div className="mt-5 text-center text-sm">
              <Link to="/auth/admin/login" className="hover:underline">
                <span className="font-extralight text-foreground">
                  Already have an account?
                </span>
                <span className="font-black"> Log in</span>
              </Link>
            </div>
          </CardAction>
        </CardFooter>
      </form>
    </Card>
  );
}
