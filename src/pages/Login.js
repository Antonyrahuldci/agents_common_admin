import React, { useState, useCallback } from "react";
import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import apiFunctions from "../api/apiFunctions";
import { pageRoutes } from "../routes/pageRoutes";

// Alert wrapper
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const navigate = useNavigate();

  // Show snackbar
  const showSnackbar = useCallback((message, severity = "info") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiFunctions.login({ email, password });
      console.log("Login API Response:", response);

      if (response?.status === 200) {
        const token = response.data.token;
        const username = response.data.data.username;
        localStorage.setItem("access-token", token);
        localStorage.setItem("user", username);

        if (onLoginSuccess) onLoginSuccess();

        // Success snackbar
        showSnackbar("Login successful! Redirecting...", "success");

        setTimeout(() => {
          navigate(pageRoutes?.dashboard, { replace: true });
        }, 1500);
      } else {
        throw new Error(response?.data?.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      showSnackbar(err.message || "An unexpected error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-white">
            Welcome Back 👋
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Please sign in to access your dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200"
            >
              Email address
            </label>
            <div className="mt-2 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AtSymbolIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="email"
                id="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-lg 
                           bg-gray-900/70 border border-gray-600 
                           text-white placeholder-gray-400 
                           focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                           focus:text-purple-400
                           sm:text-sm transition"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200"
            >
              Password
            </label>
            <div className="mt-2 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-lg 
                           bg-gray-900/70 border border-gray-600 
                           text-white placeholder-gray-400 
                           focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                           focus:text-purple-400
                           sm:text-sm transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-lg text-sm font-semibold 
                       text-white bg-gradient-to-r from-purple-600 to-indigo-600 
                       hover:from-purple-700 hover:to-indigo-700 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 
                       disabled:opacity-50 transition"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Register
            </a>
          </p>
        </div>
      </div>

      {/* Snackbar component */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            ...(snackbarSeverity === "success" && {
              backgroundColor: "#58C958",
            }),
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
