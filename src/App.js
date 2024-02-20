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
import PrivateRoutes from "./routes/privateRoutes";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route element={<Navigate to="/login" />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/home" />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
