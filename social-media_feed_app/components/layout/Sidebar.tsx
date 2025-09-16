import { SidebarProps } from "@/interfaces";
import React from "react";
import Logo from "../common/Logo";
import Link from "next/link";

const Sidebar: React.FC<SidebarProps> = ({ menuItems, active, onSelect }) => {
  return (
    <aside className="bg-white text-black w-64 min-h-screen p-4 shadow-lg flex flex-col">
      <div className="pb-8">
        <Logo />
      </div>
      <ul className="space-y-3 flex-1">
        {menuItems
          .filter((item) => item.id !== "logout")
          .map(({ id, label, icon: Icon, path }) => (
            <li key={id}>
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
      <div className="mt-auto">
        {menuItems
          .filter((item) => item.id === "logout")
          .map(({ id, label, icon: Icon, path }) => (
            <Link
              key={id}
              href={path}
              onClick={() => onSelect(id)}
              className={`cursor-pointer px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                active === id ? "bg-[#A9DEF9] text-black" : "hover:bg-[#8fd0f1] text-black"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
      </div>
    </aside>
  );
};

export default Sidebar;