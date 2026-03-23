import { Outlet } from "react-router-dom";

const ProfileSidebarLayout = () => {
  return (
    <div
      className="min-h-screen flex flex-row bg-linear-to-br 
from-[#FFFFFF] 
via-[#F9FAFB] 
to-[#E5EDFF] overflow-x-hidden"
    >
      <div className="sticky top-0 z-50">{/* <ProfileSidebar /> */}</div>
      <main className="flex-1 px-10 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default ProfileSidebarLayout;
