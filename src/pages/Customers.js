import React, { useEffect, useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Switch,
  IconButton,
  Snackbar,
  Alert as MuiAlert,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import apiFunctions from "../api/apiFunctions";
import "../css/style.css";

// Alert wrapper for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AllowedUsers() {
  const [users, setUsers] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [accessFilter, setAccessFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const isFetched = useRef(false);

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const getUsersData = () => {
    apiFunctions
      .getAllowedusers()
      .then((res) => {
        if (res?.status === 200 && res?.data && res.data.data) {
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

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newEmail) return;
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
        setNewEmail("");
        getUsersData();
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

  const handleToggleAccess = async (id, currentValue) => {
    try {
      const payload = {
        id: id,
        allowed_access: !currentValue,
      };
      const res = await apiFunctions.updateUser(payload);
      if (res?.status === 200) {
        showSnackbar("User access updated successfully!", "success");
        getUsersData();
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

  const handleDeleteUser = async (id) => {
    try {
      const res = await apiFunctions.deleteUser(id);
      if (res?.status === 200) {
        getUsersData();
        showSnackbar("User deleted successfully!", "success");
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } else {
        showSnackbar(res?.data?.message || "Failed to delete user.", "error");
      }
    } catch (error) {
      console.error("Delete user error:", error);
      showSnackbar("Failed to delete user. Please try again.", "error");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesEmail = user.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesDate = dateFilter
      ? new Date(user.created_at).toLocaleDateString() ===
        new Date(dateFilter).toLocaleDateString()
      : true;

    const matchesAccess = accessFilter
      ? String(user.allowed_access) === accessFilter
      : true;

    return matchesEmail && matchesDate && matchesAccess;
  });

  return (
    <div className="space-y-5 bg-white text-black p-3 rounded-lg shadow-md min-h-[580px] flex flex-col">
      {/* Header */}
      <div className="d-lg-flex d-md-flex d-block justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">Allowed Users</h2>
          <p className="text-sm text-gray-600">
            Manage users who have site access
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">
            Total Users: {filteredUsers.length}
          </h3>
        </div>
      </div>

      {/* Add User and Filters */}
      {/* <div className="flex flex-wrap gap-4 mb-4 items-center">
        <input
          type="email"
          placeholder="Enter email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
        />

        <button
          onClick={handleAddUser}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-lg transition disabled:opacity-50"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add</span>
        </button>

        <input
          type="text"
          placeholder="Search by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
        />

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-1/6 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
        />

        <select
          value={accessFilter}
          onChange={(e) => setAccessFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-1/6 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
        >
          <option value="">All Access</option>
          <option value="true">Access Granted</option>
          <option value="false">Access Denied</option>
        </select>

        <button
          onClick={() => {
            setSearchTerm("");
            setDateFilter("");
            setAccessFilter("");
          }}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
        >
          Reset Filters
        </button>
      </div> */}
      <div className="flex flex-col gap-4 mb-4">
        {/* Row 1 */}
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="email"
            placeholder="Enter email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
          />

          <button
            onClick={handleAddUser}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-lg transition disabled:opacity-50"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add</span>
          </button>
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
          />

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-1/6 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
          />

          <select
            value={accessFilter}
            onChange={(e) => setAccessFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-1/6 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
          >
            <option value="">All Access</option>
            <option value="true">Access Granted</option>
            <option value="false">Access Denied</option>
          </select>

          <button
            onClick={() => {
              setSearchTerm("");
              setDateFilter("");
              setAccessFilter("");
            }}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
          >
            Reset Filters
          </button>
        </div>
      </div>
      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden flex-1">
        <div className="h-full overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-300 h-full">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {[
                  "S.No",
                  "Email",
                  "Added Date",
                  "Followup Count",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-2 text-sm">{index + 1}</td>
                  <td className="px-6 py-2 text-sm">{user.email}</td>
                  <td className="px-6 py-2 text-sm whitespace-nowrap">
                    {new Date(user.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-2 text-sm">
                    <Chip
                      label={
                        user.followup_stage > 0
                          ? `${user.followup_stage} Followup`
                          : "No Followup"
                      }
                      size="small"
                      sx={{
                        backgroundColor:
                          user.followup_stage > 0 ? "#22c55e" : "gray",
                        color: "#fff",
                      }}
                    />
                  </td>
                  <td className="px-6 py-2 text-sm flex items-center gap-2">
                    <Switch
                      checked={user.allowed_access}
                      onChange={() =>
                        handleToggleAccess(user.id, user.allowed_access)
                      }
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#22c55e",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: "#22c55e",
                          },
                      }}
                    />
                    <IconButton
                      onClick={() => handleDeleteUser(user.id)}
                      size="small"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-sm py-4 text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
