import { ReactNode } from "react";

export interface ComponentProps {
  children: ReactNode
}

export interface ButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  action?: () => void;
}

export type MenuItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  path: string;
};

export interface SidebarProps {
  menuItems: MenuItem[];
  active: string;
  onSelect: (id: string) => void;
}

export type ContentProps = {
  active: string;
};