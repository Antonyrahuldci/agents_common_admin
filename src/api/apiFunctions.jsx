import method from "./method";
const apiFunctions = {
  login: (payload) => method.post("/login", payload),
  adduser: (payload) => method.post("/add_users", payload),
  deleteUser: (payload) => method.delete(`/delete_users/${payload}`),
  updateUser: (payload) => method.put("/update_users", payload),

  sendFollowup: (payload) => method.post("/send_followup", payload),
  getAllowedusers: (payload) => method.get("/get_users", payload),

  getWaitlistUsers: (payload) => method.get("/waitlist_users", payload),
  sendFollowupToWaitlist: (payload) => method.post("/send_waitlist_followup", payload),
};

export default apiFunctions;
