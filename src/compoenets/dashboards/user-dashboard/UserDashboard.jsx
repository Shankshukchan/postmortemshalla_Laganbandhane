
import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

import ProfileSidebar from "./ProfileSidebar";
import PurchasesList from "./PurchasesList";
import TransactionsList from "./TransactionsList";
import PurchasedTemplates from "./PurchasedTemplates";
const imageUrl=import.meta.env.VITE_PROFILE_IMAGE

const UserDashboard = () => {
  // Placeholder data for purchases and transactions
  const [purchases] = useState([
    { id: 1, item: "Premium Template", date: "2025-09-20", amount: 499 },
    { id: 2, item: "Consultation", date: "2025-09-15", amount: 999 },
    { id: 3, item: "Consultation", date: "2025-09-15", amount: 999 },
  ]);
  const [transactions] = useState([
    { id: 1, type: "Credit", date: "2025-09-20", amount: 499 },
    { id: 2, type: "Debit", date: "2025-09-15", amount: 999 },
  ]);
  // Recently purchased templates (with layouts)
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
      id: 1,
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
    userId: localStorage.getItem('userId') || '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);


  const handleChange = (e) => {
    if (e.target.name === "profileImage") {
      const file = e.target.files[0];
      if (file) {
        setProfileImage(URL.createObjectURL(file));
        setImageFile(file);
      }
    } else {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userId', profile.userId);
    formData.append('FullName', profile.name);
    formData.append('email', profile.email);
    formData.append('birthdate', profile.birthdate);
    formData.append('caste', profile.caste);
    formData.append('religion', profile.religion);
    formData.append('age', profile.age);
    formData.append('marriageStatus', profile.marriageStatus);
    if (imageFile) {
      formData.append('profileImage', imageFile);
    }
    try {
      const res = await axios.post(imageUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const data = res.data;
      if (data.success) {
        if (data.data.profileImage) {
          setProfileImage(data.data.profileImage);
          localStorage.setItem('user', JSON.stringify({ ...profile, image: data.data.profileImage }));
        }
        swal({ title: "Profile updated successfully", icon: "success" });
      } else {
        swal({ title: data.message || "Profile update failed", icon: "error" });
      }
    } catch (err) {
      swal({ title: "Profile update error", icon: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#FDF6EC] p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar/Profile */}
  <ProfileSidebar profile={profile} profileImage={profileImage} handleChange={handleChange} handleSubmit={handleSubmit} />
        {/* Main Content */}
        <div className="md:col-span-2 flex flex-col gap-8">
          <PurchasedTemplates templates={purchasedTemplates} />
          <PurchasesList purchases={purchases} />
          <TransactionsList transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
