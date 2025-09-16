import Dashboard from "@/components/layout/Dashboard";

const Profile: React.FC = () => {
  return (
    <Dashboard>
      <div className="text-black">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p>This is your profile page.</p>
      </div>
    </Dashboard>
  );
};

export default Profile;