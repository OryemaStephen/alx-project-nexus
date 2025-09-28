import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { toast } from "react-toastify";
import Button from "./Button";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_USERS_QUERY } from "@/graphql/requests/get/getUsers";
import { useState } from "react";
import {
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWING,
} from "@/graphql/requests/get/getUserFollow";
import { FollowType, UserData, UserFollowers, UserFollowing } from "@/interfaces";
import { FOLLOW_USER_MUTATION } from "@/graphql/requests/posts/followUser";
import { UNFOLLOW_USER_MUTATION } from "@/graphql/requests/posts/unFollowUser";


const ProfileRecommendation: React.FC = () => {
  const { data: usersData, loading: usersLoading } =
    useQuery<UserData>(GET_USERS_QUERY);

  let localUser: { id: string } | null = null;
  try {
    const storedUser = localStorage.getItem("logged_in_user");
    if (storedUser) {
      localUser = JSON.parse(storedUser);
    }
  } catch (err) {
    console.error("Failed to parse logged_in_user from localStorage:", err);
  }

  const { data: followersData, loading: followersLoading } =
    useQuery<UserFollowers>(GET_USER_FOLLOWERS, {
      variables: { userId: localUser ? parseInt(localUser.id) : 0 },
      skip: !localUser?.id,
    });

  const { data: followingData, loading: followingLoading } =
    useQuery<UserFollowing>(GET_USER_FOLLOWING, {
      variables: { userId: localUser ? parseInt(localUser.id) : 0 },
      skip: !localUser?.id,
    });

  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  const [followUser] = useMutation<
    { followUser: { follow: FollowType } },
    { userId: number }
  >(FOLLOW_USER_MUTATION, {
    refetchQueries: [
      { query: GET_USERS_QUERY },
      {
        query: GET_USER_FOLLOWERS,
        variables: { userId: localUser ? parseInt(localUser.id) : 0 },
      },
      {
        query: GET_USER_FOLLOWING,
        variables: { userId: localUser ? parseInt(localUser.id) : 0 },
      },
    ],
    onCompleted: () => {
      toast.success("Successfully followed user!");
    },
    onError: (error) => {
      toast.error(`Error following user: ${error.message}`);
    },
  });

  const [unfollowUser] = useMutation<
    { unfollowUser: { follow: { id: string } } },
    { userId: number }
  >(UNFOLLOW_USER_MUTATION, {
    refetchQueries: [
      { query: GET_USERS_QUERY },
      {
        query: GET_USER_FOLLOWING,
        variables: { userId: localUser ? parseInt(localUser.id) : 0 },
      },
    ],
    onCompleted: () => {
      toast.success("Successfully unfollowed user!");
    },
    onError: (error) => {
      toast.error(`Error unfollowing user: ${error.message}`);
    },
  });

  const handleFollowToggle = async (userId: string) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [userId]: true }));
      const isFollowing = followingData?.following.some((f) => f.id === userId);
      const parsedUserId = parseInt(userId);

      if (isFollowing) {
        await unfollowUser({
          variables: { userId: parsedUserId },
        });
      } else {
        await followUser({
          variables: { userId: parsedUserId },
        });
      }
    } catch (err) {
      console.error("Error in follow/unfollow:", err);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [userId]: false }));
    }
  };

  if (usersLoading || followersLoading || followingLoading) {
    return <div className="hidden lg:block w-80 ml-4">Loading...</div>;
  }

  const filteredUsers =
    usersData?.users?.filter(
      (user) =>
        user.id !== localUser?.id && 
        !followingData?.following.some((f) => f.id === user.id)
    ) || [];

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-lg p-4 top-0 sticky">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Who to follow
        </h2>
        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              const isFollowing = followingData?.following.some(
                (f) => f.id === user.id
              );
              const isFollower = followersData?.followers.some(
                (f) => f.id === user.id
              );
              const isLoading = loadingStates[user.id] || false;

              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200 mr-3">
                      {user.profilePicture ? (
                        <Image
                          src={user.profilePicture}
                          alt={user.username}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-amber-100 text-amber-800 font-semibold">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 capitalize">
                        {user.username.split("_").join(" ")}
                      </p>
                      {isFollower && (
                        <p className="text-xs text-gray-500">Follows you</p>
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    title={
                      isFollowing
                        ? "Following"
                        : isLoading
                        ? "Processing..."
                        : "Follow"
                    }
                    action={() => handleFollowToggle(user.id)}
                    className={`text-xs py-1 ${
                      isFollowing
                        ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        : ""
                    }`}
                    icon={
                      isFollowing ? (
                        <Check className="w-2 h-2" />
                      ) : (
                        <Plus className="w-2 h-2" />
                      )
                    }
                    disabled={isLoading}
                  />
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-sm">No users to suggest.</p>
          )}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Suggestions based on your activity and followers
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileRecommendation;
