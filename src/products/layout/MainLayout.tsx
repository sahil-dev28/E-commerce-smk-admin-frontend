import { ThemeProvider } from "@/components/ui/theme-provider";
import { Navbar } from "../Navbar/navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ProfileSidebar } from "@/components/profileSidebar/Profile-sidebar";

const MainLayout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <ProfileSidebar />
        <div className="min-h-screen flex flex-1 flex-col">
          <div className="sticky top-0 z-50">
            <Navbar />
          </div>

          <main className="flex-1">
            <Outlet />
          </main>
          <Toaster position="top-right" richColors />
        </div>
      </SidebarProvider>
      <ReactQueryDevtools />
    </ThemeProvider>
  );
};

export default MainLayout;
