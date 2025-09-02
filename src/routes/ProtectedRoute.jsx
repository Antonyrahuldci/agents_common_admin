// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = () => {
//     console.log("Check")
//     const isAuthenticated = !!localStorage.getItem("access-token"); // Check authentication

//     return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = () => {
    const token = localStorage.getItem("access-token");
    if (!token) return true;

    try {
        const decoded = jwtDecode(token);
        // Check if the token is expired
        return decoded.exp * 1000 < Date.now();
    } catch (error) {
        console.error("Invalid token:", error);
        return true;
    }
};

const ProtectedRoute = () => {
    const isAuthenticated = !isTokenExpired();

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
