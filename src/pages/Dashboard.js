import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { UsersIcon, ShoppingBagIcon, CurrencyDollarIcon, ShoppingCartIcon, UserGroupIcon, ArrowTrendingDownIcon, SparklesIcon } from '@heroicons/react/24/solid';

// Sample data
const salesData = [
  { month: 'Jan', sales: 4000, orders: 240 },
  { month: 'Feb', sales: 3000, orders: 198 },
  { month: 'Mar', sales: 5000, orders: 300 },
  { month: 'Apr', sales: 4500, orders: 278 },
  { month: 'May', sales: 6000, orders: 350 },
  { month: 'Jun', sales: 5500, orders: 325 },
];

const categoryData = [
  { name: 'Electronics', value: 30, color: '#8884d8' },
  { name: 'Clothing', value: 25, color: '#82ca9d' },
  { name: 'Home & Garden', value: 20, color: '#ffc658' },
  { name: 'Sports', value: 15, color: '#ff7300' },
  { name: 'Books', value: 10, color: '#00ff00' },
];

const stats = [
  {
    name: 'Subscription Revenue',
    value: '$45,231',
    change: '+12.5%',
    changeType: 'increase',
    icon: CurrencyDollarIcon, // 💰 represents revenue
  },
  {
    name: 'Active Subscriptions',
    value: '1,329',
    change: '+8.2%',
    changeType: 'increase',
    icon: SparklesIcon, // ✨ represents active/premium feature
  },
  {
    name: 'Total Users',
    value: '2,847',
    change: '+15.3%',
    changeType: 'increase',
    icon: UserGroupIcon, // 👥 group icon for users
  },
  {
    name: 'Churned Users',
    value: '486',
    change: '-2.4%',
    changeType: 'decrease',
    icon: ArrowTrendingDownIcon, // 📉 indicates user drop-off
  },
];


function StatCard({ stat }) {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                {stat.name}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className={`ml-2 flex items-baseline text-sm font-semibold ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {stat.changeType === 'increase' ? (
                    <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownIcon className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                  )}
                  <span className="sr-only">
                    {stat.changeType === 'increase' ? 'Increased' : 'Decreased'} by
                  </span>
                  {stat.change}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Track your subscription growth and user engagement metrics.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.name} stat={stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Overview */}
        {/* <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Monthly Subscription Revenue
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div> */}

        {/* User Categories */}
        {/* <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            User Segmentation
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div> */}

        {/* Subscriptions Chart */}
        {/* <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Monthly Active Subscriptions
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div> */}
      </div>

    </div>
  );
}