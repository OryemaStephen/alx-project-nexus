import { toast } from "react-toastify";
import Image from "next/image";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      email
      bio
      profilePicture
    }
  }
`;

interface UserProfile {
  id: string;
  username: string;
  email: string;
  bio?: string;
  profilePicture?: string;
}

interface MeQueryData {
  me: UserProfile;
}

const MyProfile: React.FC = () => {
  const { data, loading, error } = useQuery<MeQueryData>(ME_QUERY, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    },
  });

  if (error) {
    toast.error(error.message || "Failed to fetch profile. Please try again.");
  }

  if (loading) {
    return (
      <div className="flex w-full min-h-[70vh] justify-center items-center">
        <div className="flex items-center gap-2">
          <div className="loader" /> Loading profile...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full p-4 bg-white text-black rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">My Profile</h1>
        {data?.me && (
          <>
            {data.me.profilePicture && (
              <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden relative">
                <Image
                  src={data.me.profilePicture}
                  alt={`${data.me.username}'s profile`}
                  width={96}
                  height={96}
                  className="object-cover rounded-full"
                />
              </div>
            )}
            <div>
              <h2 className="text-lg font-semibold">Username</h2>
              <p className="text-gray-800">{data.me.username}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Email</h2>
              <p className="text-gray-800">{data.me.email}</p>
            </div>
            {data.me.bio && (
              <div>
                <h2 className="text-lg font-semibold">Bio</h2>
                <p className="text-gray-800">{data.me.bio}</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MyProfile;
