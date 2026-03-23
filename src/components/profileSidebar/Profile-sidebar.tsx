import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useShowMeQuery } from "@/hooks/profile/admin/useShowMeQuery";
import { NavUser } from "./Nav-User";

// This is sample data.
const adminData = {
  navMain: [
    {
      title: "Coupons",
      url: "/Coupons-page",
    },
    {
      title: "Products",
      url: "/products-page",
    },
    {
      title: "Categories",
      url: "/categories-page",
    },
    {
      title: "Sizes",
      url: "/sizes-page",
    },
  ],
};

export function ProfileSidebar() {
  const showMe = useShowMeQuery();

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center gap-5 border-b">
        <Avatar className="w-14 h-14">
          <AvatarImage src={showMe.data?.user.profileImage} alt="@shadcn" />
        </Avatar>
        <div className="flex flex-col justify-between">
          <div className="font-bold text-lg">
            {showMe.data?.user.firstName} {showMe.data?.user.lastName}
          </div>
          <p className="text-muted-foreground text-xs">(Admin Dashboard)</p>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-3">
        <SidebarMenu className="mt-2">
          {adminData.navMain.map((menu, index) => (
            <SidebarMenuItem key={index} title={menu.title} className="">
              <SidebarMenuButton
                asChild
                className="font-sans px-2 py-5 w-full text-left rounded-md hover:bg-primary/10 focus:bg-primary/30 focus:outline-none focus:ring-2 focus:ring-primary-foreground"
              >
                <Link to={menu.url}>{menu.title}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: `${showMe.data?.user.firstName} ${showMe.data?.user.lastName}`,
            email: showMe.data?.user.email || "",
            avatar: showMe.data?.user.profileImage || "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
