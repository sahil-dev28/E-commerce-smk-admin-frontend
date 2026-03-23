import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const AuthLayout = () => {
  return (
    <main
      className="min-h-screen flex p-4 flex-col bg-linear-to-br 
from-[#FFFFFF] 
via-[#F9FAFB] 
to-[#E5EDFF]"
    >
      <Outlet />
      <Toaster position="top-right" richColors />
    </main>
  );
};

export default AuthLayout;
