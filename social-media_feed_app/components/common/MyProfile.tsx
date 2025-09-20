import Image from "next/image";
import { useQuery, useMutation } from "@apollo/client/react";
import { Loader2, Edit, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MeQueryData, UserProfile } from "@/interfaces";
import { ME_QUERY } from "@/graphql/requests/get/getMyProfile";
import { UPDATE_PROFILE_MUTATION } from "@/graphql/requests/posts/updateProfile";

const mockUserData: UserProfile = {
  id: "user123",
  username: "john_doe",
  fullname: "John Doe",
  email: "john.doe@example.com",
  bio: "Software developer passionate about building amazing user experiences. Love hiking and photography in my free time!",
  profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
};

const MyProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullname: "",
    username: "",
    email: "",
    bio: "",
  });

  const { data, loading, error, refetch } = useQuery<MeQueryData>(ME_QUERY, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    },
    errorPolicy: 'all',
  });
  useEffect(() => {
    if (data?.me) {
      setEditForm({
        fullname: data.me.fullname || "",
        username: data.me.username || "",
        email: data.me.email || "",
        bio: data.me.bio || "",
      });
    }
  }, [data]);

  const [updateProfile, { loading: updating }] = useMutation(UPDATE_PROFILE_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    },
  });

  const userData = data?.me || mockUserData;

  const handleEditToggle = () => {
    if (isEditing) {
      setEditForm({
        fullname: userData.fullname || "",
        username: userData.username || "",
        email: userData.email || "",
        bio: userData.bio || "",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const { data } = await updateProfile({
        variables: {
          input: {
            fullname: editForm.fullname,
            username: editForm.username,
            email: editForm.email,
            bio: editForm.bio,
          }
        }
      });

      toast.success("Profile updated successfully! 🎉");
      setIsEditing(false);
      refetch();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error
        ? error.message
        : "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    }
  };

  if (error) {
    console.error(error.message || "Failed to fetch profile. Using sample data.");
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
    <div className="w-full p-6 bg-white text-black rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div />
        <button
          onClick={handleEditToggle}
          className="flex items-center gap-2 bg-[#8fd0f1] hover:bg-[#7ac0e1] text-white px-4 py-2 rounded-lg transition"
        >
          {isEditing ? (
            <>
              <X size={18} />
              Cancel
            </>
          ) : (
            <>
              <Edit size={18} />
              Edit Profile
            </>
          )}
        </button>
      </div>

      <div className="flex gap-6 items-start mb-6">
        {userData.profilePicture && (
          <div className="w-32 h-32 rounded-full overflow-hidden relative border-4 border-[#e6f7ff] flex-shrink-0">
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
        
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  value={editForm.fullname}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8fd0f1]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={editForm.username}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8fd0f1]"
                />
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-black">{userData.fullname}</h2>
              <p className="text-gray-400 text-lg">@{userData.username}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-[#f8f9fa] p-4 rounded-lg border border-[#e9ecef]">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Email</h3>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editForm.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8fd0f1]"
            />
          ) : (
            <p className="text-gray-700">{userData.email}</p>
          )}
        </div>
        
        <div className="bg-[#f8f9fa] p-4 rounded-lg border border-[#e9ecef]">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Bio</h3>
          {isEditing ? (
            <textarea
              name="bio"
              value={editForm.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8fd0f1] resize-none"
            />
          ) : (
            <p className="text-gray-700 whitespace-pre-line">{userData.bio || "No bio yet."}</p>
          )}
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={updating}
              className="flex items-center gap-2 bg-[#8fd0f1] hover:bg-[#7ac0e1] text-white px-4 py-2 rounded-lg transition"
            >
              {updating ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;