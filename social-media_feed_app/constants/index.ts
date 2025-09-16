import { Home, User, LogOut } from "lucide-react";
import { MenuItem } from "@/interfaces";

export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Home",
    icon: Home,
    path: "/dashboard",
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    path: "/dashboard/profile",
  },
  {
    id: "logout",
    label: "Logout",
    icon: LogOut,
    path: "/auth/login",
  },
];