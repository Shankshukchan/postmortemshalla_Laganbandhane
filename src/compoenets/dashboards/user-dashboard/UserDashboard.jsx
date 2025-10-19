import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../../LanguageContext";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

import ProfileSidebar from "./ProfileSidebar";
import { UserContext } from "../../../UserContext";
import PurchasesList from "./PurchasesList";
import TransactionsList from "./TransactionsList";
import PurchasedTemplates from "./PurchasedTemplates";

const imageUrl = import.meta.env.VITE_PROFILE_IMAGE;
const profileFetchUrl = import.meta.env.VITE_PROFILE_FETCH_URL;

const UserDashboard = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  // Demo data (can be replaced with backend data)
  const [purchases] = useState([
    { id: 1, item: "Premium Template", date: "2025-09-20", amount: 499 },
    { id: 2, item: "Consultation", date: "2025-09-15", amount: 999 },
    { id: 3, item: "Consultation", date: "2025-09-15", amount: 999 },
  ]);

  const [transactions] = useState([
    { id: 1, type: "Credit", date: "2025-09-20", amount: 499 },
    { id: 2, type: "Debit", date: "2025-09-15", amount: 999 },
  ]);

  const [purchasedTemplates] = useState([
    {
      id: 1,
      title: "Royal Wedding Invite",
      description: "Elegant gold and maroon wedding invitation template.",
      date: "2025-09-20",
      image: "/images/banner.png",
    },
    {
      id: 2,
      title: "Modern Engagement Card",
      description: "Minimalist engagement card with floral accents.",
      date: "2025-09-10",
      image: "/images/leaf.png",
    },
    {
      id: 3,
      title: "Royal Wedding Invite",
      description: "Elegant gold and maroon wedding invitation template.",
      date: "2025-09-20",
      image: "/images/banner.png",
    },
  ]);

  // Profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    birthdate: "",
    caste: "",
    religion: "",
    age: "",
    marriageStatus: "Single",
    userId: localStorage.getItem("userId") || "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // for sidebar remount

  // Utility to normalize image paths
  const normalizeImagePath = (src) => {
    if (!src) return null;
    try {
      const s = String(src);
      if (
        s.startsWith("data:") ||
        s.startsWith("http://") ||
        s.startsWith("https://") ||
        s.startsWith("blob:")
      )
        return s;
      const normalized = s.replace(/\\\\/g, "/");
      if (normalized.startsWith("/uploads/")) return encodeURI(normalized);
      if (normalized.includes("/uploads/")) {
        return encodeURI(normalized.slice(normalized.indexOf("/uploads/")));
      }
      const parts = normalized.split("/");
      const basename = parts[parts.length - 1] || normalized;
      return encodeURI(`/uploads/${basename}`);
    } catch (e) {
      return src;
    }
  };

  // Fetch Profile Function (can be called multiple times)
  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      const token = localStorage.getItem("token");

      const res = await axios.get(`${profileFetchUrl}?userId=${userId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.data && res.data.success && res.data.data) {
        const data = res.data.data;

        setProfile({
          name: data.FullName || "",
          email: data.email || "",
          birthdate: data.birthdate || "",
          caste: data.caste || "",
          religion: data.religion || "",
          age: data.age || "",
          marriageStatus: data.marriageStatus || "Single",
          userId: userId,
        });

        if (data.profileImage) {
          let backendOrigin = "";
          try {
            backendOrigin = new URL(profileFetchUrl).origin;
          } catch (e) {
            backendOrigin = import.meta.env.VITE_BACKEND_BASE || "";
          }

          const imageRes = await fetch(
            `${backendOrigin}/api/profile-image/${userId}`,
            { headers: token ? { Authorization: `Bearer ${token}` } : {} }
          );

          if (imageRes.ok) {
            const blob = await imageRes.blob();
            const url = URL.createObjectURL(blob);
            setProfileImage(url);
            localStorage.setItem(
              "user",
              JSON.stringify({ ...data, image: url })
            );
          } else {
            const normalized = normalizeImagePath(data.profileImage || null);
            setProfileImage(normalized);
            localStorage.setItem(
              "user",
              JSON.stringify({ ...data, image: normalized || "" })
            );
          }
        } else {
          const normalized = normalizeImagePath(null);
          setProfileImage(normalized);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...data, image: normalized || "" })
          );
        }
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  };

  // Load stored image from localStorage first
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        const storedImage = parsed.image || parsed.profileImage || null;
        if (storedImage) {
          setProfileImage(normalizeImagePath(storedImage));
        }
      }
    } catch (e) {}
  }, []);

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "profileImage") {
      const file = e.target.files[0];
      if (file) {
        try {
          setProfileImage(URL.createObjectURL(file));
        } catch {
          setProfileImage(null);
        }
        setImageFile(file);
      }
    } else {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", profile.userId);
    formData.append("FullName", profile.name);
    formData.append("email", profile.email);
    formData.append("birthdate", profile.birthdate);
    formData.append("caste", profile.caste);
    formData.append("religion", profile.religion);
    formData.append("age", profile.age);
    formData.append("marriageStatus", profile.marriageStatus);
    if (imageFile) {
      formData.append("profileImage", imageFile);
    }

    try {
      setUploading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(imageUrl, formData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const data = res.data;
      if (data.success) {
        swal({
          title: t.profileUpdateSuccess,
          icon: "success",
          buttons: false,
          timer: 800,
        }).then(() => {
          fetchProfile(); // 👈 auto reload after swal closes
          setRefreshKey((prev) => prev + 1); // force sidebar rerender if needed
        });

        // Update user image globally
        if (userContext && typeof userContext.updateUserImage === "function") {
          userContext.updateUserImage(profileImage);
        }
      } else {
        swal({ title: data.message || t.profileUpdateFailed, icon: "error" });
      }
    } catch (err) {
      console.error("Profile update error:", err);
      swal({ title: t.profileUpdateError, icon: "error" });
    } finally {
      setUploading(false);
      setImageFile(null);
    }
  };

  const { t } = useContext(LanguageContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#FDF6EC] p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar/Profile */}
        <ProfileSidebar
          key={refreshKey}
          profile={profile}
          profileImage={profileImage}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          uploading={uploading}
        />
        {/* Main Content */}
        <div className="md:col-span-2 flex flex-col gap-8">
          <button
            className="bg-[#6E1E1E] text-white px-4 py-2 rounded-lg self-end mb-4 hover:bg-[#D4AF37] hover:text-[#6E1E1E] font-semibold"
            onClick={() => {
              // Clear localStorage and context
              localStorage.clear();
              if (userContext && typeof userContext.setUser === "function") {
                userContext.setUser({
                  isLoggedIn: false,
                  image: "/images/profile.jpg",
                });
              }
              // Navigate to home page
              navigate("/");
              setTimeout(() => {
                if (window.location.pathname === "/") {
                  window.location.reload();
                }
              }, 500);
            }}
          >
            {t.logout}
          </button>
          <PurchasedTemplates templates={purchasedTemplates} />
          <PurchasesList purchases={purchases} />
          <TransactionsList transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;