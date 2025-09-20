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
    <div className="min-h-screen bg-gray-100">
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64 transition-transform duration-200 ease-in-out z-50`}
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
      <div className="fixed top-0 left-0 right-0 md:left-64 z-40">
        <Header toggleSidebar={toggleSidebar} />
      </div>

      <main className="pt-20 md:ml-64 p-4 overflow-y-auto h-screen">
        {children}
      </main>

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
