import React, { useEffect, useRef, useState } from "react";
import { Snackbar, Alert as MuiAlert, Chip } from "@mui/material";
import apiFunctions from "../api/apiFunctions";

// Alert wrapper for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function WaitlistUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
      .getWaitlistUsers()
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
        showSnackbar("Failed to fetch users.", "error");
      });
  };

  useEffect(() => {
    if (!isFetched.current) {
      getUsersData();
      isFetched.current = true;
    }
  }, []);

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5 bg-white text-black p-3 rounded-lg shadow-md min-h-[580px] flex flex-col">
      {/* Header */}
      <div className="d-lg-flex d-md-flex d-block justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">Waitlist Users</h2>
          <p className="text-sm text-gray-600">
            Manage users who are on the waitlist
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">
            Total Users: {filteredUsers.length}
          </h3>
        </div>
      </div>

      {/* Email Filter */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden flex-1">
        <div className="h-full overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-300 h-full">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {["S.No", "Email", "Added Date", "Followup Count"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm">{index + 1}</td>
                  <td className="px-6 py-3 text-sm">{user.email}</td>
                  <td className="px-6 py-2 text-sm whitespace-nowrap">
                    {new Date(user.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-3 text-sm">
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
          sx={{
            width: "100%",
            bgcolor: snackbarSeverity === "success" ? "#22c55e" : undefined,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
