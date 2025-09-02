import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { ArrowLeft } from "lucide-react";

const customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 8900', totalSpent: '$2,456.00', currentPlan: { type: 'Monthly', tier: 'Startup' }, joinDate: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 8901', totalSpent: '$1,234.50', currentPlan: { type: 'Yearly', tier: 'Pro' }, joinDate: '2024-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1 234 567 8902', totalSpent: '$567.25', currentPlan: { type: 'Monthly', tier: 'Startup' }, joinDate: '2024-03-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '+1 234 567 8903', totalSpent: '$3,456.75', currentPlan: { type: 'Yearly', tier: 'Growth' }, joinDate: '2023-12-05' },
  { id: 5, name: 'Mark Taylor', email: 'mark.taylor@example.com', phone: '+1 234 567 8904', totalSpent: '$1,876.00', currentPlan: { type: 'Monthly', tier: 'Pro' }, joinDate: '2024-04-22' },
  { id: 6, name: 'Emily Davis', email: 'emily.davis@example.com', phone: '+1 234 567 8905', totalSpent: '$2,050.00', currentPlan: { type: 'Monthly', tier: 'Startup' }, joinDate: '2024-05-01' },
  { id: 7, name: 'Chris Lee', email: 'chris.lee@example.com', phone: '+1 234 567 8906', totalSpent: '$980.00', currentPlan: { type: 'Yearly', tier: 'Startup' }, joinDate: '2024-01-10' },
  { id: 8, name: 'Sarah White', email: 'sarah.white@example.com', phone: '+1 234 567 8907', totalSpent: '$3,210.80', currentPlan: { type: 'Monthly', tier: 'Growth' }, joinDate: '2024-03-15' },
  { id: 9, name: 'Daniel Green', email: 'daniel.green@example.com', phone: '+1 234 567 8908', totalSpent: '$1,234.90', currentPlan: { type: 'Monthly', tier: 'Pro' }, joinDate: '2024-02-28' },
  { id: 10, name: 'Olivia Harris', email: 'olivia.harris@example.com', phone: '+1 234 567 8909', totalSpent: '$4,100.00', currentPlan: { type: 'Yearly', tier: 'Growth' }, joinDate: '2023-11-20' },
  { id: 11, name: 'Liam Walker', email: 'liam.walker@example.com', phone: '+1 234 567 8910', totalSpent: '$745.50', currentPlan: { type: 'Monthly', tier: 'Startup' }, joinDate: '2024-01-03' },
  { id: 12, name: 'Ava Scott', email: 'ava.scott@example.com', phone: '+1 234 567 8911', totalSpent: '$1,980.60', currentPlan: { type: 'Yearly', tier: 'Pro' }, joinDate: '2023-12-22' },
  { id: 13, name: 'Noah Adams', email: 'noah.adams@example.com', phone: '+1 234 567 8912', totalSpent: '$500.00', currentPlan: { type: 'Monthly', tier: 'Startup' }, joinDate: '2024-04-01' },
  { id: 14, name: 'Isabella Nelson', email: 'isabella.nelson@example.com', phone: '+1 234 567 8913', totalSpent: '$3,340.00', currentPlan: { type: 'Yearly', tier: 'Growth' }, joinDate: '2024-02-10' },
  { id: 15, name: 'James Carter', email: 'james.carter@example.com', phone: '+1 234 567 8914', totalSpent: '$2,240.75', currentPlan: { type: 'Monthly', tier: 'Pro' }, joinDate: '2024-03-19' },
  { id: 16, name: 'Mia Mitchell', email: 'mia.mitchell@example.com', phone: '+1 234 567 8915', totalSpent: '$3,150.20', currentPlan: { type: 'Yearly', tier: 'Growth' }, joinDate: '2023-12-29' },
  { id: 17, name: 'Benjamin Perez', email: 'benjamin.perez@example.com', phone: '+1 234 567 8916', totalSpent: '$1,475.90', currentPlan: { type: 'Monthly', tier: 'Pro' }, joinDate: '2024-05-05' },
  { id: 18, name: 'Sophia Roberts', email: 'sophia.roberts@example.com', phone: '+1 234 567 8917', totalSpent: '$2,670.30', currentPlan: { type: 'Yearly', tier: 'Pro' }, joinDate: '2024-01-25' },
  { id: 19, name: 'Elijah Turner', email: 'elijah.turner@example.com', phone: '+1 234 567 8918', totalSpent: '$960.00', currentPlan: { type: 'Monthly', tier: 'Startup' }, joinDate: '2024-04-15' },
  { id: 20, name: 'Charlotte Collins', email: 'charlotte.collins@example.com', phone: '+1 234 567 8919', totalSpent: '$4,890.00', currentPlan: { type: 'Yearly', tier: 'Growth' }, joinDate: '2023-11-10' },
  { id: 21, name: 'Henry Morris', email: 'henry.morris@example.com', phone: '+1 234 567 8920', totalSpent: '$620.00', currentPlan: { type: 'Monthly', tier: 'Startup' }, joinDate: '2024-03-01' },
  { id: 22, name: 'Amelia Rogers', email: 'amelia.rogers@example.com', phone: '+1 234 567 8921', totalSpent: '$2,300.00', currentPlan: { type: 'Yearly', tier: 'Pro' }, joinDate: '2024-01-17' },
  { id: 23, name: 'Lucas Reed', email: 'lucas.reed@example.com', phone: '+1 234 567 8922', totalSpent: '$1,550.00', currentPlan: { type: 'Monthly', tier: 'Pro' }, joinDate: '2024-05-20' },
  { id: 24, name: 'Harper Cook', email: 'harper.cook@example.com', phone: '+1 234 567 8923', totalSpent: '$3,789.00', currentPlan: { type: 'Yearly', tier: 'Growth' }, joinDate: '2023-12-18' },
  { id: 25, name: 'Jack Murphy', email: 'jack.murphy@example.com', phone: '+1 234 567 8924', totalSpent: '$2,905.00', currentPlan: { type: 'Monthly', tier: 'Pro' }, joinDate: '2024-02-01' },
];


