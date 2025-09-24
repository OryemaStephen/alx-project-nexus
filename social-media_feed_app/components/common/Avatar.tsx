import { AvatarProps } from "@/interfaces";
import Image from "next/image";
import { useState } from "react";

const Avatar: React.FC<AvatarProps> = ({
  username,
  profilePicture,
  size = "md",
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
  };

  const initials = username
  .trim()
  .split(/\s+/)
  .slice(0, 2)
  .map((word, index, arr) =>
    arr.length === 1 ? word.slice(0, 2) : word.charAt(0)
  )
  .join("")
  .toUpperCase();


  const fallbackBgColor = "bg-gray-200";

  return (
    <div
      className={`flex items-center justify-center rounded-full overflow-hidden ${sizeClasses[size]} ${className}`}
    >
      {profilePicture && !imageError ? (
        <Image
          src={profilePicture}
          alt={`${username}'s avatar`}
          width={size === "sm" ? 32 : size === "md" ? 48 : 64}
          height={size === "sm" ? 32 : size === "md" ? 48 : 64}
          className="object-cover w-full h-full"
          onError={() => setImageError(true)}
          priority={size === "lg"}
        />
      ) : (
        <div
          className={`flex items-center justify-center w-full h-full ${fallbackBgColor} text-amber-900 font-semibold`}
        >
          {initials}
        </div>
      )}
    </div>
  );
};

export default Avatar;