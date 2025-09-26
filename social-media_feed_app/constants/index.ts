import { Home, User, LogOut } from "lucide-react";
import { MenuItem, RecommendedUser } from "@/interfaces";

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

export const mockRecommendations: RecommendedUser[] = [
  {
    id: "user4",
    username: "emma_watson",
    fullName: "Emma Watson",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    followerCount: 1254,
    isFollowing: false,
  },
  {
    id: "user5",
    username: "tech_guru",
    fullName: "Alex Johnson",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    followerCount: 876,
    isFollowing: false,
  },
  {
    id: "user6",
    username: "travel_enthusiast",
    fullName: "Sarah Miller",
    followerCount: 543,
    isFollowing: false,
  },
  {
    id: "user7",
    username: "foodie_adventures",
    fullName: "Michael Chen",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    followerCount: 932,
    isFollowing: false,
  },
  {
    id: "user8",
    username: "fitness_freak",
    fullName: "Jessica Williams",
    followerCount: 1201,
    isFollowing: false,
  },
  {
    id: "user9",
    username: "fit_freak",
    fullName: "Jessica Williams",
    followerCount: 1201,
    isFollowing: false,
  },
  {
    id: "user10",
    username: "foll_f",
    fullName: " Foll Williams",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    followerCount: 120,
    isFollowing: false,
  },
  {
    id: "user12",
    username: "greg_doe",
    fullName: "Honest Frane",
    followerCount: 10,
    isFollowing: false,
  },
  {
    id: "user13",
    username: "jane_doe",
    fullName: "Honest Frane",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    followerCount: 10,
    isFollowing: false,
  },
];
