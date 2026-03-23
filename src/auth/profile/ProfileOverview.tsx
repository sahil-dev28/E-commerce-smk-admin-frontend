import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { FiUsers } from "react-icons/fi";

import { useShowMeQuery } from "@/hooks/profile/admin/useShowMeQuery";
import { useProfileUpdate } from "@/hooks/profile/admin/useProfileUpdate";

import type { UpdateProfileData } from "@/types/auth.types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { updateProfileSchema } from "@/schemas ";
import ProfileImage from "@/components/user/ProfileImage";

export default function Profile() {
  const navigate = useNavigate();
  const { data: showMeData, isLoading, isError } = useShowMeQuery();
  const { mutateAsync: updatedData } = useProfileUpdate();

  console.log(showMeData?.user.contactNo);

  const form = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema) as Resolver<UpdateProfileData>,
    defaultValues: {
      firstName: "",
      lastName: "",
      contactNo: "",
      gender: null,
      dob: null,
    },
  });

  useEffect(() => {
    if (showMeData?.user) {
      form.reset({
        firstName: showMeData.user.firstName,
        lastName: showMeData.user.lastName,
        contactNo: showMeData.user.contactNo,
        gender: showMeData.user.gender ?? null,
        dob: showMeData.user.dob ? new Date(showMeData.user.dob) : null,
      });
    }
  }, [showMeData, form]);

  const onSubmit = async (values: UpdateProfileData) => {
    await updatedData(values);
    navigate("/");
  };
  console.log({
    state: form.formState.errors,
    value: form.getValues(),
  });

  if (isLoading) return <div className="p-10">Loading...</div>;
  if (isError) return <div className="p-10">Failed to load profile</div>;

  return (
    <div className="min-h-screen flex bg-background overflow-x-hidden">
      <div className="px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 max-w-full">
          <Card className="flex-col items-center p-0">
            <ProfileImage
              profileImage={showMeData?.user.profileImage}
              profileImageId={showMeData?.user.profileImageId}
            />

            <h1 className="text-lg font-semibold mt-15">
              {showMeData?.user.firstName} {showMeData?.user.lastName}
            </h1>
            <div className="flex items-center gap-2 mt-6 text-muted-foreground">
              <FiUsers />
              Profile Overview
            </div>
          </Card>

          <div className="w-200 flex justify-center">
            <Card className="max-w-4xl w-full">
              <CardHeader>
                <CardTitle className="text-lg tracking-wide">
                  Basic Details
                </CardTitle>
              </CardHeader>

              <form onSubmit={form.handleSubmit(onSubmit)} id="profile">
                <CardContent className="space-y-6">
                  <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Field data-invalid={!!form.formState.errors.firstName}>
                      <FieldLabel>First Name</FieldLabel>
                      <Input {...form.register("firstName")} />
                      <FieldError>
                        {form.formState.errors.firstName?.message}
                      </FieldError>
                    </Field>

                    <Field data-invalid={!!form.formState.errors.lastName}>
                      <FieldLabel>Last Name</FieldLabel>
                      <Input {...form.register("lastName")} />
                      <FieldError>
                        {form.formState.errors.lastName?.message}
                      </FieldError>
                    </Field>

                    <Field data-invalid={!!form.formState.errors.contactNo}>
                      <FieldLabel>Contact Number</FieldLabel>
                      <Input {...form.register("contactNo")} />
                      <FieldError>
                        {form.formState.errors.contactNo?.message}
                      </FieldError>
                    </Field>
                  </FieldGroup>

                  <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Controller
                      name="gender"
                      control={form.control}
                      render={({ field, fieldState }) => {
                        return (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Gender</FieldLabel>
                            <Select
                              name={field.name}
                              value={field.value ?? undefined}
                              onValueChange={(value) => {
                                if (value) {
                                  field.onChange(value);
                                }
                              }}
                            >
                              <SelectTrigger id="form-rhf-complex-gender">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="MALE">Male</SelectItem>
                                <SelectItem value="FEMALE">Female</SelectItem>
                              </SelectContent>
                            </Select>
                            <FieldError>{fieldState.error?.message}</FieldError>
                          </Field>
                        );
                      }}
                    />

                    <Controller
                      name="dob"
                      control={form.control}
                      render={({ field }) => (
                        <Field className="mt-1">
                          <Label>Date of birth</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="date"
                                className="justify-between font-normal"
                              >
                                {field.value
                                  ? new Date(field.value).toLocaleDateString()
                                  : undefined}
                                <ChevronDownIcon />
                              </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-auto overflow-hidden">
                              <Calendar
                                mode="single"
                                captionLayout="dropdown"
                                selected={
                                  field.value
                                    ? new Date(field.value as Date)
                                    : undefined
                                }
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                onSelect={(date) => field.onChange(date)}
                              />
                            </PopoverContent>
                          </Popover>
                        </Field>
                      )}
                    />

                    <Field>
                      <FieldLabel>Email</FieldLabel>
                      <Input
                        value={showMeData?.user.email}
                        disabled
                        className="bg-muted/50 cursor-not-allowed"
                      />
                    </Field>
                  </FieldGroup>
                </CardContent>

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="cursor-pointer mt-10 mx-164 w-fit"
                >
                  {form.formState.isSubmitting
                    ? "Updating..."
                    : "Update Profile"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
