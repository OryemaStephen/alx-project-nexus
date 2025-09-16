import BrowserTitle from "@/components/layout/BrowserTitle";
import Dashboard from "../../components/layout/Dashboard";

const Home: React.FC = () => {
  return (
    <Dashboard>
      <BrowserTitle title="Home" />
      <div className="text-black">
        <h1 className="text-2xl font-bold mb-4">Home</h1>
        <p>Welcome to your dashboard!</p>
      </div>
    </Dashboard>
  );
};

export default Home;