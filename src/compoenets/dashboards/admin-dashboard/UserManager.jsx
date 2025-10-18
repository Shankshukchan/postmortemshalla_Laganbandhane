import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

// Admin user manager - fetches users from backend and displays them.
const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [visibleCount] = useState(Number.POSITIVE_INFINITY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/users", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.data && res.data.data) {
          setUsers(res.data.data);
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(
          err?.response?.data?.message || err.message || "Error fetching users"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // show all users by default; no pagination
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState({});

  const filtered = useMemo(() => {
    if (!query.trim()) return users;
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      return (
        (u.FullName || "").toLowerCase().includes(q) ||
        (u.email || "").toLowerCase().includes(q) ||
        (u.caste || "").toLowerCase().includes(q) ||
        (u.religion || "").toLowerCase().includes(q)
      );
    });
  }, [users, query]);

  const toggleExpand = (id) => setExpanded((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, caste or religion"
            className="border rounded px-3 py-2 w-64"
          />
          <div className="text-sm text-gray-600">Total: {users.length}</div>
        </div>
      </div>

      {loading && <div>Loading users...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && users.length === 0 && !error && <div>No users found.</div>}

      {filtered.length > 0 && (
        <div className="space-y-4">
          {filtered.map((u) => (
            <div key={u._id} className="bg-white p-4 rounded shadow">
              <div className="flex items-center gap-4">
                <img
                  src={
                    u.profileImage
                      ? `/uploads/${u.profileImage}`
                      : "/images/profile.jpg"
                  }
                  alt={u.FullName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold">{u.FullName || u.email}</div>
                  <div className="text-sm text-gray-600">{u.email}</div>
                  <div className="text-xs text-gray-500">
                    Joined:{" "}
                    {u.createdAt ? new Date(u.createdAt).toLocaleString() : "-"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleExpand(u._id)}
                    className="px-3 py-1 bg-gray-100 rounded"
                  >
                    {expanded[u._id] ? "Hide" : "Details"}
                  </button>
                </div>
              </div>

              {expanded[u._id] && (
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-700">
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
                    <div className="font-semibold">Last Updated</div>
                    <div>
                      {u.updatedAt
                        ? new Date(u.updatedAt).toLocaleString()
                        : "-"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Showing all users */}
        </div>
      )}
    </div>
  );
};

export default UserManager;
