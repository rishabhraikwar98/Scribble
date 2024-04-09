import React, { useState } from "react";
import validator from "validator";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../API/API";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import logo1 from "../assets/logo1.png";
import BlockUi from "@availity/block-ui";
import Icon from "../components/Icon/Icon";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import CustomLoader from "../components/Loader/CustomLoader";
import { motion } from "framer-motion";
function Signup() {
  const iconColor = "rgb(55 65 81)";
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
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      setLoading(true);
      const res = await axios.post(API.Auth.signup, payload);
      setLoading(false);
      toast.success("Signup Successfull !");
      login(res.data.access_token);
      setTimeout(() => {
        navigate("/home");
      }, 500);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  const errorAnimationVarients = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  };

  return (
    <>
      <BlockUi
        blocking={loading}
        loader={<CustomLoader size={50} color={"blue"} />}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center items-center h-screen bg-gray-100"
        >
          <div className="bg-white lg:p-8 px-8 py-6 rounded-xl shadow-md lg:w-96 w-80 lg:mt-0 -mt-24">
            <div className="flex justify-center">
              <div className="w-[160px] mb-1.5">
                <img src={logo1} alt="Company Logo" className="mx-auto" />
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
                <motion.p
                  initial="initial"
                  animate="animate"
                  transition="transition"
                  exit="exit"
                  className="text-xs text-right"
                >
                  Name can't be blank!
                </motion.p>
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
                <motion.p
                  initial="initial"
                  animate="animate"
                  transition="transition"
                  exit="exit"
                  className="text-xs text-right"
                >
                  User Name can't be blank!
                </motion.p>
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
                <motion.p
                  initial="initial"
                  animate="animate"
                  transition="transition"
                  exit="exit"
                  className="text-xs text-right"
                >
                  Invalid email !
                </motion.p>
              )}
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
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
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-3"
                >
                  {!showPassword && (
                    <motion.div
                      initial="initial"
                      animate="animate"
                      transition="transition"
                      exit="exit"
                      variants={errorAnimationVarients}
                    >
                      <Icon color={iconColor} size={20} icon={LuEye} />
                    </motion.div>
                  )}
                  {showPassword && (
                    <motion.div
                      initial="initial"
                      animate="animate"
                      transition="transition"
                      exit="exit"
                      variants={errorAnimationVarients}
                    >
                      <Icon color={iconColor} size={20} icon={LuEyeOff} />
                    </motion.div>
                  )}
                </button>
              </div>
              {passwordError && (
                <motion.p
                  initial="initial"
                  animate="animate"
                  transition="transition"
                  exit="exit"
                  className="text-xs text-right"
                >
                  Password must be 8 characters !
                </motion.p>
              )}
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="w-full bg-blue-500 text-white font-bold py-2 px-5 rounded-md focus:outline-none hover:bg-blue-600"
              onClick={handleSignup}
            >
              Sign Up
            </motion.button>
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <NavLink to="/login" className="text-blue-500">
                Log In
              </NavLink>
            </p>
          </div>
        </motion.div>
      </BlockUi>
    </>
  );
}

export default Signup;
