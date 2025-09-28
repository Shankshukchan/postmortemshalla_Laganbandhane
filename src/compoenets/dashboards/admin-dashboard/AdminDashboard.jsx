
import React, { useState } from "react";

const NAV_ITEMS = [
  { key: "analytics", label: "Analytics" },
  { key: "templates", label: "Templates" },
  { key: "users", label: "Users" },
  { key: "transactions", label: "Transactions" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("analytics");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8 text-blue-700">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`text-left px-4 py-2 rounded transition font-medium ${
                activeTab === item.key
                  ? "bg-blue-600 text-white shadow"
                  : "hover:bg-blue-100 text-gray-700"
              }`}
              onClick={() => setActiveTab(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
        <section className="bg-white rounded-lg shadow p-6 min-h-[400px]">
          {activeTab === "analytics" && <AnalyticsSection />}
          {activeTab === "templates" && <TemplatesSection />}
          {activeTab === "users" && <UsersSection />}
          {activeTab === "transactions" && <TransactionsSection />}
        </section>
      </main>
    </div>
  );
};

// Placeholder components for each section
const AnalyticsSection = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Website Analytics</h2>
    {/* Stats and charts will go here */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-blue-50 rounded shadow p-4">Total Users: <span className="font-bold">--</span></div>
      <div className="bg-blue-50 rounded shadow p-4">Templates Downloaded: <span className="font-bold">--</span></div>
      <div className="bg-blue-50 rounded shadow p-4">Most Popular Template: <span className="font-bold">--</span></div>
    </div>
    <div className="h-48 flex items-center justify-center text-gray-400">[Analytics charts here]</div>
  </div>
);

const TemplatesSection = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Manage Templates</h2>
    <div className="mb-4 flex gap-2">
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Template</button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Create Category</button>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2 border">Type</th>
            <th className="px-4 py-2 border">Photo</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row */}
          <tr>
            <td className="px-4 py-2 border">Template 1</td>
            <td className="px-4 py-2 border">With Photo</td>
            <td className="px-4 py-2 border">Custom</td>
            <td className="px-4 py-2 border">[img]</td>
            <td className="px-4 py-2 border flex gap-2">
              <button className="bg-yellow-400 px-2 py-1 rounded">Edit</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const UsersSection = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Users</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr>
            <th className="px-4 py-2 border">User ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row */}
          <tr>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">Admin User</td>
            <td className="px-4 py-2 border">admin@email.com</td>
            <td className="px-4 py-2 border">
              <button className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const TransactionsSection = () => {
  const [visibleCount, setVisibleCount] = React.useState(50);
  // Example data
  const transactions = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    user: `User${i + 1}`,
    template: `Template${(i % 5) + 1}`,
    amount: (Math.random() * 100).toFixed(2),
    date: `2025-09-${(i % 30) + 1}`,
  })).reverse();

  const handleSeeMore = () => setVisibleCount((prev) => prev + 10);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">User</th>
              <th className="px-4 py-2 border">Template</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, visibleCount).map((txn) => (
              <tr key={txn.id}>
                <td className="px-4 py-2 border">{txn.id}</td>
                <td className="px-4 py-2 border">{txn.user}</td>
                <td className="px-4 py-2 border">{txn.template}</td>
                <td className="px-4 py-2 border">₹{txn.amount}</td>
                <td className="px-4 py-2 border">{txn.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visibleCount < transactions.length && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={handleSeeMore}
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
