import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import apiFunctions from "../api/apiFunctions";
import { useEffect, useRef, useState } from "react";

// New sample user data to populate the table and stats card
const userData = [
  { id: 1, email: "john.doe@example.com", joinedDate: "2023-01-15" },
  { id: 2, email: "jane.smith@example.com", joinedDate: "2023-02-20" },
  { id: 3, email: "peter.jones@example.com", joinedDate: "2023-03-10" },
  { id: 4, email: "susan.davis@example.com", joinedDate: "2023-04-05" },
  { id: 5, email: "mike.brown@example.com", joinedDate: "2023-05-25" },
  { id: 6, email: "alice.williams@example.com", joinedDate: "2023-06-01" },
  { id: 7, email: "bob.anderson@example.com", joinedDate: "2023-06-10" },
  { id: 8, email: "charlie.wilson@example.com", joinedDate: "2023-07-18" },
  { id: 9, email: "diana.lee@example.com", joinedDate: "2023-08-03" },
  { id: 10, email: "frank.miller@example.com", joinedDate: "2023-09-12" },
  { id: 11, email: "grace.taylor@example.com", joinedDate: "2023-10-21" },
  { id: 12, email: "henry.clark@example.com", joinedDate: "2023-11-08" },
  { id: 13, email: "isabelle.hill@example.com", joinedDate: "2023-12-30" },
  { id: 14, email: "jack.evans@example.com", joinedDate: "2024-01-05" },
  { id: 15, email: "kathy.green@example.com", joinedDate: "2024-02-14" },
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
                <div
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.changeType === "increase"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.changeType === "increase" ? (
                    <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownIcon className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                  )}
                  <span className="sr-only">
                    {stat.changeType === "increase" ? "Increased" : "Decreased"}{" "}
                    by
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

export default function SimbliDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("users", users);

  const isFetched = useRef(false);

  const getInitialData = async () => {
    try {
      const res = await apiFunctions.getSubscribers();
      console.log("Initial Data", res);
      if (
        res?.status === 200 &&
        res?.data?.data &&
        Array.isArray(res.data.data)
      ) {
        setUsers(res.data.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isFetched.current) {
      getInitialData();
      isFetched.current = true;
    }
  }, []);

  // We'll dynamically create the stats array based on the user data count.
  const stats = [
    {
      name: "Total Users",
      value: users.length.toLocaleString(),
      //   change: "+15.3%", // Optional dynamic logic
      changeType: "increase",
      icon: UserGroupIcon,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Track your user growth.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.name} stat={stat} />
        ))}
      </div>

      {/* Users List Table */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-5 py-6 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Recent Users
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              A list of all users who have recently joined.
            </p>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <div className="px-4 py-5 sm:p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        S.No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Joined Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {users.map((user, index) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(user.created_at).toLocaleString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })}
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && !loading && (
                      <tr>
                        <td
                          colSpan={2}
                          className="text-center py-4 text-gray-500 dark:text-gray-400"
                        >
                          No users found.
                        </td>
                      </tr>
                    )}
                    {loading && (
                      <tr>
                        <td
                          colSpan={2}
                          className="text-center py-4 text-gray-500 dark:text-gray-400"
                        >
                          Loading users...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
