import React, { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [myProfile, setMyProfile] = useState(null);

  return (
    <ProfileContext.Provider value={{ myProfile, setMyProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
