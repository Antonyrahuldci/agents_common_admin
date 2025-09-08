// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   Outlet,
// } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import 'bootstrap/dist/css/bootstrap.min.css';

// import Header from "./components/Header";
// import SubscriptionsOverview from "./pages/SubscriptionsOverview";
// import Customers from "./pages/Customers";
// import Subscriptions from "./pages/Subscriptions";
// import Settings from "./pages/Settings";
// import SimbliDashboard from "./pages/SimbliDashboard";
// import LoginPage from "./pages/Login";
// import { pageRoutes } from "./routes/pageRoutes";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import TokenMonitor from "./routes/TokenMonitor";
// import "./App.css";
// import SendMail from "./pages/SendMail";

// function App() {
//   const [darkMode, setDarkMode] = useState(
//     () => localStorage.getItem("darkMode") === "true"
//   );
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   useEffect(() => {
//     localStorage.setItem("darkMode", darkMode.toString());
//     if (darkMode) document.documentElement.classList.add("dark");
//     else document.documentElement.classList.remove("dark");
//   }, [darkMode]);

//   const toggleDarkMode = () => setDarkMode((prev) => !prev);
//   const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

//   // Layout wrapper for protected routes
//   const Layout = () => (
//     <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
//       <Sidebar collapsed={sidebarCollapsed} />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header
//           onToggleDarkMode={toggleDarkMode}
//           darkMode={darkMode}
//           onToggleSidebar={toggleSidebar}
//         />
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
//           <Outlet /> {/* This renders the child routes */}
//         </main>
//       </div>
//     </div>
//   );

//   return (
//     <div className={`App ${darkMode ? "dark" : ""}`}>
//       <BrowserRouter>
//         <TokenMonitor />
//         <Routes>
//           {/* Public Route */}
//           <Route path={pageRoutes?.login} element={<LoginPage />} />

//           {/* Protected Routes */}
//           <Route element={<ProtectedRoute />}>
//             <Route element={<Layout />}>
//               {/* <Route
//                 path={pageRoutes?.dashboard}
//                 element={<SimbliDashboard />}
//               /> */}
//               <Route
//                 path="/subscription-overview"
//                 element={<SubscriptionsOverview />}
//               />
//               <Route path={pageRoutes?.dashboard} element={<Customers />} />
//               <Route path="/subscriptions" element={<Subscriptions />} />
//               <Route path="/settings" element={<Settings />} />
//               <Route path="/send-mail" element={<SendMail/>} />
//               <Route
//                 path="/"
//                 element={<Navigate to={pageRoutes?.dashboard} replace />}
//               />
//               <Route
//                 path="*"
//                 element={<Navigate to={pageRoutes?.dashboard} replace />}
//               />
//             </Route>
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SubscriptionsOverview from "./pages/SubscriptionsOverview";
import "bootstrap/dist/css/bootstrap.min.css";
import Customers from "./pages/Customers";
import Subscriptions from "./pages/Subscriptions";
import Settings from "./pages/Settings";
import SimbliDashboard from "./pages/SimbliDashboard";
import LoginPage from "./pages/Login";
import { pageRoutes } from "./routes/pageRoutes";
import ProtectedRoute from "./routes/ProtectedRoute";
import TokenMonitor from "./routes/TokenMonitor";
import "./App.css";
import SendMail from "./pages/SendMail";
import WaitlistUsers from "./pages/WaitlistUsers";

function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // desktop collapse
  const [mobileOpen, setMobileOpen] = useState(false); // ✅ mobile offcanvas

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  // ✅ Layout wrapper for protected routes
  const Layout = () => (
    <div className="flex h-screen bg-green-50 dark:bg-gray-900">
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onToggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          onToggleSidebar={() => setMobileOpen(true)} // ✅ open mobile sidebar
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-green-50 dark:bg-white-900 p-6">
          <Outlet /> {/* This renders the child routes */}
        </main>
      </div>
    </div>
  );

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <BrowserRouter>
        <TokenMonitor />
        <Routes>
          {/* Public Route */}
          <Route path={pageRoutes?.login} element={<LoginPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              {/* Dashboard redirect */}
              {/* <Route
                path={pageRoutes?.dashboard}
                element={<SimbliDashboard />}
              /> */}

              <Route
                path="/subscription-overview"
                element={<SubscriptionsOverview />}
              />
              <Route path={pageRoutes?.dashboard} element={<Customers />} />
              <Route
                path={pageRoutes?.wailistusers}
                element={<WaitlistUsers />}
              />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/send-email" element={<SendMail />} />

              {/* Default redirect */}
              <Route
                path="/"
                element={<Navigate to={pageRoutes?.dashboard} replace />}
              />
              <Route
                path="*"
                element={<Navigate to={pageRoutes?.dashboard} replace />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
