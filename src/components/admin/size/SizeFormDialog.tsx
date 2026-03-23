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
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateSize } from "@/hooks/size/useCreateSize";
import { useUpdateSize } from "@/hooks/size/useUpdateSize";
import { createSizeSchema } from "@/schemas ";
import type { CreateSize } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus } from "lucide-react";
import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";

interface SizeDialogProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  mode: "create" | "edit";
  value: number;
  id: string;
}

export function SizeFormDialog({
  modalOpen,
  setModalOpen,
  mode,
  value,
  id,
}: SizeDialogProps) {
  const { mutateAsync: createSize } = useCreateSize();
  const { mutateAsync: updateSize } = useUpdateSize();

  const form = useForm<CreateSize>({
    resolver: zodResolver(createSizeSchema) as Resolver<CreateSize>,
    defaultValues: { value: undefined },
  });

  useEffect(() => {
    if (mode === "edit" && modalOpen) {
      form.reset({
        value: value,
      });
    }
  }, [mode, form, modalOpen, value]);

  const onSubmit = async (values: CreateSize) => {
    if (mode === "create") {
      await createSize(values);
      setModalOpen(false);
      console.log(values);
      form.reset();
    }
    if (mode === "edit" && modalOpen) {
      await updateSize({
        id: id,
        payload: {
          value: values.value,
        },
      });
      setModalOpen(false);
    }
  };
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        {mode === "edit" ? (
          <Button variant="ghost">
            <Edit size={"18"} />
          </Button>
        ) : (
          <Button className="cursor-pointer">
            <Plus />
            Add Sizes
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Size Details</DialogTitle>
            <DialogDescription>
              {mode === "edit"
                ? "Edit your size details here. Click save when you're done."
                : " Make new size for your products here. Click create when you're done."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 my-5 gap-2">
              <Label htmlFor="link">Size</Label>
              <Input
                placeholder="e.g. 9"
                {...(form.register("value") || "")}
                type="number"
                className="text-transform: capitalize"
                aria-invalid={form.formState.errors.value ? "true" : "false"}
              />
              <FieldError>{form.formState.errors.value?.message}</FieldError>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="cursor-pointer hover:bg-primary/10"
              >
                Close
              </Button>
            </DialogClose>
            <Button type="submit" className="px-5 cursor-pointer">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
