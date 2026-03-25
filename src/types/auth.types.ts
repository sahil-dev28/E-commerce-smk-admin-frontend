import type {
  loginSchema,
  signUpSchema,
  verifyEmailSchema,
  updateProfileSchema,
  removeProfileImageSchema,
  uploadProfileImageSchema,
  createCouponSchema,
  updateCouponSchema,
  createCategorySchema,
  createProductSchema,
  updateProductSchema,
  createSizeSchema,
} from "@/schemas ";
import type { COUPON_TYPE } from "@/utils/const";
import type z from "zod";

export type AdminRegisterData = z.infer<typeof signUpSchema>;

export type AdminLoginData = z.infer<typeof loginSchema>;

export type VerifyEmailData = z.infer<typeof verifyEmailSchema>;

export type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export type uploadProfileImageSchema = z.infer<typeof uploadProfileImageSchema>;

export type removeProfileImageSchema = z.infer<typeof removeProfileImageSchema>;

export type CreateNewCoupon = z.infer<typeof createCouponSchema>;

export type CreateCategory = z.infer<typeof createCategorySchema>;

export type CreateSize = z.infer<typeof createSizeSchema>;

export type CouponType = (typeof COUPON_TYPE)[keyof typeof COUPON_TYPE];

// USER
export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  contactNo?: string;
  email: string;
  status: "ACTIVE" | "LOCKED";
  gender?: UpdateProfileData["gender"];
  dob?: string;
  profileImage?: string;
  profileImageId?: string;
}

// COUPON
export type couponType = "PERCENTAGE" | "FIXED";
export interface Coupon {
  id: string;
  type?: couponType;
  amount: number;
  code: string;
  startTime?: string;
  expiryTime: string;
  valid?: boolean;
  maxRedemptions: number;
  totalRedemptions: number;
}

export type UpdateCoupon = z.infer<typeof updateCouponSchema>;

export interface ShowMeResponse {
  user: User;
  coupon: Coupon;
}

// PRODUCT
export type CreateProduct = z.infer<typeof createProductSchema>;

export type UpdateProduct = z.infer<typeof updateProductSchema>;

export type discountType = "PERCENTAGE" | "FIXED";
export interface Product {
  id: string;
  name: string;
  price: number;
  sizes: { id: string; value: number }[];
  category: {
    name: string;
    id: string;
  };
  color: string;
  description: string;
  discount?: discountType;
  discountAmount?: number;
  featured?: boolean;
  inventory?: number;
  image: File | string;
  categoryId: string;
}
