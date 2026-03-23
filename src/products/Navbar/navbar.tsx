import { Link, NavLink } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { useAuthStore } from "@/store/authStore";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";

import { useLogout } from "@/hooks/auth/admin/useLogout";
import { useState } from "react";
import { useShowMeQuery } from "@/hooks/profile/admin/useShowMeQuery";

import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import smkLogo from "../../assets/whiteLogo.png";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { User, Settings } from "lucide-react";

export function Navbar() {
  const isAuthorized = useAuthStore((state) => state.isAuthorized);
  const { mutateAsync: logoutAccount } = useLogout();
  const { data } = useShowMeQuery();

  const [openDialog, setOpenDialog] = useState(false);

  const logoutHandler = async () => {
    try {
      await logoutAccount();
    } catch (error) {
      console.log("Logout Failed", error);
    }
  };
  return (
    <nav className="flex items-center gap-12 h-18 bg-primary text-primary-foreground shadow-sm justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="bg-primary hover:bg-primary" />
        <div className="gap-4 flex text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "font-semibold" : "hover:underline"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/product"
            className={({ isActive }) =>
              isActive ? "font-semibold" : "hover:underline"
            }
          >
            Products
          </NavLink>
        </div>
      </div>

      <Link to="/" className="text-lg font-semibold mx-5">
        <div className="h-24 overflow-hidden">
          <img src={smkLogo} alt="Logo" className="h-full" />
        </div>
      </Link>

      {isAuthorized ? (
        <div className="flex justify-end items-center h-full mx-5 gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="rounded-none shadow-none focus-visible:z-10 p-0 cursor-pointer">
                <User
                  className="hover:text-primary-foreground/80 transition"
                  size={23}
                  strokeWidth={"1.5"}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-7 w-64 mr-10 my-8" align="start">
              <Avatar className="mx-auto w-20 h-20 mb-2">
                <AvatarImage src={data?.user.profileImage} alt="@shadcn" />
                <AvatarFallback>
                  {data?.user.firstName}
                  {data?.user.lastName}
                </AvatarFallback>
              </Avatar>
              <DropdownMenuLabel className="flex justify-center font-semibold mb-2">
                Hi, {data?.user.firstName}
              </DropdownMenuLabel>
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuGroup className="flex flex-col">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 rounded-md px-2 py-2 font-medium"
                >
                  <DropdownMenuItem className="cursor-pointer w-full">
                    <User />
                    My Account
                    <DropdownMenuShortcut>
                      <Link to="/profile">⇧⌘P</Link>
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 rounded-md px-2 py-2"
                >
                  <DropdownMenuItem className="cursor-pointer w-full">
                    <Settings />
                    Settings
                    <DropdownMenuShortcut>
                      <Link to="/profile">⇧⌘S</Link>
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuGroup className="">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenDialog(true);
                  }}
                  variant="destructive"
                >
                  <button className="flex items-center gap-2 rounded-md px-2 py-2 cursor-p">
                    Log out
                  </button>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />

          <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to log out?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. You will be logged out from your
                  account.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={logoutHandler}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : (
        <div className="flex flex-2 justify-end items-center max-h-10">
          <VscAccount
            size={"23"}
            className="hover:text-primary-foreground/80 transition  mx-1.5"
          />
          <Link to="/auth/admin/login" className="hover:underline">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

//  <div className="flex">
//             <HoverCard>
//               <HoverCardTrigger asChild>
//                 <button>
//                   <CiUser
//                     size={"23"}
//                     className="hover:text-primary-foreground/80 transition mx-1.5 cursor-pointer"
//                     strokeWidth={"0.5"}
//                   />
//                 </button>
//               </HoverCardTrigger>
//               <HoverCardContent className="w-70 mr-10 my-8">
//                 <div className="flex flex-col gap-4 items-center">
//                   <Avatar className="flex items-center w-17 h-17">
//                     <AvatarImage
//                       src="https://github.com/shadcn.png"
//                       alt="@shadcn"
//                     />

//                     <AvatarFallback>CN</AvatarFallback>
//                   </Avatar>
//                 </div>
//                 <div className="mt-4 flex flex-col gap-4">
//                   <div>
//                     <Link to="/profile">Profile</Link>
//                   </div>
//                   <div>
//                     <Link to="/profile">Settings</Link>
//                   </div>
//                   <FieldSeparator></FieldSeparator>
//                   <div className="">
//                     <button
//                       className="cursor-pointer"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         setOpenDialog(true);
//                       }}
//                     >
//                       Log out
//                     </button>
//                   </div>
//                 </div>
//               </HoverCardContent>
//             </HoverCard>
//           </div>
