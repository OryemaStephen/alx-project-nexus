import { Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Logo from "../common/Logo";
import Image from "next/image";
import { UserProfile } from "@/interfaces";
import Tooltip from "../common/Tooltip";

interface HeaderProps {
  toggleSidebar: () => void;
}

const FALLBACK_PROFILE_PICTURE = "https://images.unsplash.com/photo-1511367461989-2ff1c6a1e8e2?w=150&h=150&fit=crop&crop=face";

const mockUserData: UserProfile = {
  id: "user123",
  username: "john_doe",
  fullname: "John Doe",
  email: "john.doe@example.com",
  bio: "Software developer passionate about building amazing user experiences. Love hiking and photography in my free time!",
  profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  followersCount: 123,
  followingCount: 456,
};

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
          .replace(/[-_]/g, " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }

      return "Home";
    };

    const pageTitle = getTitle();
    document.title = `${pageTitle} - MySocial`;
  }, [router.pathname, router.query]);

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
        .replace(/[-_]/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return "Home";
  };

  const title = getTitle();

  return (
    <header className="h-16 flex w-full items-center bg-white px-4 md:px-6 shadow">
      <div className="flex items-center justify-between w-full">
        <button className="md:hidden py-2 pr-2 pl-0" onClick={toggleSidebar}>
          <Menu size={24} className="text-black" />
        </button>
        <div className="md:hidden block">
          <Logo />
        </div>
        <div className="hidden md:block text-black">
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        <nav className="flex-1 flex justify-end items-center space-x-4">
          <Tooltip title="Profile" position="bottom">
          <Link href="/dashboard/profile">
            <Image
              src={mockUserData.profilePicture || FALLBACK_PROFILE_PICTURE}
              alt={`${mockUserData.username}'s profile`}
              width={40}
              height={40}
              className="object-cover rounded-full"
            />
          </Link>
          </Tooltip>
        </nav>
      </div>
    </header>
  );
};

export default Header;
