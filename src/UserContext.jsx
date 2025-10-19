import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initial user state can be expanded as needed
  const [user, setUser] = useState({
    isLoggedIn: false,
    image: "/images/profile.jpg", // default image
    // ...other user info
  });

  // On mount, load user info from localStorage or API
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      // load and normalize stored image path (if any)
      const normalize = (src) => {
        if (!src) return "/images/profile.jpg";
        try {
          const s = String(src).trim();
          if (
            s.startsWith("data:") ||
            s.startsWith("blob:") ||
            s.startsWith("http://") ||
            s.startsWith("https://")
          )
            return s;
          const normalized = s.replace(/\\/g, "/");
          const uploadsIdx = normalized.indexOf("/uploads/");
          if (uploadsIdx !== -1) {
            const rel = normalized.slice(uploadsIdx + "/uploads/".length);
            const encodedRel = rel.split("/").map(encodeURIComponent).join("/");
            return `/uploads/${encodedRel}`;
          }
          if (normalized.startsWith("uploads/")) {
            const rel = normalized.slice("uploads/".length);
            const encodedRel = rel.split("/").map(encodeURIComponent).join("/");
            return `/uploads/${encodedRel}`;
          }
          // if value looks like a category/filename (e.g., 'profile/foo.png' or 'misc/x')
          if (normalized.includes("/")) {
            const encodedRel = normalized
              .split("/")
              .map(encodeURIComponent)
              .join("/");
            return `/uploads/${encodedRel}`;
          }
          // otherwise treat as a bare filename and store under profile
          return `/uploads/profile/${encodeURIComponent(normalized)}`;
        } catch (e) {
          return "/images/profile.jpg";
        }
      };

      let image = null;
      try {
        image = localStorage.getItem("userImage");
      } catch (e) {
        image = null;
      }
      if (!image) {
        try {
          const stored = localStorage.getItem("user");
          if (stored) {
            const parsed = JSON.parse(stored);
            image = parsed && (parsed.image || parsed.profileImage);
          }
        } catch (e) {
          image = null;
        }
      }
      const finalImage = normalize(image);
      // persist normalized form so other tabs/components can read it
      try {
        localStorage.setItem("userImage", finalImage);
      } catch (e) {}
      setUser({ isLoggedIn: !!token, image: finalImage });
    } catch (e) {
      // ignore and use defaults
      setUser({ isLoggedIn: false, image: "/images/profile.jpg" });
    }
  }, []);

  // Function to update user image everywhere
  const updateUserImage = (newImage) => {
    if (!newImage) return;
    // Reuse normalization logic to produce a canonical /uploads/... or passthrough URL
    try {
      const s = String(newImage).trim();
      if (
        s.startsWith("data:") ||
        s.startsWith("blob:") ||
        s.startsWith("http://") ||
        s.startsWith("https://")
      ) {
        setUser((prev) => ({ ...prev, image: s }));
        try {
          localStorage.setItem("userImage", s);
        } catch (e) {}
        return;
      }
      const normalized = s.replace(/\\/g, "/");
      const uploadsIdx = normalized.indexOf("/uploads/");
      let final = null;
      if (uploadsIdx !== -1) {
        const rel = normalized.slice(uploadsIdx + "/uploads/".length);
        final = `/uploads/${rel.split("/").map(encodeURIComponent).join("/")}`;
      } else if (normalized.startsWith("uploads/")) {
        const rel = normalized.slice("uploads/".length);
        final = `/uploads/${rel.split("/").map(encodeURIComponent).join("/")}`;
      } else if (normalized.includes("/")) {
        final = `/uploads/${normalized
          .split("/")
          .map(encodeURIComponent)
          .join("/")}`;
      } else {
        final = `/uploads/profile/${encodeURIComponent(normalized)}`;
      }
      setUser((prev) => ({ ...prev, image: final }));
      try {
        localStorage.setItem("userImage", final);
      } catch (e) {}
    } catch (e) {
      // fallback: store raw
      setUser((prev) => ({ ...prev, image: newImage }));
      try {
        localStorage.setItem("userImage", newImage);
      } catch (ee) {}
    }
  };

  // Function to update login state
  const setLoginState = (isLoggedIn) => {
    setUser((prev) => ({ ...prev, isLoggedIn }));
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, updateUserImage, setLoginState }}
    >
      {children}
    </UserContext.Provider>
  );
};
