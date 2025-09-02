import React, { useEffect, useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Switch, IconButton, Snackbar, Alert as MuiAlert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import apiFunctions from "../api/apiFunctions";

// Alert wrapper for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AllowedUsers() {
  const [users, setUsers] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const isFetched = useRef(false);

  // Snackbar helper
  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  // Fetch allowed users from API
  const getUsersData = () => {
    apiFunctions
      .getAllowedusers()
      .then((res) => {
        console.log("Initial response", res);
        if (res?.status === 200 && res?.data && res.data.data) {
          // sort descending by created_at
          const sortedData = [...res.data.data].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setUsers(sortedData);
        } else {
          setUsers([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setUsers([]);
      });
  };

  useEffect(() => {
    if (!isFetched.current) {
      getUsersData();
      isFetched.current = true;
    }
  }, []);

  // Add new allowed user with email validation
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newEmail) return;

    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      showSnackbar("Please enter a valid email address.", "error");
      return;
    }

    try {
      setIsLoading(true);
      const payload = { email: newEmail };
      const res = await apiFunctions.adduser(payload);

      if (res?.status === 200) {
        showSnackbar("User added successfully!", "success");
        setNewEmail(""); // clear input
        getUsersData(); // refresh users list
      } else {
        showSnackbar(res?.message || "Failed to add user.", "error");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      showSnackbar("Failed to add user. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle allowed_access
  const handleToggleAccess = async (id, currentValue) => {
    try {
      const payload = {
        id: id,
        allowed_access: !currentValue, // toggle value
      };
      const res = await apiFunctions.updateUser(payload);
      if (res?.status === 200) {
        showSnackbar("User access updated successfully!", "success");
        // Update local state
        setUsers((prev) =>
          prev.map((user) =>
            user.id === id ? { ...user, allowed_access: !currentValue } : user
          )
        );
      } else {
        showSnackbar(res?.data?.message || "Failed to update user.", "error");
      }
    } catch (error) {
      console.error("Update user error:", error);
      showSnackbar("Failed to update user. Please try again.", "error");
    }
  };

  // Delete user by ID
  const handleDeleteUser = async (id) => {
    try {
      const res = await apiFunctions.deleteUser(id); // pass only id
      if (res?.status === 200) {
        showSnackbar("User deleted successfully!", "success");
        // Remove user from local state
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } else {
        showSnackbar(res?.data?.message || "Failed to delete user.", "error");
      }
    } catch (error) {
      console.error("Delete user error:", error);
      showSnackbar("Failed to delete user. Please try again.", "error");
    }
  };

  // Filter users by email
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Allowed Users
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage users who have access to the system
          </p>
        </div>
      </div>

      {/* Total Users on the right */}
      <div className="flex justify-end mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Total Users: {filteredUsers.length}
        </h3>
      </div>

      {/* Top controls: Add + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
        {/* Email input */}
        <input
          type="email"
          placeholder="Enter email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="w-full sm:max-w-md px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          onClick={handleAddUser}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
        >
          <PlusIcon className="h-5 w-5" /> Add
        </button>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-md px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Users table */}
      {/* <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                S.No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Added Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                  <Switch
                    checked={user.allowed_access}
                    onChange={() =>
                      handleToggleAccess(user.id, user.allowed_access)
                    }
                    color="primary"
                  />
                  <IconButton
                    onClick={() => handleDeleteUser(user.id)}
                    color="error"
                    size="small"
                    aria-label="delete user"
                  >
                    <DeleteIcon fontSize="medium" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      {/* Users table */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          {" "}
          {/* Scrollable container */}
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Added Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                    <Switch
                      checked={user.allowed_access}
                      onChange={() =>
                        handleToggleAccess(user.id, user.allowed_access)
                      }
                      color="primary"
                    />
                    <IconButton
                      onClick={() => handleDeleteUser(user.id)}
                      color="error"
                      size="small"
                      aria-label="delete user"
                    >
                      <DeleteIcon fontSize="medium" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
