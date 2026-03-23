import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import HomePage from "./auth/home/HomePage.tsx";
import MainLayout from "./products/layout/MainLayout.tsx";
import Login from "./auth/admin/login/Login.tsx";
import VerifyEmail from "./auth/admin/verify-email/VerifyEmail.tsx";
import AdminRegistration from "./auth/admin/register/Register.tsx";
import SignUpSuccessPage from "./auth/admin/sign-up-success/SignUpSuccess.tsx";
import RedirectIfLoggedIn from "./products/layout/RedirectIfLoggedIn.tsx";
import AuthLayout from "./products/layout/AuthLayout.tsx";
import Product from "./components/products/Product.tsx";
import Cart from "./components/cart/Cart.tsx";
import ProfileOverview from "./auth/profile/ProfileOverview.tsx";
import CouponsPage from "./components/admin/coupon/CouponPage.tsx";
import CategoriesPage from "./components/admin/category/CategoryPage.tsx";
import ProductsPage from "./components/admin/products/ProductsPage.tsx";
import SizePage from "./components/admin/size/SizePage.tsx";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: (
      <RedirectIfLoggedIn isAuth={false}>
        <MainLayout />
      </RedirectIfLoggedIn>
    ),
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/product", element: <Product /> },
      { path: "/cart", element: <Cart /> },
      { path: "/Coupons-page", element: <CouponsPage /> },
      { path: "/categories-page", element: <CategoriesPage /> },
      { path: "/products-page", element: <ProductsPage /> },
      { path: "/sizes-page", element: <SizePage /> },

      {
        path: "/profile",
        children: [{ index: true, element: <ProfileOverview /> }],
      },
    ],
  },
  {
    element: (
      <RedirectIfLoggedIn isAuth>
        <AuthLayout />
      </RedirectIfLoggedIn>
    ),
    children: [
      {
        path: "auth/admin/login",
        element: <Login />,
      },
      {
        path: "auth/admin/register",
        element: <AdminRegistration />,
      },
      {
        path: "auth/admin/sign-up-success",
        element: <SignUpSuccessPage />,
      },
      {
        path: "auth/verify",
        element: <VerifyEmail />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
