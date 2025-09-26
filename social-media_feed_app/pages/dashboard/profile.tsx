import MyProfile from "@/components/common/MyProfile";
import ProfileRecommendation from "@/components/common/ProfileRecommendation";
import BrowserTitle from "@/components/layout/BrowserTitle";
import Dashboard from "@/components/layout/Dashboard";

const Profile: React.FC = () => {
  return (
    <Dashboard>
      <BrowserTitle title="Profile" />
      
      <div className="text-black flex">
        <div className="flex-1 max-w-4xl">
          <MyProfile />
        </div>
        <ProfileRecommendation />
      </div>
    </Dashboard>
  );
};

export default Profile;
