import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/style.css";
import apiFunctions from "../api/apiFunctions";
import { Editor } from "@tinymce/tinymce-react";
import {
  Chip,
  Snackbar,
  Alert as MuiAlert,
  Autocomplete,
  TextField,
} from "@mui/material";
import { Send } from "lucide-react";

// Alert wrapper
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SendMail = () => {
  const [mode, setMode] = useState("bulk"); // bulk or individual
  const [userType, setUserType] = useState("allowed"); // allowed or waitlist
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const navigate = useNavigate();

  const showSnackbar = useCallback((message, severity = "info") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // ✅ Fetch users (only for bulk OR individual)
  const getUsersData = () => {
    const apiCall =
      userType === "allowed"
        ? apiFunctions.getAllowedusers
        : apiFunctions.getWaitlistUsers;

    apiCall()
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

  // ✅ Fetch users whenever mode or userType changes
  useEffect(() => {
    getUsersData();
  }, [mode, userType]);

  const handleAddEmail = (newEmail) => {
    if (!newEmail) return;

    const trimmedEmail = newEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      showSnackbar("Please enter a valid email address.", "warning");
      return;
    }

    if (emails.includes(trimmedEmail)) {
      showSnackbar("This email is already added.", "info");
      return;
    }

    setEmails([...emails, trimmedEmail]);
    setEmailInput("");
    showSnackbar("Email added successfully!", "success");
  };

  const handleDeleteEmail = (emailToDelete) => {
    setEmails(emails.filter((email) => email !== emailToDelete));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !body) {
      showSnackbar("Please fill in both subject and body", "warning");
      return;
    }

    const payload =
      mode === "individual"
        ? { type: "individual", subject, body, emails }
        : { subject, body };

    try {
      setLoading(true);

      // ✅ Choose API method based on user type
      const apiMethod =
        userType === "allowed"
          ? apiFunctions.sendFollowup
          : apiFunctions.sendFollowupToWaitlist;

      const response = await apiMethod(payload);

      if (response?.status === 200) {
        showSnackbar("Emails sent successfully!", "success");
        setSubject("");
        setBody("");
        setEmails([]);
        setEmailInput("");
      } else if (response?.status === 400) {
        const message = response?.message || "Bad Request: Invalid input data.";
        showSnackbar(message, "error");
      } else {
        showSnackbar("Failed to send emails.", "error");
      }
    } catch (error) {
      console.error("Error sending emails:", error);
      showSnackbar("Error while sending emails.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-center w-100">
        <div className="mail_form p-4 bg-white dark:bg-black shadow rounded-lg border border-gray-300 dark:border-gray-700">
          <form onSubmit={handleSubmit}>
            <p className="mb-4 text-center text-xl font-semibold text-gray-900 dark:text-white">
              Send Email
            </p>

            {/* --- User Type and Mode --- */}
            <div className="form-group mt-3 flex flex-wrap gap-6 items-center">
              {/* User Type */}
              <div>
                <label className="text-gray-700 dark:text-gray-300">
                  User Type
                </label>
                <div className="custom-radio-group">
                  <label
                    className={`custom-radio ${
                      userType === "allowed" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      value="allowed"
                      checked={userType === "allowed"}
                      onChange={() => setUserType("allowed")}
                      disabled={loading}
                    />
                    Allowed Users
                  </label>
                  <label
                    className={`custom-radio ${
                      userType === "waitlist" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      value="waitlist"
                      checked={userType === "waitlist"}
                      onChange={() => setUserType("waitlist")}
                      disabled={loading}
                    />
                    Waitlist Users
                  </label>
                </div>
              </div>

              {/* Send Mode */}
              <div>
                <label className="text-gray-700 dark:text-gray-300">
                  Send Mode
                </label>
                <div className="custom-radio-group">
                  <label
                    className={`custom-radio ${
                      mode === "bulk" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      value="bulk"
                      checked={mode === "bulk"}
                      onChange={() => setMode("bulk")}
                      disabled={loading}
                    />
                    Bulk
                  </label>
                  <label
                    className={`custom-radio ${
                      mode === "individual" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      value="individual"
                      checked={mode === "individual"}
                      onChange={() => setMode("individual")}
                      disabled={loading}
                    />
                    Individual
                  </label>
                </div>
              </div>
            </div>

            {/* Bulk info */}
            {mode === "bulk" && (
              <div className="mt-3 text-gray-700 dark:text-gray-300">
                <strong>
                  Total {userType === "allowed" ? "allowed" : "waitlist"} users:
                </strong>{" "}
                {users.length}
              </div>
            )}

            {/* Individual email selection with autocomplete */}
            {mode === "individual" && (
              <div className="form-group mt-3">
                <label className="text-gray-700 dark:text-gray-300">
                  Email Addresses
                  <span
                    style={{ color: "red", fontWeight: 600 }}
                    className="mb-0 ms-2"
                  >
                    (Type email and press Enter)
                  </span>
                </label>
                <Autocomplete
                  freeSolo
                  // options={users.map((u) => u.email)}
                  options={[...users.map((u) => u.email)].sort((a, b) =>
                    a.localeCompare(b)
                  )}
                  value={null}
                  inputValue={emailInput}
                  onInputChange={(event, newInputValue) =>
                    setEmailInput(newInputValue)
                  }
                  onChange={(event, newValue) => {
                    if (newValue) {
                      handleAddEmail(newValue);
                      setEmailInput("");
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Type email and press Enter"
                      variant="outlined"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddEmail(emailInput);
                          setEmailInput("");
                        }
                      }}
                      disabled={loading}
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "40px",
                          borderRadius: "4px",
                          "& fieldset": {
                            borderColor: "#969696",
                          },
                          "&:hover fieldset": {
                            borderColor: "#969696",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#969696",
                          },
                        },
                        input: {
                          padding: "10px",
                          fontSize: "16px", // Match Subject field font size
                          fontWeight: 400, // Match Subject field font weight
                          fontFamily: "Arial, sans-serif", // Match Subject field font family
                          color: "#000000",
                        },
                      }}
                    />
                  )}
                />

                {/* Added emails as chips */}
                <div className="mt-2">
                  {emails.map((email, idx) => (
                    <Chip
                      key={idx}
                      label={email}
                      onDelete={() => handleDeleteEmail(email)}
                      style={{
                        marginRight: "5px",
                        marginBottom: "5px",
                        backgroundColor: "#22c55e",
                        color: "#fff",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Subject */}
            <div className="form-group mt-3">
              <label className="text-gray-700 dark:text-gray-300">
                Subject
              </label>
              <input
                type="text"
                className="form-control mt-1 bg-gray-100 dark:bg-white-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Body */}
            <div className="form-group mt-3">
              <label className="text-gray-700 dark:text-gray-300">Body</label>
              <Editor
                apiKey="1pdsneydkucihp6n03xnx1wmdwsc6j71sqxk20jwc8i5cyt3"
                value={body}
                onEditorChange={(newValue) => setBody(newValue)}
                init={{
                  height: 320,
                  menubar: false,
                  statusbar: false,
                  placeholder: "Enter your content...",
                  plugins: ["link", "lists", "autolink", "code", "textcolor"],
                  toolbar:
                    "undo redo | bold italic underline strikethrough | " +
                    "forecolor backcolor | " +
                    "alignleft aligncenter alignright alignjustify | " +
                    "bullist numlist | link | removeformat | code",
                  branding: false,
                }}
              />
            </div>

            {/* Buttons */}
            <div className="row mt-4">
              <div className="col-lg-6">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setSubject("");
                    setBody("");
                    setEmails([]);
                    setEmailInput("");
                  }}
                  className="w-full py-2 px-4 rounded-lg text-sm font-semibold text-white bg-[#4b5563] hover:bg-[#374151] focus:outline-none focus:ring-2 focus:ring-[#4b5563] disabled:opacity-50 transition shadow-md"
                >
                  Clear
                </button>
              </div>
              <div className="col-lg-6 mt-lg-0 mt-md-2 mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 rounded-lg text-sm font-semibold text-white bg-[#16a34a] hover:bg-[#15803d] focus:outline-none focus:ring-2 focus:ring-[#16a34a] disabled:opacity-50 transition shadow-md flex items-center justify-center gap-2"
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Email <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
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
            ...(snackbarSeverity === "success" && {
              backgroundColor: "#22c55e",
              color: "#fff",
            }),
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SendMail;
