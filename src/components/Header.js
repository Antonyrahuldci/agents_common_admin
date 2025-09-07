import React from "react";
import { Bars3Icon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function Header({
  onToggleDarkMode,
  darkMode,
  onToggleSidebar,
}) {
  return (
    <header className="bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side: Hamburger and Title */}
          <div className="flex items-center">
            {/* ✅ Hamburger Button (mobile only) */}
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-md text-gray-700 dark:text-white hover:bg-[#22c55e]/10 dark:hover:bg-[#22c55e]/20 transition-colors"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            <h1 className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">
              Simbli Admin
            </h1>
          </div>

          {/* Right side: Dark Mode Toggle */}
          {/* <div className="flex items-center space-x-4">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-md text-gray-400 hover:text-[#22c55e] dark:hover:text-[#22c55e] transition-colors"
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>
          </div> */}
        </div>
      </div>
    </header>
  );
}
