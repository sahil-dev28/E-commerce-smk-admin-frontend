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

import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "@/schemas ";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import type { CreateProduct, Product } from "@/types/auth.types";
import { useCreateProduct } from "@/hooks/product/useCreateProduct";
import { ProductImage } from "./ProductImage";
import { useShowMeCategory } from "@/hooks/category/useShowMeCategory";
import { useShowMeSize } from "@/hooks/size/useShowMeSize";
import { useUpdateProduct } from "@/hooks/product/useUpdateProduct";

interface Category {
  id: string;
  name: string;
}

interface Size {
  id: string;
  value: string;
}

interface ProductDialogProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  products?: Product;
  mode: "create" | "edit";
}

export function ProductFromDialog({
  openModal,
  setOpenModal,
  products,
  mode,
}: ProductDialogProps) {
  const { mutateAsync: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const showMeCategory = useShowMeCategory();
  const showMeSizes = useShowMeSize();

  const form = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: undefined,
      price: undefined,
      discount: undefined,
      discountAmount: undefined,
      sizes: undefined,
      categoryId: undefined,
      featured: undefined,
      color: undefined,
      description: undefined,
      inventory: undefined,
      image: undefined,
    },
  });

  useEffect(() => {
    if (mode === "edit" && products) {
      if (!products) {
        return;
      }

      form.reset({
        name: products.name,
        price: products.price,
        discount: products.discount,
        discountAmount: products.discountAmount,
        sizes: products.sizes[0].id,
        categoryId: products.categoryId,
        featured: products.featured,
        color: products.color,
        description: products.description,
        inventory: products.inventory,
        image: products.image,
      });
    }
  }, [form, mode, products]);

  const onSubmit = async (values: CreateProduct) => {
    if (mode === "create") {
      await createProduct(values);
      form.reset();
      setOpenModal(false);
    }
    if (mode === "edit" && products) {
      await updateProduct({
        id: products.id,
        payload: {
          name: values.name,
          price: values.price,
          color: values.color,
          categoryId: values.categoryId,
          sizes: values.sizes,
          description: values.description,
          image: values.image,
        },
      });
    }
  };

  console.log({
    state: form.formState.errors,
    value: form.getValues(),
  });

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        {mode === "edit" ? (
          <button className="flex items-center text-sm cursor-pointer px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded-sm w-full">
            Edit
          </button>
        ) : (
          <Button className="cursor-pointer">
            <Plus />
            Add Product
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl p-8">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader className="mb-10 flex justify-center items-center">
            <DialogTitle className="text-muted-foreground">
              Product Details
            </DialogTitle>
            <DialogDescription>
              Add a new product by filling in the details below.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:hidden -mx-4 px-4">
            <div className="mb-6">
              {/* Product Image Component */}
              <Label className="mb-3">Product Image</Label>
              <Controller
                name="image"
                control={form.control}
                render={({ field }) => (
                  <ProductImage
                    onChange={(file) => {
                      field.onChange(file);
                    }}
                    selectedFile={field.value}
                  />
                )}
              />
              <FieldError>{form.formState.errors.image?.message}</FieldError>
            </div>
            <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
              {/* Product Name*/}
              <div>
                <div className="grid-3">
                  <Label htmlFor="name" className="mb-3">
                    Product Name
                  </Label>
                  <Input
                    placeholder="e.g. Apple Watch 2"
                    id="name"
                    type="text"
                    {...form.register("name")}
                    aria-invalid={form.formState.errors.name ? "true" : "false"}
                  />
                  <FieldError>{form.formState.errors.name?.message}</FieldError>
                </div>
              </div>

              {/* Price */}
              <div className="grid-3">
                <Label htmlFor="price" className="mb-3">
                  Price
                </Label>
                <Input
                  placeholder="e.g. 10000"
                  id="price"
                  type="number"
                  min={0}
                  {...form.register("price")}
                  aria-invalid={form.formState.errors.price ? "true" : "false"}
                />
                <FieldError>{form.formState.errors.price?.message}</FieldError>
              </div>

              {/* Discount Type */}
              <Controller
                name="discount"
                control={form.control}
                render={({ field }) => (
                  <div>
                    <Label className="mb-3">Discount Type</Label>
                    <Select
                      value={field.value ?? undefined}
                      onValueChange={(value) => {
                        console.log(value);
                        field.onChange(value);
                      }}
                      {...form.register("discount")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select discount type" />
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
                      {form.formState.errors.discount?.message}
                    </FieldError>
                  </div>
                )}
              />

              {/* Discount Amount */}
              <div className="grid-3">
                <Label htmlFor="discount-amount" className="mb-3">
                  Discount Amount
                </Label>
                <Input
                  placeholder="e.g. 200"
                  id="discount-amount"
                  type="number"
                  min={0}
                  {...form.register("discountAmount")}
                />
                <FieldError>
                  {form.formState.errors.discountAmount?.message}
                </FieldError>
              </div>

              {/* Product Color */}
              <div>
                <Label className="mb-3">Product Color</Label>
                <Input
                  placeholder="e.g. Silver"
                  type="text"
                  id="color"
                  {...form.register("color")}
                  aria-invalid={form.formState.errors.color ? "true" : "false"}
                />
                <FieldError>{form.formState.errors.color?.message}</FieldError>
              </div>

              {/* Featured */}
              <div>
                <Controller
                  name="featured"
                  control={form.control}
                  render={({ field }) => (
                    <div>
                      <Label className="mb-3">Featured</Label>
                      <Select
                        value={field.value?.toString()}
                        onValueChange={(value) => {
                          field.onChange(value === "true" ? true : false);
                        }}
                        {...form.register("featured")}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select product validity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">True</SelectItem>
                          <SelectItem value="false">False</SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldError>
                        {form.formState.errors.featured?.message}
                      </FieldError>
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
              {/* Inventory */}
              <div className="min-w-full">
                <Label className="mb-3 min-w-full">Inventory</Label>
                <Input
                  placeholder="e.g. 1000"
                  type="number"
                  id="inventory"
                  {...form.register("inventory")}
                  min={0}
                />

                <FieldError>
                  {form.formState.errors.inventory?.message}
                </FieldError>
              </div>

              {/* Category Id */}
              <Controller
                name="categoryId"
                control={form.control}
                render={({ field }) => {
                  console.log({ value: field.value?.toString() });

                  return (
                    <div>
                      <Label className="mb-3">Category</Label>
                      <Select
                        value={field.value?.toString()}
                        onValueChange={(value) => {
                          field.onChange(value);
                          console.log(value);
                        }}
                        {...form.register("categoryId")}
                      >
                        <SelectTrigger
                          className="w-full"
                          aria-invalid={
                            form.formState.errors.sizes ? "true" : "false"
                          }
                        >
                          <SelectValue placeholder="Select product category" />
                        </SelectTrigger>
                        <SelectContent>
                          {showMeCategory.data?.categories.map(
                            (category: Category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                      <FieldError>
                        {form.formState.errors.categoryId?.message}
                      </FieldError>
                    </div>
                  );
                }}
              />

              {/* Size Id */}
              <Controller
                name="sizes"
                control={form.control}
                render={({ field }) => (
                  <div>
                    <Label className="mb-3">Size</Label>
                    <Select
                      value={field.value?.toString()}
                      onValueChange={(value) => {
                        field.onChange(value);
                        console.log(value);
                      }}
                      {...form.register("sizes")}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={
                          form.formState.errors.sizes ? "true" : "false"
                        }
                      >
                        <SelectValue placeholder="Select product size" />
                      </SelectTrigger>
                      <SelectContent>
                        {showMeSizes.data?.sizes.map((size: Size) => (
                          <SelectItem key={size.id} value={size.id}>
                            {size.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError>
                      {form.formState.errors.sizes?.message}
                    </FieldError>
                  </div>
                )}
              />
            </div>

            {/* Description */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mt-6">
              <div className="min-w-full">
                <Label className="mb-3 min-w-full">Description</Label>
                <Textarea
                  placeholder="Write your description here..."
                  {...form.register("description")}
                  aria-invalid={
                    form.formState.errors.description ? "true" : "false"
                  }
                />
                <FieldError>
                  {form.formState.errors.description?.message}
                </FieldError>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button
                size="lg"
                variant="secondary"
                className="cursor-pointer hover:bg-primary/10"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" size="lg" className="px-10 cursor-pointer">
              {mode === "edit" ? "Edit Product" : " Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
