import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initial user state can be expanded as needed
  const [user, setUser] = useState({
    isLoggedIn: false,
    image: '/images/profile.jpg', // default image
    // ...other user info
  });

  // On mount, load user info from localStorage or API
  useEffect(() => {
    const token = localStorage.getItem('token');
    let image = localStorage.getItem('userImage');
    if (!image) image = '/images/profile.jpg';
    setUser({
      isLoggedIn: !!token,
      image,
    });
  }, []);

  // Function to update user image everywhere
  const updateUserImage = (newImage) => {
    setUser((prev) => ({ ...prev, image: newImage }));
    localStorage.setItem('userImage', newImage);
  };

  // Function to update login state
  const setLoginState = (isLoggedIn) => {
    setUser((prev) => ({ ...prev, isLoggedIn }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUserImage, setLoginState }}>
      {children}
    </UserContext.Provider>
  );
};
