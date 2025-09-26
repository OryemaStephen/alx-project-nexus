import Image from "next/image";
import { useQuery } from "@apollo/client/react";
import { Loader2 } from "lucide-react";
import { MeQueryData, UserProfile } from "@/interfaces";
import { ME_QUERY } from "@/graphql/requests/get/getMyProfile";

const mockUserData: UserProfile = {
  id: "user123",
  username: "john_doe",
  fullname: "John Doe",
  email: "john.doe@example.com",
  bio: "Software developer passionate about building amazing user experiences. Love hiking and photography in my free time!",
  profilePicture:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  followersCount: 123,
  followingCount: 456,
};

const MyProfile: React.FC = () => {
  const { data, loading, error } = useQuery<MeQueryData>(ME_QUERY);

  const userData = data?.me || mockUserData;

  if (error) {
    console.error(
      error.message || "Failed to fetch profile. Using sample data."
    );
  }

  if (loading) {
    return (
      <div className="flex w-full min-h-[70vh] justify-center items-center">
        <div className="flex items-center gap-2">
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
              {userData.profilePicture && (
                <div className="w-32 h-32 rounded-full overflow-hidden relative border-4 border-white">
                  <Image
                    src={userData.profilePicture}
                    alt={`${userData.username}'s profile`}
                    width={128}
                    height={128}
                    className="object-cover rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${userData.username}&background=8fd0f1&color=fff&size=128`;
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-black">
                    {userData.fullname}
                  </h2>
                  <p className="text-gray-700 text-lg">
                    @{userData.username}
                  </p>
                  <p className="text-gray-800 text-sm">{userData.email}</p>
                </div>
              </div>

              <div className="flex gap-6 text-sm font-medium text-gray-700">
                <div>
                  <span className="font-bold">
                    {userData.followersCount || 0}
                  </span>{" "}
                  Followers
                </div>
                <div>
                  <span className="font-bold">
                    {userData.followingCount || 0}
                  </span>{" "}
                  Following
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
              {userData.bio || "No bio yet."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;