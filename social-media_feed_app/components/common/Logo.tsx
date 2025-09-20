import { useRouter } from "next/router";

const Logo: React.FC = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between w-fit cursor-pointer" onClick={() => router.push("/")}>
      <h2 className="text-xl text-black md:text-2xl font-semibold">
        My<span className="text-amber-800">Social</span>
      </h2>
    </div>
  );
};

export default Logo;
