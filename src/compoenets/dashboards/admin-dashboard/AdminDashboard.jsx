import React, { useState, useEffect } from "react";

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
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Admin Dashboard
        </h1>
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
      <div className="bg-blue-50 rounded shadow p-4">
        Total Users: <span className="font-bold">--</span>
      </div>
      <div className="bg-blue-50 rounded shadow p-4">
        Templates Downloaded: <span className="font-bold">--</span>
      </div>
      <div className="bg-blue-50 rounded shadow p-4">
        Most Popular Template: <span className="font-bold">--</span>
      </div>
    </div>
    <div className="h-48 flex items-center justify-center text-gray-400">
      [Analytics charts here]
    </div>
  </div>
);

const TemplatesSection = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Manage Templates</h2>
    <div className="mb-4 flex gap-2">
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Add Template
      </button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Create Category
      </button>
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
              <button className="bg-red-500 text-white px-2 py-1 rounded">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        // Prefer VITE_API_URL when available, otherwise default to localhost backend
        const apiBase =
          (import.meta.env && import.meta.env.VITE_API_URL) ||
          "http://localhost:8000";
        const res = await fetch(`${apiBase}/api/users`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        // Safely parse the response: handle non-JSON bodies (HTML/error pages) gracefully
        const contentType = res.headers.get("content-type") || "";
        let payload = null;
        if (contentType.includes("application/json")) {
          try {
            payload = await res.json();
          } catch (parseErr) {
            const text = await res.text();
            throw new Error(
              `Invalid JSON response (status ${res.status}): ${text.slice(
                0,
                200
              )}`
            );
          }
        } else {
          // Non-JSON response (could be HTML from Vite dev server or an error page)
          const text = await res.text();
          const snippet = text.slice(0, 200);
          if (contentType.includes("text/html")) {
            throw new Error(
              `Unexpected HTML response (status ${res.status}). This often means the request hit the frontend dev server (index.html) instead of the backend API. Check that your backend is running and that VITE_API_URL is set if using a different port. Response snippet: ${snippet}`
            );
          }
          throw new Error(
            `Unexpected response (status ${res.status}): ${snippet}`
          );
        }

        if (!res.ok) {
          throw new Error(
            payload?.message || `Failed to fetch users (status ${res.status})`
          );
        }

        setUsers(payload.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message || "Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggle = (id) => setExpanded((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Users</h2>

      {loading && <div className="mb-4">Loading users...</div>}
      {error && <div className="mb-4 text-red-600">{error}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr>
              <th className="px-4 py-2 border">User ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Joined</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-600">
                  No users found.
                </td>
              </tr>
            )}

            {users.slice(0, visibleCount).map((u) => (
              <React.Fragment key={u._id}>
                <tr>
                  <td className="px-4 py-2 border">{u._id}</td>
                  <td className="px-4 py-2 border">{u.FullName || "-"}</td>
                  <td className="px-4 py-2 border">{u.email || "-"}</td>
                  <td className="px-4 py-2 border">
                    {u.createdAt ? new Date(u.createdAt).toLocaleString() : "-"}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => toggle(u._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      {expanded[u._id] ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>

                {expanded[u._id] && (
                  <tr>
                    <td colSpan={5} className="px-4 py-4 border bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="font-semibold">Birthdate</div>
                          <div>{u.birthdate || "-"}</div>
                        </div>
                        <div>
                          <div className="font-semibold">Caste</div>
                          <div>{u.caste || "-"}</div>
                        </div>
                        <div>
                          <div className="font-semibold">Religion</div>
                          <div>{u.religion || "-"}</div>
                        </div>
                        <div>
                          <div className="font-semibold">Age</div>
                          <div>{u.age ?? "-"}</div>
                        </div>
                        <div>
                          <div className="font-semibold">Marriage Status</div>
                          <div>{u.marriageStatus || "-"}</div>
                        </div>
                        <div>
                          <div className="font-semibold">Profile Image</div>
                          <div>
                            {u.profileImage ? (
                              <img
                                src={`/uploads/${u.profileImage}`}
                                alt="profile"
                                className="w-24 h-24 object-cover rounded"
                              />
                            ) : (
                              "-"
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {users.length > visibleCount && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={() => setVisibleCount((prev) => prev + 10)}
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

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
