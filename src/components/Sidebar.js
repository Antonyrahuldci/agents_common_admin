import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  CreditCardIcon,
  UserGroupIcon,
  RectangleGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  LayoutDashboard,
  FileClock,
  LogOut, // ✅ Changed from Power to LogOut
} from "lucide-react";
import { pageRoutes } from "../routes/pageRoutes";

const navigation = [
  // {
  //   name: "Dashboard",
  //   href: pageRoutes?.dashboard,
  //   icon: RectangleGroupIcon,
  // },
  {
    name: "Allowed Users",
    href: pageRoutes?.dashboard,
    icon: UserGroupIcon,
  },
  // {
  //   name: "Subscription Overview",
  //   href: "/subscription-overview",
  //   icon: CreditCardIcon,
  // },
  // {
  //   name: "Customers",
  //   href: "/customers",
  //   icon: UserGroupIcon, // shows a group of users
  // },
  // {
  //   name: 'Subscriptions',
  //   href: '/subscriptions',
  //   icon: FileClock,
  // },
  // {
  //   name: 'Settings',
  //   href: '/settings',
  //   icon: Cog6ToothIcon,
  // },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ collapsed }) {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("access-token");
    window.location.reload();
  };

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out`}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
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
                    ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                )}
              >
                <item.icon
                  className={classNames(
                    isActive
                      ? "text-indigo-500 dark:text-indigo-400"
                      : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300",
                    "mr-3 h-6 w-6 flex-shrink-0"
                  )}
                  aria-hidden="true"
                />
                {!collapsed && item.name}
              </Link>
            );
          })}
        </nav>

        {/* ✅ Logout Button fixed at bottom */}
        <div className="mt-auto px-2 py-4">
          <button
            onClick={handleLogout}
            className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150
                     text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50"
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
  );
}
