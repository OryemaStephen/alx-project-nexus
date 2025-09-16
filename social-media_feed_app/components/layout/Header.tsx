import { Menu, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Logo from "../common/Logo";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const router = useRouter();

  const getTitle = () => {
    const pathSegments = router.pathname
      .split("/")
      .filter((segment) => segment);
    if (pathSegments.length === 1 && pathSegments[0] === "dashboard") {
      return "Home";
    } else if (pathSegments.length > 1) {
      const lastSegment = pathSegments[pathSegments.length - 1];
      return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    }
    return "Home";
  };

  useEffect(() => {
    const pageTitle = getTitle();
    document.title = `${pageTitle} - MySocial`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  const title = getTitle();

  return (
    <header className="h-16 flex w-full items-center bg-white px-4 md:px-6 shadow">
      <div className="flex items-center justify-between w-full">
        <button className="md:hidden p-2" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <div className="md:hidden block">
          <Logo />
        </div>
        <div className="hidden md:block">
          <h1>{title}</h1>
        </div>
        <nav className="flex-1 flex justify-end items-center space-x-4">
          <Link href="/dashboard/profile">
            <User className="h-10 w-10 p-2 rounded-full text-black hover:text-gray-600 border border-gray-300 shadow cursor-pointer" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
