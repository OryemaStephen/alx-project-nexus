import Image from "next/image";
import { useQuery } from "@apollo/client/react";
import { Loader2 } from "lucide-react";
import { UserFollowers, UserFollowing } from "@/interfaces";
import {
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWING,
} from "@/graphql/requests/get/getUserFollow";

const MyProfile: React.FC = () => {
  let localUser;

  const storedUser = localStorage.getItem("logged_in_user");
  if (storedUser) {
    localUser = JSON.parse(storedUser);
    console.log(localUser);
  }

  const { data: followersData, loading: followersLoading } =
    useQuery<UserFollowers>(GET_USER_FOLLOWERS, {
      variables: { userId: parseInt(localUser.id) },
      skip: !localUser.id,
    });

  const { data: followingData, loading: followingLoading } =
    useQuery<UserFollowing>(GET_USER_FOLLOWING, {
      variables: { userId: parseInt(localUser.id) },
      skip: !localUser.id,
    });

  const followerCount = followersData?.followers.length || 0;
  const followingCount = followingData?.following.length || 0;

  if (followersLoading || followingLoading) {
    return (
      <div className="flex w-full min-h-[70vh] justify-center items-center">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="animate-spin" /> Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-black rounded-2xl shadow-lg overflow-hidden">
      <div className="h-40 bg-gradient-to-r from-[#8fd0f1] to-[#7ac0e1] relative"></div>

      <div className="px-6 pt-4 pb-6">
        <div className="relative -mt-16">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="flex-shrink-0">
              {localUser.profilePicture && (
                <div className="w-32 h-32 rounded-full overflow-hidden relative border-4 border-white">
                  <Image
                    src={localUser.profilePicture}
                    alt={`${localUser.username}'s profile`}
                    width={128}
                    height={128}
                    className="object-cover rounded-full"
                  />
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-black">
                    {localUser.fullname}
                  </h2>
                  <p className="text-gray-700 text-lg">@{localUser.username}</p>
                  <p className="text-gray-800 text-sm">{localUser.email}</p>
                </div>
              </div>

              <div className="flex gap-6 text-sm font-medium text-gray-700">
                <div>
                  <span className="font-bold">
                    {followersLoading ? "..." : followerCount}
                  </span>{" "}
                  {followersLoading
                    ? "Loading Followers"
                    : followerCount === 1
                    ? "Follower"
                    : "Followers"}
                </div>
                <div>
                  <span className="font-bold">{followingCount}</span> Following
                </div>
                <div>
                  <span className="font-bold">0</span> Posts
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6">
          <div className="bg-[#f8f9fa] p-4 rounded-lg border border-[#e9ecef]">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Bio</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {localUser.bio || "No bio yet."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
