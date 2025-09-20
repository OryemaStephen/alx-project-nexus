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

  useEffect(() => {
    const getTitle = () => {
      const pathSegments = router.pathname
        .split("/")
        .filter((segment) => segment);
      
      if (pathSegments.length === 1 && pathSegments[0] === "dashboard") {
        return "Home";
      }
      
      if (router.query.id) {
        if (pathSegments[1] === "posts") {
          return "Post Details";
        }
        if (pathSegments[1] === "profile") {
          return "Profile";
        }
      }
      
      if (pathSegments.length > 1) {
        const lastSegment = pathSegments[pathSegments.length - 1];
        return lastSegment
          .replace(/[-_]/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
      
      return "Home";
    };

    const pageTitle = getTitle();
    document.title = `${pageTitle} - MySocial`;
  }, [router.pathname, router.query]); // Now only depends on router properties

  const getTitle = () => {
    const pathSegments = router.pathname
      .split("/")
      .filter((segment) => segment);
    
    if (pathSegments.length === 1 && pathSegments[0] === "dashboard") {
      return "Home";
    }
    
    if (router.query.id) {
      if (pathSegments[1] === "posts") {
        return "Post Details";
      }
      if (pathSegments[1] === "profile") {
        return "Profile";
      }
    }
    
    if (pathSegments.length > 1) {
      const lastSegment = pathSegments[pathSegments.length - 1];
      return lastSegment
        .replace(/[-_]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    return "Home";
  };

  const title = getTitle();

  return (
    <header className="h-16 flex w-full items-center bg-white px-4 md:px-6 shadow">
      <div className="flex items-center justify-between w-full">
        <button className="md:hidden p-2" onClick={toggleSidebar}>
          <Menu size={24} className="text-black" />
        </button>
        <div className="md:hidden block">
          <Logo />
        </div>
        <div className="hidden md:block text-black">
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        <nav className="flex-1 flex justify-end items-center space-x-4">
          <Link href="/dashboard/profile">
            <User className="h-10 w-10 p-1 rounded-full text-black hover:text-gray-600 border border-gray-300 shadow cursor-pointer" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;