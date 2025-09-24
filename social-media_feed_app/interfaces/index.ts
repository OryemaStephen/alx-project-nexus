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
  username: string;
  password: string;
}

export interface LoginMutationData {
  tokenAuth: {
    token: string;
    refreshExpiresIn: number;
    payload: Record<string, unknown>;
  };
}
export interface PostFormProps {
  content: string;
  imageUrl: string | null;
}

export interface Post {
  id: string;
  author: {
    id: string;
    username: string;
    profilePicture?: string | null;
  };
  content: string;
  imageUrl: string | null;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
}

export interface CreatePostMutationData {
  createPost: {
    post: {
      id: string;
      content: string;
      imageUrl: string | null;
    };
  };
}

export interface PostsQueryResults {
  posts: Post[];
};

export interface PostQueryResult {
  post: Post | null;
}

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

export interface AvatarProps {
  username: string;
  profilePicture?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface Comment {
  id: string;
  user: {
    username: string;
    profilePicture?: string | null;
  };
  post: {
    id: string;
  };
  content: string;
  createdAt: string;
}

export interface CommentsQueryResult {
  comments: Comment[];
}

export interface AddCommentMutationData {
  addComment: {
    comment: Comment;
  };
}

export interface LikeMutationData {
  likePost: {
    like: {
      id: string;
      user: {
        username: string;
        profilePicture?: string | null;
      };
      post: {
        id: string;
      };
      createdAt: string;
    };
  };
}

export interface UserLikeQueryResult {
  userLike: {
    id: string;
    user: {
      username: string;
      profilePicture?: string | null;
    };
    post: {
      id: string;
    };
    createdAt: string;
  } | null;
}

export interface UnlikeMutationData {
  unlikePost: {
    success: boolean;
  };
}

