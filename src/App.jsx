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
import Notifications from "./screens/Notifications";
import Layout from "./components/Layout";
import PrivateRoutes from "./routes/privateRoutes";
import { AuthProvider } from "./context/AuthContext";
import Search from "./screens/Search";
import Settings from "./screens/Settings";
function App() {
  return (
    <AuthProvider>
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
            <Route element={<Search/>} path="/search" />
            <Route element={<Notifications/>} path="/notifications" />
            <Route element={<MyProfile />} path="/profile/me" />
            <Route element={<Settings/>} path="/profile/settings" />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
