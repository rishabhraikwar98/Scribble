import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import MyProfile from "./screens/MyProfile";
import UserProfile from "./screens/UserProfile";
import Search from "./screens/Search";
import Settings from "./screens/Settings";
import Notifications from "./screens/Notifications";
import Layout from "./components/Layout/Layout";
import PrivateRoutes from "./routes/privateRoutes";
import { AuthProvider } from "./context/AuthContext";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { ProfileProvider } from "./context/ProfileContext";
import "@availity/block-ui/src/BlockUi.css";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="font-Roboto">
      <AuthProvider>
        <Toaster position="bottom-center" reverseOrder={false} />
        <SkeletonTheme baseColor="#f3f3f3" highlightColor="#D3D3D3">
          <ProfileProvider>
            <Router>
              <Routes>
                <Route element={<Navigate to="/login" />} path="/" />
                <Route element={<Login />} path="/login" />
                <Route element={<Signup />} path="/signup" />
                <Route
                  element={
                    <Layout>
                      <PrivateRoutes />
                    </Layout>
                  }
                >
                  <Route element={<Home />} path="/home" />
                  <Route element={<Search />} path="/search" />
                  <Route element={<MyProfile />} path="/profile/me" />
                  <Route
                    element={<UserProfile />}
                    path="/profile/:userId/:user_name"
                  />
                  <Route element={<Settings />} path="/profile/settings" />
                  <Route element={<Notifications />} path="/notifications" />
                </Route>
              </Routes>
            </Router>
          </ProfileProvider>
        </SkeletonTheme>
      </AuthProvider>
    </div>
  );
}

export default App;
