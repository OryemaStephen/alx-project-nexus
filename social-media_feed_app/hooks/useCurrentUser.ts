import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; 
import { DecodedToken } from "@/interfaces";


export const useCurrentUser = () => {
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      console.log(decoded);
      setUser(decoded);
    } catch (error) {
      console.error("Failed to decode token:", error);
      setUser(null);
    }
  }, []);

  return user;
};