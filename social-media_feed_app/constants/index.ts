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

// export const mockData: PostsQueryResults = {
//   posts: [
//     {
//       id: "1",
//       author: { id: "user1", username: "john_doe" },
//       createdAt: "2025-09-18T10:00:00Z",
//       image: undefined,
//       likeCount: 42,
//       commentCount: 15,
//       shareCount: 7,
//       content: "This is a sample post content.  Hello world! #firstpost",
//     },
//     {
//       id: "2",
//       author: { id: "user2", username: "jane_smith" },
//       createdAt: "2025-09-17T15:30:00Z",
//       image: [
//         "https://images.unsplash.com/photo-1640920789307-1df7543f5828?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9uZXklMjB0cmFja2luZ3xlbnwwfHwwfHx8MA%3D%3D",
//       ],
//       likeCount: 23,
//       commentCount: 8,
//       shareCount: 3,
//       content: "",
//     },
//     {
//       id: "3",
//       author: { id: "user3", username: "alice_wonder" },
//       createdAt: "2025-09-16T08:20:00Z",
//       image: [
//         "https://plus.unsplash.com/premium_photo-1661424009427-7fc2024dcfa3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW9uZXklMjB0cmFja2luZ3xlbnwwfHwwfHx8MA%3D%3D",
//         "https://images.unsplash.com/photo-1640920789307-1df7543f5828?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9uZXklMjB0cmFja2luZ3xlbnwwfHwwfHx8MA%3D%3D",
//         "https://images.unsplash.com/photo-1506645292803-579c17d4ba6a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vbmV5JTIwdHJhY2tpbmd8ZW58MHx8MHx8fDA%3D",
//       ],
//       likeCount: 67,
//       commentCount: 25,
//       shareCount: 12,
//       content: "Testing the post feed component with some sample data!",
//     },
//     {
//       id: "4",
//       author: { id: "user2", username: "jane_smith" },
//       createdAt: "2025-09-17T15:30:00Z",
//       image: [
//         "https://images.unsplash.com/photo-1506645292803-579c17d4ba6a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vbmV5JTIwdHJhY2tpbmd8ZW58MHx8MHx8fDA%3D",
//       ],
//       likeCount: 23,
//       commentCount: 8,
//       shareCount: 3,
//       content: "",
//     },
//     {
//       id: "5",
//       author: { id: "user2", username: "jane_smith" },
//       createdAt: "2025-09-17T15:30:00Z",
//       image: [
//         "https://images.unsplash.com/photo-1466921583968-f07aa80c526e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZ1bnxlbnwwfHwwfHx8MA%3D%3D",
//         "https://plus.unsplash.com/premium_photo-1661424009427-7fc2024dcfa3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW9uZXklMjB0cmFja2luZ3xlbnwwfHwwfHx8MA%3D%3D",
//         "https://images.unsplash.com/photo-1640920789307-1df7543f5828?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9uZXklMjB0cmFja2luZ3xlbnwwfHwwfHx8MA%3D%3D",
//       ],
//       likeCount: 23,
//       commentCount: 8,
//       shareCount: 3,
//       content: "",
//     },
//     {
//       id: "6",
//       author: { id: "user2", username: "jane_smith" },
//       createdAt: "2025-09-17T15:30:00Z",
//       image: [
//         "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZ1bnxlbnwwfHwwfHx8MA%3D%3D",
//          "https://plus.unsplash.com/premium_photo-1661424009427-7fc2024dcfa3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW9uZXklMjB0cmFja2luZ3xlbnwwfHwwfHx8MA%3D%3D",
//         "https://images.unsplash.com/photo-1640920789307-1df7543f5828?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9uZXklMjB0cmFja2luZ3xlbnwwfHwwfHx8MA%3D%3D",
//         "https://images.unsplash.com/photo-1640920789307-1df7543f5828?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9uZXklMjB0cmFja2luZ3xlbnwwfHwwfHx8MA%3D%3D",
//       ],
//       likeCount: 23,
//       commentCount: 8,
//       shareCount: 3,
//       content: "",
//     },
//   ],
// };

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
