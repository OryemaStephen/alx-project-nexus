import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { menuItems } from "@/constants";
import { ComponentProps } from "@/interfaces";
import { useRouter } from "next/router";

const Dashboard: React.FC<ComponentProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const [active, setActive] = useState(() => {
    const currentPath = router.pathname;
    const activeItem = menuItems.find((item) => item.path === currentPath);
    return activeItem ? activeItem.id : "dashboard";
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex text-black bg-gray-100">
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64 transition-transform duration-200 ease-in-out z-50`}
      >
        <Sidebar
          menuItems={menuItems}
          active={active}
          onSelect={(id) => {
            setActive(id);
            setIsSidebarOpen(false);
          }}
        />
      </div>

      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 overflow-y-auto">
          {children}
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;