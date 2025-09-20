import Image from "next/image";
import { Plus } from "lucide-react";
import { ProfileRecommendationProps } from "@/interfaces";
import { toast } from "react-toastify";
import Button from "./Button";

const ProfileRecommendation: React.FC<ProfileRecommendationProps> = ({
  users,
}) => {
  const handleFollow = (userId: string) => {
    toast.success(`Following user with ID: ${userId}`);
  };

  return (
    <div className="hidden lg:block w-80 ml-4">
      <div className="bg-white rounded-2xl shadow-lg p-4 top-0 sticky">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Who to follow
        </h2>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200 mr-3">
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={user.username}
                      fill
                      className=" object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-amber-100 text-amber-800 font-semibold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <p className=" font-medium text-gray-900 capitalize">
                    {user.username.split("_").join(" ")}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user.followerCount} followers
                  </p>
                </div>
              </div>
              <Button
                type="button"
                title="Follow"
                action={() => handleFollow(user.id)}
                className="text-xs py-1"
                icon={<Plus className="w-2 h-2" />}
              />
            </div>
          ))}
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