const subscriptionHistories = [
  {
    customerId: 1,
    records: [
      { type: 'Monthly', tier: 'Startup', startDate: '2023-10-01', endDate: '2023-11-01' },
      { type: 'Yearly', tier: 'Pro', startDate: '2023-11-01', endDate: '2024-11-01' },
    ]
  },
  {
    customerId: 2,
    records: [
      { type: 'Monthly', tier: 'Startup', startDate: '2023-05-01', endDate: '2023-06-01' },
      { type: 'Yearly', tier: 'Pro', startDate: '2023-06-01', endDate: '2024-06-01' },
    ]
  },
];


export default function SubscriptionsOverview() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [filterPlanType, setFilterPlanType] = useState("");
  const [filterPlanTier, setFilterPlanTier] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can change this number
  const [viewingHistory, setViewingHistory] = useState(false);

  const [historyCustomer, setHistoryCustomer] = useState(null);
  const [historyRecords, setHistoryRecords] = useState([]);

  const handleViewHistory = (customer) => {
    const customerHistory = subscriptionHistories.find(
      (entry) => entry.customerId === customer.id
    );
    setHistoryCustomer(customer);
    setHistoryRecords(customerHistory?.records || []);
    setViewingHistory(true);
  };

  const handleBack = () => {
    setViewingHistory(false);
    setHistoryCustomer(null);
    setHistoryRecords([]);
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPlanType =
      filterPlanType === '' || customer.currentPlan.type === filterPlanType;

    const matchesPlanTier =
      filterPlanTier === '' || customer.currentPlan.tier === filterPlanTier;

    return matchesSearch && matchesPlanType && matchesPlanTier;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterPlanType, filterPlanTier]);

  const [historyPage, setHistoryPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    // Reset page when new customer is selected
    setHistoryPage(1);
  }, [historyRecords]);

  const startIndex = (historyPage - 1) * rowsPerPage;
  const paginatedHistory = historyRecords.slice(startIndex, startIndex + rowsPerPage);

  const historyTotalPages = Math.ceil(historyRecords.length / rowsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Subscription Overview
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monitor and manage your users’ active plans and subscription details
          </p>
        </div>
      </div>

      {viewingHistory ? (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold dark:text-white">
              <span style={{ color: '#4F46E5' }}>
                {historyCustomer?.name}
              </span>
              's Subscription History
            </h3>

            <div className="mb-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm transition-all
    bg-[#EEF2FF] text-[#4F46E5] hover:bg-[#E0E7FF]
    dark:bg-[#1E1B4B] dark:text-[#A5B4FC] dark:hover:bg-[#312E81]"
              >
                <ArrowLeft size={18} />
                <span>Back to Customers</span>
              </button>
            </div>

          </div>

          {/* Subscription History Table */}
          <div className="mt-4 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Plan Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    End Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {/* Replace below with real history data */}
                {paginatedHistory.map((plan, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{plan.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{plan.tier}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{plan.startDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{plan.endDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end p-4">
              <div className="inline-flex items-center gap-3">
                <button
                  onClick={() => setHistoryPage(prev => Math.max(prev - 1, 1))}
                  disabled={historyPage === 1}
                  className="px-3 py-1 rounded border text-sm transition-colors
        border-gray-300 text-gray-700 hover:bg-gray-100
        dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800
        disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Page <strong>{historyPage}</strong> of <strong>{historyTotalPages}</strong>
                </span>

                <button
                  onClick={() => setHistoryPage(prev => Math.min(prev + 1, historyTotalPages))}
                  disabled={historyPage === historyTotalPages}
                  className="px-3 py-1 rounded border text-sm transition-colors
        border-gray-300 text-gray-700 hover:bg-gray-100
        dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800
        disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>


          </div>
        </>
      ) : (
        <>
          {/* Search and filters */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
              {/* Search */}
              <div className="relative w-full sm:max-w-md">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Filter */}
              <div className="relative w-full sm:w-48">
                <select
                  value={filterPlanType}
                  onChange={(e) => setFilterPlanType(e.target.value)}
                  className="block w-full appearance-none px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Types</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>


                {/* Custom dropdown arrow */}
                <svg
                  className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              <div className="relative w-full sm:w-48">
                <select
                  value={filterPlanTier}
                  onChange={(e) => setFilterPlanTier(e.target.value)}
                  className="block w-full appearance-none px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Tiers</option>
                  <option value="Startup">Startup</option>
                  <option value="Growth">Growth</option>
                  <option value="Pro">Pro</option>
                </select>
                <svg
                  className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

            </div>
          </div>

          {/* Customers table */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Plan Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Plan Tier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    History
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {currentCustomers.map((customer) => (

                  <tr
                    key={customer.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {customer.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {customer.email}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {customer.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {customer.totalSpent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full 
    ${customer.currentPlan.type === "Monthly"
                            ? "bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-100"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-100"
                          }`}
                      >
                        {customer.currentPlan.type}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full 
    ${customer.currentPlan.tier === "Startup"
                            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100"
                            : customer.currentPlan.tier === "Growth"
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100"
                              : "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-100"
                          }`}
                      >
                        {customer.currentPlan.tier}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewHistory(customer)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        View History
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end p-4">
              <div className="inline-flex items-center space-x-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded border text-sm transition-colors
        border-gray-300 text-gray-700 hover:bg-gray-100
        dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800
        disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                </span>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded border text-sm transition-colors
        border-gray-300 text-gray-700 hover:bg-gray-100
        dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800
        disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>


          </div>
        </>
      )}
    </div>
  );
}
