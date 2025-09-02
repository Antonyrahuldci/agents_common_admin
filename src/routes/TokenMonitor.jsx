// TokenMonitor.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { pageRoutes } from "./pageRoutes";

const TokenMonitor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem("access-token");
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          console.log("Token expired. Logging out...");
          localStorage.removeItem("access-token");
          navigate(pageRoutes.login, { replace: true });
        }
      } catch (error) {
        console.error("Invalid token. Logging out...");
        localStorage.removeItem("access-token");
        navigate(pageRoutes.login, { replace: true });
      }
    };

    const interval = setInterval(checkTokenExpiry, 10000);

    return () => clearInterval(interval);
  }, [navigate]);

  return null; // no UI needed
};

export default TokenMonitor;
