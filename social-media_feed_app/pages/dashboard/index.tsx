import Dashboard from "../../components/layout/Dashboard";

const Home: React.FC = () => {
  return (
    <Dashboard>
      <div className="text-black">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </div>
    </Dashboard>
  );
};

export default Home;