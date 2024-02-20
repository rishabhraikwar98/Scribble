import React, { useState } from "react";
import validator from "validator";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../API/API";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSignup = async () => {
    if (!name.trim().length) {
      setNameError(true);
      return;
    }
    if (!userName.trim().length) {
      setUserNameError(true);
      return;
    }
    if (!validator.isEmail(email)) {
      setEmailError(true);
      return;
    }
    if (password.trim().length < 8) {
      setPasswordError(true);
      return;
    }
    const payload = {
      user_name: userName,
      name,
      email,
      password,
    };
    try {
      const res = await axios.post(API.Auth.signup, payload);
      toast.success("Signup Successfull !");
      login(res.data.access_token);
      toast.success("Login Successfull !");
      navigate("/home");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={4000} newestOnTop />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-[420px]">
          <div className="flex justify-center">
            <div className="w-[120px]">
              <img
                src={logo}
                alt="Company Logo"
                className="mx-auto mb-4 w-auto"
              />
            </div>
          </div>
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className={`w-full p-2 border-2 rounded-md focus:outline-none ${
                nameError ? "border-red-600" : "border-gray-300"
              }`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(false);
              }}
            />
            {nameError && (
              <p className="text-xs text-right">Name can't be blank!</p>
            )}
          </div>
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="user_name"
            >
              User Name
            </label>
            <input
              id="user_name"
              type="text"
              placeholder="example: user@123"
              className={`w-full p-2 border-2 rounded-md focus:outline-none ${
                userNameError ? "border-red-600" : "border-gray-300"
              }`}
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setUserNameError(false);
              }}
            />
            {userNameError && (
              <p className="text-xs text-right">User Name can't be blank!</p>
            )}
          </div>
          <div className="mb-3">
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
            onClick={handleSignup}
          >
            Sign Up
          </button>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-500">
              Log In
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
