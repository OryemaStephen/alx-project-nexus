import { Home, User, LogOut, Users } from "lucide-react";
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
    id: "users",
    label: "Users",
    icon: Users,
    path: "/dashboard/users",
  },
  {
    id: "logout",
    label: "Logout",
    icon: LogOut,
    path: "/auth/login",
  },
];