// import { Menu } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import Logo from "../common/Logo";
// import Image from "next/image";
// import Tooltip from "../common/Tooltip";
// import { MeQueryData } from "@/interfaces";
// import { useQuery } from "@apollo/client/react";
// import { ME_QUERY } from "@/graphql/requests/get/getMyProfile";

// interface HeaderProps {
//   toggleSidebar: () => void;
// }



// const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
//   const router = useRouter();

//   const {
//         data: meData,
//       } = useQuery<MeQueryData>(ME_QUERY);
  
  
//       useEffect(() => {
//         if (meData?.me) {
//           localStorage.setItem('logged_in_user', JSON.stringify(meData.me));
//         }
//       }, [meData]);

//   console.log(meData);

//   useEffect(() => {
//     const getTitle = () => {
//       const pathSegments = router.pathname
//         .split("/")
//         .filter((segment) => segment);

//       if (pathSegments.length === 1 && pathSegments[0] === "dashboard") {
//         return "Home";
//       }

//       if (router.query.id) {
//         if (pathSegments[1] === "posts") {
//           return "Post Details";
//         }
//         if (pathSegments[1] === "profile") {
//           return "Profile";
//         }
//       }

//       if (pathSegments.length > 1) {
//         const lastSegment = pathSegments[pathSegments.length - 1];
//         return lastSegment
//           .replace(/[-_]/g, " ")
//           .split(" ")
//           .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//           .join(" ");
//       }

//       return "Home";
//     };

//     const pageTitle = getTitle();
//     document.title = `${pageTitle} - MySocial`;
//   }, [router.pathname, router.query]);

//   const getTitle = () => {
//     const pathSegments = router.pathname
//       .split("/")
//       .filter((segment) => segment);

//     if (pathSegments.length === 1 && pathSegments[0] === "dashboard") {
//       return "Home";
//     }

//     if (router.query.id) {
//       if (pathSegments[1] === "posts") {
//         return "Post Details";
//       }
//       if (pathSegments[1] === "profile") {
//         return "Profile";
//       }
//     }

//     if (pathSegments.length > 1) {
//       const lastSegment = pathSegments[pathSegments.length - 1];
//       return lastSegment
//         .replace(/[-_]/g, " ")
//         .split(" ")
//         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" ");
//     }

//     return "Home";
//   };

//   const title = getTitle();

//   return (
//     <header className="h-16 flex w-full items-center bg-white px-4 md:px-6 shadow">
//       <div className="flex items-center justify-between w-full">
//         <button className="md:hidden py-2 pr-2 pl-0" onClick={toggleSidebar}>
//           <Menu size={24} className="text-black" />
//         </button>
//         <div className="md:hidden block">
//           <Logo />
//         </div>
//         <div className="hidden md:block text-black">
//           <h1 className="text-xl font-semibold">{title}</h1>
//         </div>
//         <nav className="flex-1 flex justify-end items-center space-x-4">
//           <Tooltip title="Profile" position="bottom">
//           <Link href="/dashboard/profile">
//             <Image
//               src={meData?.me?.profilePicture}
//               alt={`${meData?.me?.username}'s profile`}
//               width={40}
//               height={40}
//               className="object-cover rounded-full"
//             />
//           </Link>
//           </Tooltip>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;
import { Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Logo from "../common/Logo";
import Image from "next/image";
import Tooltip from "../common/Tooltip";
import { MeQueryData } from "@/interfaces";
import { useQuery } from "@apollo/client/react";
import { ME_QUERY } from "@/graphql/requests/get/getMyProfile";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const router = useRouter();

  const { data: meData } = useQuery<MeQueryData>(ME_QUERY);

  useEffect(() => {
    if (meData?.me) {
      localStorage.setItem("logged_in_user", JSON.stringify(meData.me));
    }
  }, [meData]);

  console.log(meData);

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

  // Fallback for username (first two letters) or default if no user data
  const usernameInitials = meData?.me?.username
    ? meData.me.username.slice(0, 2).toUpperCase()
    : "NA"; // Fallback if no user data

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
              {meData?.me?.profilePicture ? (
                <Image
                  src={meData.me.profilePicture}
                  alt={`${meData.me.username}'s profile`}
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
                  {usernameInitials}
                </div>
              )}
            </Link>
          </Tooltip>
        </nav>
      </div>
    </header>
  );
};

export default Header;