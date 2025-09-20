import { ButtonProps } from "@/interfaces";
import React from "react";

const Button: React.FC<ButtonProps> = ({ title, className, type = "button", action, disabled, icon }) => {
  return (
    <button
      onClick={action}
      type={type}
      disabled={disabled}
      className={`${className} flex items-center gap-2 justify-center cursor-pointer px-8 py-2 border-2 border-[#A9DEF9] bg-[#A9DEF9] rounded-full hover:bg-[#6396b0] text-black transition-colors duration-300`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{title}</span> 
    </button>
  );
};

export default Button;