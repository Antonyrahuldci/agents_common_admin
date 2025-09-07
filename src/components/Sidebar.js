import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UserGroupIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

import { LogOut, X } from "lucide-react";
import { pageRoutes } from "../routes/pageRoutes";

const navigation = [
  {
    name: "Allowed Users",
    href: pageRoutes?.dashboard,
    icon: UserGroupIcon,
  },
  {
    name: "Waitlist Users",
    href: pageRoutes?.wailistusers,
    icon: ClockIcon,
  },
  {
    name: "Create Email",
    href: pageRoutes?.mail,
    icon: EnvelopeIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ collapsed, mobileOpen, setMobileOpen }) {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("access-token");
    window.location.reload();
  };

  return (
    <>
      {/* ✅ Desktop Sidebar with solid white background */}
      <div
        className={`hidden lg:block ${
          collapsed ? "w-16" : "w-64"
        } bg-white dark:bg-black shadow-lg transition-all duration-300 ease-in-out`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-[#22c55e] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              {!collapsed && (
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                  Admin Panel
                </span>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    isActive
                      ? "bg-[#22c55e]/10 text-[#22c55e]"
                      : "text-gray-700 dark:text-gray-300 hover:bg-[#22c55e]/20 dark:hover:bg-[#22c55e]/10",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                  )}
                >
                  <item.icon
                    className={classNames(
                      isActive
                        ? "text-[#22c55e]"
                        : "text-gray-400 group-hover:text-[#22c55e]",
                      "mr-3 h-6 w-6 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                  {!collapsed && item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="mt-auto px-2 py-4">
            <button
              onClick={handleLogout}
              className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150
                       text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50"
            >
              <LogOut
                className="mr-3 h-6 w-6 flex-shrink-0 text-red-500 group-hover:text-red-600 dark:group-hover:text-red-400"
                aria-hidden="true"
              />
              {!collapsed && "Logout"}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Sidebar with solid white background */}
      <div className="lg:hidden">
        {/* Overlay */}
        <div
          className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${
            mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileOpen(false)}
        ></div>

        {/* Sidebar Drawer */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-black shadow-lg transform transition-transform duration-300 ease-in-out
          flex flex-col ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-[#22c55e] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Admin Panel
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-gray-700 dark:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={classNames(
                    isActive
                      ? "bg-[#22c55e]/10 text-[#22c55e]"
                      : "text-gray-700 dark:text-gray-300 hover:bg-[#22c55e]/20 dark:hover:bg-[#22c55e]/10",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                  )}
                >
                  <item.icon
                    className={classNames(
                      isActive
                        ? "text-[#22c55e]"
                        : "text-gray-400 group-hover:text-[#22c55e]",
                      "mr-3 h-6 w-6 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="px-2 py-4">
            <button
              onClick={handleLogout}
              className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150
                           text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50"
            >
              <LogOut
                className="mr-3 h-6 w-6 flex-shrink-0 text-red-500 group-hover:text-red-600 dark:group-hover:text-red-400"
                aria-hidden="true"
              />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
