import { COUPON_TYPE } from "@/utils/const";
import { z } from "zod";

const phoneRegex = /^([+]?\d{1,2}\s?|)\d{3}[.\s-]?\d{3}[.\s-]?\d{4}$/;

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name is required")
    .max(20, "First name is too long"),
  lastName: z.string().max(20, "Last name is too long").optional(),
  email: z.email("Invalid email address").trim(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password is too long")
    .refine((val) => /[A-Z]/.test(val), {
      error: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      error: "Password must contain at least one lowercase letter",
    })
    .refine((val) => /[@$!%*?]/.test(val), {
      message: "Password must contain at least one special character",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must contain at least one number",
    }),
  contactNo: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .max(12, "Contact number must be at most 12 digits")
    .regex(phoneRegex, "Invalid contact number format")
    .trim(),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address").trim(),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain  at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain  at least one lowercase letter",
    })
    .refine((val) => /[@$!%*?]/.test(val), {
      message: "Password must contain at least one special character",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must contain at least one number",
    }),
});

export const verifyEmailSchema = z.object({
  email: z.email("Invalid email address").trim(),
  token: z.string(),
});

export const forgetPasswordSchema = z.object({
  email: z.email("Invalid email").trim(),
});

export const resetPasswordSchema = z.object({
  email: z.email("Invalid email").trim(),
  passwordCode: z
    .string()
    .length(6, "Code must be 6 characters long.")
    .regex(/^\d+$/, "Code must contain only digits.")
    .trim(),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((val) => /[@$!%*?]/.test(val), {
      message: "Password must contain at least one special character",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must contain at least one number",
    }),
});

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name is required")
    .max(20, "First name is too long"),
  lastName: z.string().max(20, "Last name is too long").optional().nullable(),
  contactNo: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .max(12, "Contact number must be at most 12 digits")
    .regex(phoneRegex, "Invalid contact number format")
    .trim(),
  gender: z.enum(["MALE", "FEMALE"]).nullable().optional(),
  dob: z.coerce.date().nullable().optional(),
});

export const uploadProfileImageSchema = z.object({}).strict();

export const removeProfileImageSchema = z
  .object({
    profileImageId: z.string(),
  })
  .strict();

export const createCouponSchema = z
  .object({
    type: z.enum([COUPON_TYPE.fixed, COUPON_TYPE.percentage]).optional(),
    amount: z.coerce
      .number({ error: "Discount amount is required" })
      .int("Discount amount must be a whole number")
      .min(1, "Discount amount must be at least 1"),
    code: z.coerce
      .string()
      .trim()
      .toUpperCase()
      .min(3, "Code must be at least 3 characters")
      .max(10, "Code must be at least 10 characters")
      .transform((value) => value.replaceAll(" ", "")),
    startTime: z
      .date()
      .refine((date) => date.getTime() > Date.now(), {
        message: "Start time already passed",
      })
      .optional(),
    expiryTime: z
      .date({ error: "Expiry time is required" })
      .refine((date) => date.getTime() > Date.now(), {
        message: "Expiry time already passed",
      }),
    maxRedemptions: z.coerce
      .number({ error: "Redemption count is required" })
      .min(0.01, {
        message: "Max redemptions must be at least 1",
      })
      .positive("Amount must be positive")
      .pipe(z.number().int()),
    valid: z.boolean().optional(),
  })
  .refine((data) => data.type !== "PERCENTAGE" || data.amount <= 100, {
    message: "Percentage discount must be less than or equal to 100",
    path: ["amount"],
  });

export const updateCouponSchema = z.object({
  expiryTime: z
    .date({ error: "Expiry time is required" })
    .refine((date) => date.getTime() > Date.now(), {
      message: "Expiry time already passed",
    }),
  valid: z.boolean().optional(),
  maxRedemptions: z.coerce
    .number({ error: "Redemption count is required" })
    .min(0.01, {
      message: "Max redemptions must be at least 1",
    })
    .positive("Amount must be positive")
    .pipe(z.number().int()),
});

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(3, "Category name must be at least 3 characters")
    .max(20, "Category name must be at most 30 characters")
    .trim(),
});

export const updateCategorySchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(3, "Category name must be at least 3 characters")
    .max(20, "Category name must be at most 30 characters")
    .trim(),
});

export const createSizeSchema = z.object({
  value: z.coerce.number().min(1, "Size is required"),
});

export const updateSizeSchema = z.object({
  value: z.coerce.number(),
});

export const createProductSchema = z
  .object({
    name: z
      .string()
      .min(3, "Product name must be at least 3 characters")
      .max(50, "Product name must be at most 30 characters")
      .trim(),
    price: z.coerce
      .number({ error: "Price is required" })
      .int("Price must be a whole number")
      .min(100, "Price must be at least 100"),
    discount: z.enum(["PERCENTAGE", "FIXED"]).optional(),
    discountAmount: z.coerce.number().optional(),
    sizes: z
      .string({ error: "Size is required" })
      .min(1, "Size ID is required")
      .trim(),
    categoryId: z
      .string({ error: "Category is required" })
      .min(1, "Category ID is required")
      .trim(),
    featured: z.boolean().optional(),
    color: z
      .string({ error: "Product color is required" })
      .min(1, { message: "Product color is required" })
      .trim(),
    description: z
      .string()
      .min(1, "Description is required")
      .max(500, "Description cannot exceed 500 words")
      .trim(),
    inventory: z.coerce
      .number({ error: "Inventory must be greater than or equal to 0" })
      .int("Must be a whole number")
      .optional(),
    image: z.instanceof(File, {
      message: "Product image is required",
    }),
  })
  .refine(
    (data) =>
      data.discount !== "PERCENTAGE" ||
      (data.discountAmount !== undefined && data.discountAmount <= 100),
    {
      error: "Percentage discount must be less than or equal to 100",
      path: ["discountAmount"],
    },
  );

export const updateProductSchema = z.object({
  name: z
    .string({ error: "Product name is required" })
    .min(3, "Product name must be at least 3 characters")
    .max(50, "Product name must be at most 30 characters")
    .trim()
    .optional(),
  price: z.coerce
    .number({ error: "Price is required" })
    .int("Price must be a whole number")
    .min(100, "Price must be at least 100")
    .optional(),
  discount: z.enum(["PERCENTAGE", "FIXED"]).optional(),
  discountAmount: z.coerce
    .number()
    .int()
    .positive("Discount amount must be positive")
    .optional(),
  sizes: z.string({ error: "Size of product is required" }).trim().optional(),
  categoryId: z.string({ error: "Category ID is required" }).trim().optional(),
  featured: z.boolean().optional(),
  color: z.string("Product color is required").trim().optional(),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 words")
    .trim()
    .optional(),
  inventory: z.coerce
    .number()
    .int("Must be a whole number")
    .positive("Inventory must be positive")
    .optional(),
  image: z.instanceof(File, {
    message: "Product image is required",
  }),
});
