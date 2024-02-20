import React from "react";
import { useAuth } from "../context/AuthContext";
function Home() {
  const { logout } = useAuth();
  return (
    <div>
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
