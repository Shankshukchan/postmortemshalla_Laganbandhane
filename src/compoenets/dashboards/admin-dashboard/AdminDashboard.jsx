import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const NAV_ITEMS = [
  { key: "analytics", label: "Analytics" },
  { key: "templates", label: "Templates" },
  { key: "users", label: "Users" },
  { key: "transactions", label: "Transactions" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("analytics");
  const navigate = useNavigate();

  const handleAdminLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("user");
    } catch (e) {
      // ignore
    }
    // Redirect to login page after logout
    navigate("/login");
  };

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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <div>
            <button
              onClick={handleAdminLogout}
              className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
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

// Analytics section: fetch backend data and compute simple metrics
const AnalyticsSection = () => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [totalUsers, setTotalUsers] = React.useState(null);
  const [templatesCount, setTemplatesCount] = React.useState(null);
  const [templatesDownloaded, setTemplatesDownloaded] = React.useState(null);
  const [mostPopularTemplate, setMostPopularTemplate] = React.useState("--");

  React.useEffect(() => {
    const apiBase =
      (import.meta.env && import.meta.env.VITE_API_URL) ||
      "http://localhost:8000";

    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // Users: admin-only endpoint
        const usersRes = await fetch(`${apiBase}/api/users`, { headers });
        if (!usersRes.ok)
          throw new Error(`Failed to fetch users: ${usersRes.status}`);
        const usersJson = await usersRes.json();
        const users = usersJson.data || [];
        setTotalUsers(Array.isArray(users) ? users.length : 0);

        // Templates: admin-only endpoint
        const tplRes = await fetch(`${apiBase}/api/templates`, { headers });
        if (!tplRes.ok)
          throw new Error(`Failed to fetch templates: ${tplRes.status}`);
        const tplJson = await tplRes.json();
        const templates = tplJson.data || [];
        setTemplatesCount(Array.isArray(templates) ? templates.length : 0);

        // Try to fetch transactions to compute downloads/popularity. If endpoint missing, fall back.
        try {
          const txRes = await fetch(`${apiBase}/api/transactions`, { headers });
          if (txRes.ok) {
            const txJson = await txRes.json();
            const txs = txJson.data || [];
            // Count template-like items (best-effort) and find most common item
            const freq = {};
            let downloads = 0;
            txs.forEach((t) => {
              const item = t.item || "";
              // Heuristic: consider any transaction item that mentions 'Template' or matches a template name
              if (
                item.toLowerCase().includes("template") ||
                templates.find((x) => x.name === item)
              ) {
                downloads += 1;
                freq[item] = (freq[item] || 0) + 1;
              }
            });
            setTemplatesDownloaded(downloads);
            const most = Object.keys(freq).sort((a, b) => freq[b] - freq[a])[0];
            setMostPopularTemplate(most || "--");
          } else {
            // No transactions endpoint: use best-effort fallback
            setTemplatesDownloaded("N/A");
            setMostPopularTemplate("--");
          }
        } catch (innerErr) {
          // Transactions endpoint may not exist; silently fallback
          setTemplatesDownloaded("N/A");
          setMostPopularTemplate("--");
        }
      } catch (err) {
        console.error("Analytics load error", err);
        setError(err.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Website Analytics</h2>
      {loading ? (
        <div className="text-sm text-gray-600">Loading analytics...</div>
      ) : error ? (
        <div className="text-sm text-red-600">Error: {error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded shadow p-4">
              Total Users:{" "}
              <span className="font-bold">{totalUsers ?? "--"}</span>
            </div>
            <div className="bg-blue-50 rounded shadow p-4">
              Templates:{" "}
              <span className="font-bold">{templatesCount ?? "--"}</span>
            </div>
            <div className="bg-blue-50 rounded shadow p-4">
              Templates Downloaded:{" "}
              <span className="font-bold">{templatesDownloaded ?? "--"}</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-600">Most Popular Template</div>
            <div className="text-lg font-semibold">{mostPopularTemplate}</div>
          </div>

          <div className="h-48 flex items-center justify-center text-gray-400">
            {/* Placeholder for charts; could wire in Chart.js later */}
            <div className="text-center">
              <div className="text-sm">Charting coming soon</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const TemplatesSection = () => {
  const [files, setFiles] = React.useState([]);
  const [fileInput, setFileInput] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [assetCategory, setAssetCategory] = React.useState("border");

  const apiBase =
    (import.meta.env && import.meta.env.VITE_API_URL) ||
    "http://localhost:8000";

  const ensureAdminToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      swal("Not authorized", "Please sign in as admin to continue.", "warning");
      navigate("/login");
      throw new Error("No admin token");
    }
    return token;
  };

  const fetchFiles = async (category = "") => {
    try {
      setLoading(true);
      const token = ensureAdminToken();
      const q = category ? `?category=${encodeURIComponent(category)}` : "";
      const res = await fetch(`${apiBase}/api/assets${q}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401 || res.status === 403) {
        swal("Session expired", "Please sign in again as admin.", "warning");
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        navigate("/login");
        return;
      }
      const contentType = res.headers.get("content-type") || "";
      const json = contentType.includes("application/json")
        ? await res.json()
        : null;
      if (!res.ok) {
        const msg =
          json?.message || `Failed to list assets (status ${res.status})`;
        throw new Error(msg);
      }
      setFiles(json.data || []);
    } catch (err) {
      console.error("fetchFiles", err);
      setError(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchFiles(assetCategory);
  }, [assetCategory]);

  // --- Template records management ---
  const [templates, setTemplates] = React.useState([]);
  const [tplName, setTplName] = React.useState("");
  const [tplCategory, setTplCategory] = React.useState("general");
  const [tplType, setTplType] = React.useState("image");

  const fetchTemplates = async () => {
    try {
      const token = ensureAdminToken();
      const res = await fetch(`${apiBase}/api/templates`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401 || res.status === 403) {
        swal("Session expired", "Please sign in again as admin.", "warning");
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        navigate("/login");
        return;
      }
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Failed to load templates");
      setTemplates(json.data || []);
    } catch (err) {
      console.error("fetchTemplates", err);
      setError(err.message || "Error loading templates");
    }
  };

  React.useEffect(() => {
    fetchTemplates();
  }, []);

  const handleCreateTemplate = async (e) => {
    e.preventDefault();
    try {
      const token = ensureAdminToken();
      const res = await fetch(`${apiBase}/api/templates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: tplName,
          category: tplCategory,
          type: tplType,
        }),
      });
      if (res.status === 401 || res.status === 403) {
        swal("Session expired", "Please sign in again as admin.", "warning");
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        navigate("/login");
        return;
      }
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Create template failed");
      setTplName("");
      await fetchTemplates();
    } catch (err) {
      console.error("create template", err);
      setError(err.message || "Template create error");
    }
  };

  const handleDeleteTemplate = async (id) => {
    if (!confirm("Delete template?")) return;
    try {
      const token = ensureAdminToken();
      const res = await fetch(`${apiBase}/api/templates/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401 || res.status === 403) {
        swal("Session expired", "Please sign in again as admin.", "warning");
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        navigate("/login");
        return;
      }
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Delete failed");
      await fetchTemplates();
    } catch (err) {
      console.error("delete template", err);
      setError(err.message || "Template delete error");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!fileInput) return;
    const form = new FormData();
    form.append("file", fileInput);
    form.append("category", assetCategory);
    try {
      setLoading(true);
      const token = ensureAdminToken();
      const res = await fetch(`${apiBase}/api/assets`, {
        method: "POST",
        body: form,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401 || res.status === 403) {
        swal("Session expired", "Please sign in again as admin.", "warning");
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        navigate("/login");
        return;
      }
      const contentType = res.headers.get("content-type") || "";
      const json = contentType.includes("application/json")
        ? await res.json()
        : null;
      if (!res.ok)
        throw new Error(
          json?.message || `Upload failed (status ${res.status})`
        );
      // refresh list
      await fetchFiles(assetCategory);
      // Notify editor via localStorage event (simple cross-tab update)
      localStorage.setItem("media_updated_at", Date.now().toString());
      setFileInput(null);
      e.target.reset();
    } catch (err) {
      console.error("upload", err);
      setError(err.message || "Upload error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this asset?")) return;
    try {
      setLoading(true);
      const token = ensureAdminToken();
      const res = await fetch(`${apiBase}/api/assets/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401 || res.status === 403) {
        swal("Session expired", "Please sign in again as admin.", "warning");
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        navigate("/login");
        return;
      }
      const json = await res.json();
      if (!res.ok)
        throw new Error(
          json?.message || `Delete failed (status ${res.status})`
        );
      await fetchFiles(assetCategory);
      localStorage.setItem("media_updated_at", Date.now().toString());
    } catch (err) {
      console.error("delete", err);
      setError(err.message || "Delete error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Templates & Media</h2>
      <div className="mb-4">
        <form onSubmit={handleUpload} className="flex gap-2 items-center">
          <select
            value={assetCategory}
            onChange={(e) => setAssetCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="border">Border</option>
            <option value="adminPhoto">Admin Photo</option>
            <option value="font">Font</option>
            <option value="misc">Misc</option>
          </select>
          <input
            type="file"
            accept="*/*"
            onChange={(e) => setFileInput(e.target.files[0])}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            type="submit"
          >
            Upload
          </button>
        </form>
        {loading && (
          <div className="text-sm text-gray-600 mt-2">Working...</div>
        )}
        {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {files.map((f) => (
          <div key={f._id} className="bg-white p-3 rounded shadow">
            <img
              src={
                f.url && f.url.startsWith("/")
                  ? `${
                      (import.meta.env && import.meta.env.VITE_API_URL) ||
                      "http://localhost:8000"
                    }${f.url}`
                  : f.url
              }
              alt={f.originalName || f.filename}
              className="w-full h-36 object-cover rounded mb-2"
            />
            <div className="text-sm text-gray-700">
              {f.originalName || f.filename}
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => navigator.clipboard.writeText(f.url)}
                className="px-2 py-1 bg-blue-100 rounded"
              >
                Copy URL
              </button>
              <button
                onClick={() => handleDelete(f._id)}
                className="px-2 py-1 bg-red-100 text-red-700 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Template Records</h3>
        <form
          onSubmit={handleCreateTemplate}
          className="flex gap-2 items-center mb-4"
        >
          <input
            value={tplName}
            onChange={(e) => setTplName(e.target.value)}
            placeholder="Template name"
            className="border p-2 rounded"
          />
          <select
            value={tplCategory}
            onChange={(e) => setTplCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="general">General</option>
            <option value="border">Border</option>
            <option value="layout">Layout</option>
          </select>
          <select
            value={tplType}
            onChange={(e) => setTplType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="image">Image</option>
            <option value="layout">Layout</option>
          </select>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            type="submit"
          >
            Create
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((t) => (
            <div
              key={t._id}
              className="bg-white p-3 rounded shadow flex items-center justify-between"
            >
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-gray-500">
                  {t.category} • {t.type}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDeleteTemplate(t._id)}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

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
        const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";
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

  // Base URL for uploaded files (match backend host). Prefer VITE_API_URL if set.
  const uploadsBase =
    (
      (import.meta.env && import.meta.env.VITE_API_URL) ||
      "http://localhost:8000"
    )
      .toString()
      .replace(/\/$/, "") + "/uploads";

  const getProfileImageSrc = (img) => {
    if (!img) return null;
    // If it's already an absolute URL or data URI or starts with slash, use as-is
    if (
      typeof img === "string" &&
      (img.startsWith("data:") ||
        img.startsWith("http://") ||
        img.startsWith("https://") ||
        img.startsWith("/"))
    ) {
      return img;
    }
    // Otherwise build from uploads base and encode the filename
    return `${uploadsBase}/${encodeURIComponent(img)}`;
  };

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
                                src={getProfileImageSrc(u.profileImage)}
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
