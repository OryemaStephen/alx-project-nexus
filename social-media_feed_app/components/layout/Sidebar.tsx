import { MeQueryData, SidebarProps } from "@/interfaces";
import React, { useEffect } from "react";
import Logo from "../common/Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useQuery } from "@apollo/client/react";
import { ME_QUERY } from "@/graphql/requests/get/getMyProfile";

const Sidebar: React.FC<SidebarProps> = ({ menuItems, active, onSelect }) => {
  const router = useRouter();

  const {
      data: meData,
    } = useQuery<MeQueryData>(ME_QUERY);

    useEffect(() => {
      if (meData?.me) {
        localStorage.setItem('logged_in_user', JSON.stringify(meData.me));
      }
    }, [meData]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('logged_in_user');
    toast.success('Logged out successfully 👋');
    onSelect('logout');
    router.push('/auth/login');
    setTimeout(() => {
      window.location.reload();
    },1000)
  };

  return (
    <aside className="bg-white text-black w-64 min-h-screen p-4 shadow-lg flex flex-col">
      <div className="pb-8">
        <Logo />
      </div>
      <ul className="space-y-3 flex-1">
        {menuItems
          .filter((item) => item.id !== "logout")
          .map(({ id, label, icon: Icon, path }) => (
            <li key={id} className={`${id === "users" ? "lg:hidden" : ""}`}>
              <Link
                href={path}
                onClick={() => onSelect(id)}
                className={`cursor-pointer px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                  active === id ? "bg-[#A9DEF9] text-black" : "hover:bg-[#8fd0f1] text-black"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            </li>
          ))}
      </ul>
      <div className="mt-auto mb-14 md:mb-0">
        {menuItems
          .filter((item) => item.id === "logout")
          .map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={handleLogout}
              className={`cursor-pointer px-4 py-2 rounded-lg flex items-center gap-2 transition w-full text-left ${
                active === id ? "bg-[#A9DEF9] text-red-500" : "hover:bg-[#8fd0f1] text-red-400"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
      </div>
    </aside>
  );
};

export default Sidebar;