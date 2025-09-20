import BrowserTitle from "@/components/layout/BrowserTitle";
import Dashboard from "../../components/layout/Dashboard";
import CreatePostForm from "@/components/common/CreatePostForm";
import PostFeed from "@/components/common/PostFeed";
import ProfileRecommendation from "@/components/common/ProfileRecommendation";
import { mockRecommendations } from "@/constants";

const Home: React.FC = () => {
  return (
    <Dashboard>
      <BrowserTitle title="Home" />
      <div className="text-black flex">
        <div className="flex-1 max-w-4xl">
          <CreatePostForm />
          <PostFeed />
        </div>
        <ProfileRecommendation users={mockRecommendations} />
      </div>
    </Dashboard>
  );
};

export default Home;