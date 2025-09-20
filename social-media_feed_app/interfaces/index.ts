import { ReactNode } from "react";

export interface ComponentProps {
  children: ReactNode
}

export interface ButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  action?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode; 
}

export type MenuItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  path: string;
};

export interface SidebarProps {
  menuItems: MenuItem[];
  active: string;
  onSelect: (id: string) => void;
}

export type ContentProps = {
  active: string;
};

export interface BrowserTitleProps {
  title: string;
}

export interface RegisterFormProps{
  username: string;
  email: string;
  password: string;
  password1: string;
  showPassword: boolean;
  confirmPassword: boolean;
}

export interface LoginFormProps {
  email: string;
  password: string;
  showPassword: boolean;
}

export interface PostFormProps {
  content: string;
  imageUrls: File[]
}

export interface Post {
  id: string;
  author: {
    id: string;
    username: string;
  };
  content: string;
  imageUrls?: string[]
  createdAt: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
}

export interface PostsQueryResult {
  posts: Post[];
};

export interface PostCardProps {
  post: Post;
  onOpenPost: () => void;
}

export interface RecommendedUser {
  id: string;
  username: string;
  fullName: string;
  avatarUrl?: string;
  followerCount: number;
  isFollowing?: boolean;
}

export interface ProfileRecommendationProps {
  users: RecommendedUser[];
}

export interface UserProfile {
  id: string;
  username: string;
  fullname: string;
  email: string;
  bio?: string;
  profilePicture?: string;
  followersCount: number;
  followingCount: number; 
}

export interface MeQueryData {
  me: UserProfile;
}

export interface TooltipProps {
  title: string;
  position?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
  delay?: number;
}

