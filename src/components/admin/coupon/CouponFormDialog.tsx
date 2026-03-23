import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { useCreateNewCoupon } from "@/hooks/coupon/useCreateCoupon";
import type { Coupon, CreateNewCoupon } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCouponSchema } from "@/schemas ";
import { FieldError } from "@/components/ui/field";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { DateTimePicker } from "../calendar/Calendar";
import { useUpdateCoupon } from "@/hooks/coupon/useUpdateCoupon";
import { Plus } from "lucide-react";

interface DialogDemoProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  mode: "create" | "edit";
  coupon?: Coupon;
}

export function CouponFormDialog({
  modalOpen,
  setModalOpen,
  mode,
  coupon,
}: DialogDemoProps) {
  const { mutateAsync: createCouponApi, isPending: createCouponPending } =
    useCreateNewCoupon();
  const { mutateAsync: updateCoupon, isPending: updateCouponPending } =
    useUpdateCoupon();

  const form = useForm<CreateNewCoupon>({
    resolver: zodResolver(createCouponSchema) as Resolver<CreateNewCoupon>,
    defaultValues: {
      type: undefined,
      amount: undefined,
      code: undefined,
      startTime: new Date(),
      expiryTime: new Date(),
      maxRedemptions: undefined,
      valid: undefined,
    },
  });

  useEffect(() => {
    if (mode === "edit" && coupon) {
      form.reset({
        type: coupon.type,
        amount: coupon.amount,
        code: coupon.code,
        startTime: coupon.startTime ? new Date(coupon.startTime) : undefined,
        expiryTime: new Date(coupon.expiryTime),
        maxRedemptions: coupon.maxRedemptions,
        valid: coupon.valid,
      });
    }
  }, [mode, coupon, form]);

  const onSubmit = async (values: CreateNewCoupon) => {
    if (mode === "create") {
      await createCouponApi(values);
      form.reset();
      setModalOpen(false);
    }
    if (mode === "edit" && coupon) {
      await updateCoupon({
        id: coupon.id,
        payload: {
          expiryTime: values.expiryTime,
          valid: values.valid,
          maxRedemptions: values.maxRedemptions,
        },
      });
      setModalOpen(false);
    }
  };

  const onCancel = () => {
    form.reset();
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        {mode === "edit" ? (
          <button className="flex items-center text-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded-sm w-full">
            Edit
          </button>
        ) : (
          <Button className="cursor-pointer">
            <Plus />
            Add Coupon
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader className="mb-10 flex justify-center items-center">
            <DialogTitle className="text-muted-foreground">
              Coupon Details
            </DialogTitle>
            <DialogDescription>
              Make new coupon for your products here. Click create when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coupon Type */}
            <div>
              {mode === "create" ? (
                <Controller
                  name="type"
                  control={form.control}
                  render={({ field }) => (
                    <div>
                      <Label className="mb-3">Coupon Type</Label>
                      <Select
                        value={field.value ?? undefined}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        {...form.register("type")}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select coupon type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PERCENTAGE">
                            Percentage Discount
                          </SelectItem>
                          <SelectItem value="FIXED">
                            Fixed Amount Discount
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldError>
                        {form.formState.errors.type?.message}
                      </FieldError>
                    </div>
                  )}
                />
              ) : (
                <div>
                  <Controller
                    name="valid"
                    control={form.control}
                    render={({ field }) => (
                      <div>
                        <Label className="mb-3">Validity</Label>
                        <Select
                          value={field.value?.toString()}
                          onValueChange={(value) => {
                            field.onChange(value === "true" ? true : false);
                          }}
                          {...form.register("valid")}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select coupon validity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">True</SelectItem>
                            <SelectItem value="false">False</SelectItem>
                          </SelectContent>
                        </Select>
                        <FieldError>
                          {form.formState.errors.type?.message}
                        </FieldError>
                      </div>
                    )}
                  />
                </div>
              )}
            </div>

            {/* Amount */}
            <div className="grid-3">
              <Label htmlFor="username-1" className="mb-3">
                Discount Amount (₹)
              </Label>
              <Input
                placeholder="e.g. 200"
                id="amount"
                type="number"
                min={0}
                {...form.register("amount", { valueAsNumber: true })}
                disabled={mode === "edit"}
                aria-invalid={form.formState.errors.amount ? "true" : "false"}
              />
              <FieldError>{form.formState.errors.amount?.message}</FieldError>
            </div>

            {/* Coupon Code */}
            <div>
              <Label className="mb-3">Coupon Code</Label>
              <Input
                placeholder="e.g. SAVE200"
                className="uppercase tracking-wider"
                {...form.register("code")}
                disabled={mode === "edit"}
                aria-invalid={form.formState.errors.code ? "true" : "false"}
              />
              <p className="text-xs text-muted-foreground mt-3">
                Users will apply this code at checkout
              </p>
              <FieldError>{form.formState.errors.code?.message}</FieldError>
            </div>

            {/* Max Redemption */}
            <div>
              <Label className="mb-3">Maximum Redemptions</Label>
              <Input
                placeholder="e.g. 500"
                type={"number"}
                min={0}
                {...form.register("maxRedemptions", { valueAsNumber: true })}
                aria-invalid={
                  form.formState.errors.maxRedemptions ? "true" : "false"
                }
              />
              <FieldError>
                {form.formState.errors.maxRedemptions?.message}
              </FieldError>
            </div>
          </div>

          {/* Validity Period */}
          <div className="mt-7 mb-7">
            <h3 className="text-sm font-medium mb-4 text-muted-foreground">
              Validity Period
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <Controller
                  name="startTime"
                  control={form.control}
                  render={({ field }) => (
                    <div>
                      <Label className="mb-3">Start Date</Label>
                      <DateTimePicker
                        value={field.value ?? undefined}
                        {...form.register("startTime")}
                        onChange={field.onChange}
                        aria-invalid={
                          form.formState.errors.startTime ? "true" : "false"
                        }
                      />
                    </div>
                  )}
                />
                <FieldError>
                  {form.formState.errors.startTime?.message}
                </FieldError>
              </div>
              <div>
                <Controller
                  name="expiryTime"
                  control={form.control}
                  render={({ field }) => (
                    <div>
                      <Label className="mb-3">Expiration</Label>
                      <DateTimePicker
                        value={field.value ?? undefined}
                        {...form.register("expiryTime")}
                        onChange={field.onChange}
                      />
                    </div>
                  )}
                />
                <FieldError>
                  {form.formState.errors.expiryTime?.message}
                </FieldError>
              </div>
            </div>
          </div>
          <DialogFooter className="">
            <DialogClose asChild>
              <Button
                size="lg"
                variant="secondary"
                onClick={onCancel}
                className="cursor-pointer hover:bg-primary/10"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={createCouponPending || updateCouponPending}
              type="submit"
              size="lg"
              className="px-10 cursor-pointer"
            >
              {mode === "create" ? "Create Coupon" : "Edit Coupon"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
