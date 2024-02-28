import React, { useEffect, useState } from "react";
import validator from "validator";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../API/API";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from '../context/AuthContext';
import logo from "../assets/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const {login,token} = useAuth();
  useEffect(() => {
   if(token){
    navigate('/home')
   }
  }, []);
  const handleLogin = async () => {
    if (!validator.isEmail(email)) {
      setEmailError(true);
      return;
    }
    if (password.trim().length < 8) {
      setPasswordError(true);
      return;
    }
    const payload = {
      email,
      password,
    };
    try {
      const res = await axios.post(API.Auth.login, payload);
      toast.success("Login Successfull !");
      login(res.data.access_token)
      navigate("/home");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={4000} newestOnTop />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-[420px]">
          <div className="flex justify-center">
          <div className="w-[120px]">
            <img src={logo} alt="Company Logo" className="mx-auto mb-4 w-auto" />
          </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`w-full p-2 border-2 rounded-md focus:outline-none ${
                emailError ? "border-red-600" : "border-gray-300"
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
            />
            {emailError && (
              <p className="text-xs text-right">Invalid email !</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className={`w-full p-2 border-2 rounded-md focus:outline-none ${
                passwordError ? "border-red-600" : "border-gray-300"
              }`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
              }}
            />
            {passwordError && (
              <p className="text-xs text-right">
                Password must be 8 characters !
              </p>
            )}
          </div>
          <button
            className="w-full bg-blue-500 text-white font-bold py-2 px-5 rounded-md focus:outline-none hover:bg-blue-600"
            onClick={handleLogin}
          >
            Log In
          </button>
          <p className="text-sm text-center my-4">
            Don't have an account?{" "}
            <NavLink to="/signup" className="text-blue-500">
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
