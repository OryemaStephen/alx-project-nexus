import ProfileRecommendation from "@/components/common/ProfileRecommendation";
import BrowserTitle from "@/components/layout/BrowserTitle";
import Dashboard from "@/components/layout/Dashboard";

const Users: React.FC = () => {
  return (
    <Dashboard>
      <BrowserTitle title="Users" />
      <h1>Users</h1>
      <div className="text-black">
        <ProfileRecommendation />
      </div>
    </Dashboard>
  );
};

export default Users;
