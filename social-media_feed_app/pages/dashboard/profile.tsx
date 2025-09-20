import MyProfile from "@/components/common/MyProfile";
import BrowserTitle from "@/components/layout/BrowserTitle";
import Dashboard from "@/components/layout/Dashboard";

const Profile: React.FC = () => {
  return (
    <Dashboard>
      <BrowserTitle title="Profile" />
      {/* <div className="text-black">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p>This is your profile page.</p>
      </div> */}
      <MyProfile />
    </Dashboard>
  );
};

export default Profile;
