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
import { useCreateCategory } from "@/hooks/category/useCreateCategory";
import { useUpdateCategory } from "@/hooks/category/useUpdateCategory";
import { createCategorySchema } from "@/schemas ";
import type { CreateCategory } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CategoryFormDialogProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  mode: "create" | "edit";
  name: string;
  id: string;
}

export function CategoryFormDialog({
  modalOpen,
  setModalOpen,
  mode,
  name,
  id,
}: CategoryFormDialogProps) {
  const { mutateAsync: createCategory } = useCreateCategory();
  const { mutateAsync: updateCategory } = useUpdateCategory();

  const form = useForm<CreateCategory>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: { name: undefined },
  });

  useEffect(() => {
    if (mode === "edit" && modalOpen) {
      form.reset({
        name: name,
      });
    }
  }, [mode, form, modalOpen, name]);

  const onSubmit = async (value: CreateCategory) => {
    if (mode === "create") {
      await createCategory(value);
      setModalOpen(false);
      form.reset();
    }
    if (mode === "edit" && modalOpen) {
      await updateCategory({
        id: id,
        payload: {
          name: value.name,
        },
      });
      setModalOpen(false);
    }
  };
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        {mode === "edit" ? (
          <Button variant="ghost" className="cursor-pointer">
            <Edit size={"18"} />
          </Button>
        ) : (
          <Button className="cursor-pointer">
            <Plus />
            Add Category
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Category Details</DialogTitle>
            <DialogDescription>
              {mode === "edit"
                ? "Edit your category details here. Click save when you're done."
                : " Make new category for your products here. Click create when you're done."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 my-5 gap-2">
              <Label htmlFor="link">Name</Label>
              <Input
                placeholder="e.g. Electronics"
                {...(form.register("name") || "")}
                type="text"
                {...form.register("name")}
                className="text-transform: capitalize"
                aria-invalid={form.formState.errors.name ? "true" : "false"}
              />
              <FieldError>{form.formState.errors.name?.message}</FieldError>
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
