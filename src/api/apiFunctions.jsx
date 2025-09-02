import method from "./method";
const apiFunctions = {
  getAllowedusers: (payload) => method.get("/get_users", payload),
  login: (payload) => method.post("/login", payload),
  adduser: (payload) => method.post("/add_users", payload),
  deleteUser: (payload) => method.delete(`/delete_users/${payload}`),
  updateUser: (payload) => method.put("/update_users", payload),
};

export default apiFunctions;
