import React, { useState, useEffect, useRef, useContext } from "react";
import { LanguageContext } from "../../../LanguageContext";

const ProfileSidebar = ({
  profile,
  profileImage,
  handleChange,
  handleSubmit,
  uploading = false,
}) => {
  // Helper to normalize the image src. If image is a relative upload path (starts with
  // '/uploads/'), keep it. If it's a plain filename, prefix with '/uploads/'. If it's
  // already a data URL or absolute http(s) URL, use as-is.
  const normalizeSrc = (src) => {
    if (!src) return null;
    // data URL
    if (
      src.startsWith("data:") ||
      src.startsWith("http://") ||
      src.startsWith("https://") ||
      src.startsWith("blob:")
    )
      return src;
    // already absolute-ish /uploads path
    if (src.startsWith("/uploads/")) return src;
    // maybe stored backend path without leading slash
    if (src.startsWith("uploads/")) return `/${src}`;
    // If src contains path segments (e.g. full filesystem path or backend path),
    // extract the basename and prefix with /uploads/
    // Normalize backslashes to forward slashes first.
    const normalized = src.replace(/\\\\/g, "/");
    if (normalized.includes("/uploads/")) {
      // return the portion starting from /uploads/ and encode it for the browser
      return encodeURI(normalized.slice(normalized.indexOf("/uploads/")));
    }
    const parts = normalized.split("/");
    const basename = parts[parts.length - 1] || src;
    return encodeURI(`/uploads/${basename}`);
  };

  // Local state for image src with fallback handling
  const [imgSrc, setImgSrc] = useState(() => normalizeSrc(profileImage));
  const prevObjectUrl = useRef(null);

  useEffect(() => {
    const newSrc = normalizeSrc(profileImage);

    // If previous was a blob URL created by this component, revoke it
    if (
      prevObjectUrl.current &&
      String(prevObjectUrl.current).startsWith("blob:")
    ) {
      try {
        URL.revokeObjectURL(prevObjectUrl.current);
      } catch (e) {}
    }

    // Track newly set blob URL so we can revoke later
    if (newSrc && String(newSrc).startsWith("blob:")) {
      prevObjectUrl.current = newSrc;
    } else {
      prevObjectUrl.current = null;
    }

    setImgSrc(newSrc);
  }, [profileImage]);

  // Revoke any remaining blob URL on unmount
  useEffect(() => {
    return () => {
      if (
        prevObjectUrl.current &&
        String(prevObjectUrl.current).startsWith("blob:")
      ) {
        try {
          URL.revokeObjectURL(prevObjectUrl.current);
        } catch (e) {}
      }
    };
  }, []);

  const handleImgError = () => {
    // fallback to default public image (exists in public/images/profile.jpg)
    if (imgSrc && !imgSrc.includes("/images/profile.jpg")) {
      setImgSrc("/images/profile.jpg");
    }
  };

  const { t } = useContext(LanguageContext);

  return (
    <div className="md:col-span-1 bg-white rounded-lg shadow p-6 flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center text-3xl font-bold text-gray-500 overflow-hidden">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt="Profile"
            onError={handleImgError}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{profile.name ? profile.name[0] : "U"}</span>
        )}
      </div>
      <h2 className="text-xl font-semibold mb-2">
        {profile.name || "User Name"}
      </h2>
      <p className="text-gray-500 mb-4">{profile.email || "user@email.com"}</p>
      {/* Use translations for form labels/buttons */}

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block text-sm font-medium">{t.profileImage}</label>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 w-full border rounded px-2 py-1"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">{t.name}</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">{t.email}</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">{t.birthdate}</label>
          <input
            type="date"
            name="birthdate"
            value={profile.birthdate}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">{t.caste}</label>
          <input
            type="text"
            name="caste"
            value={profile.caste}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-2 py-1"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">{t.religion}</label>
          <input
            type="text"
            name="religion"
            value={profile.religion}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-2 py-1"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">{t.age}</label>
          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-2 py-1"
            min="0"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">
            {t.marriageStatus}
          </label>
          <select
            name="marriageStatus"
            value={profile.marriageStatus}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-2 py-1"
          >
            <option value="Single">{t.single}</option>
            <option value="Married">{t.married}</option>
            <option value="Divorced">{t.divorced}</option>
            <option value="Widowed">{t.widowed}</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={uploading}
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
            uploading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              {t.uploading}
            </span>
          ) : (
            t.updateProfile
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfileSidebar;