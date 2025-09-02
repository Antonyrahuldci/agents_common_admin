import React from 'react';
import { Bars3Icon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function Header({ onToggleDarkMode, darkMode, onToggleSidebar }) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onToggleSidebar}
              className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-md"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <h1 className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">
              Simbli Admin
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-md transition-colors"
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>
            
            {/* <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-indigo-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">AD</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
}