import { ComponentProps } from "@/interfaces";

const Layout: React.FC<ComponentProps> = ({ children }) => {
  return <main className="min-h-screen bg-gray-100">{children}</main>;
};

export default Layout;