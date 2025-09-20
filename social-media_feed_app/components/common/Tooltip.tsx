import React from "react";
import { TooltipProps } from "@/interfaces";

const Tooltip: React.FC<TooltipProps> = ({
  title,
  position = "top",
  children,
  className = "",
  showArrow = true,
  delay = 300,
}) => {
  return (
    <div className="relative inline-block group">
      {children}
      <div
        className={`
          absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm
          opacity-0 group-hover:opacity-100 transition-opacity
          ${position === "top" ? "bottom-full mb-2 left-1/2 -translate-x-1/2" : ""}
          ${position === "bottom" ? "top-full mt-2 left-1/2 -translate-x-1/2" : ""}
          ${position === "left" ? "right-full mr-2 top-1/2 -translate-y-1/2" : ""}
          ${position === "right" ? "left-full ml-2 top-1/2 -translate-y-1/2" : ""}
          pointer-events-none ${className}
        `}
        style={{ transitionDuration: `${delay}ms` }}
        role="tooltip"
        aria-label={title}
      >
        {title}
        {showArrow && (
          <div
            className={`
              absolute w-2 h-2 bg-gray-900 rotate-45
              ${position === "top" ? "bottom-[-4px] left-1/2 -translate-x-1/2" : ""}
              ${position === "bottom" ? "top-[-4px] left-1/2 -translate-x-1/2" : ""}
              ${position === "left" ? "right-[-4px] top-1/2 -translate-y-1/2" : ""}
              ${position === "right" ? "left-[-4px] top-1/2 -translate-y-1/2" : ""}
            `}
          />
        )}
      </div>
    </div>
  );
};

export default Tooltip;
