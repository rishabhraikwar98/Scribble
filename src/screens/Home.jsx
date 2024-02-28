import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { API } from "../API/API";
import { UploadImage } from "../utils/UploadImage";
import { useNavigate } from "react-router-dom";

function Home() {
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    getMyprofile();
  }, []);
  const getMyprofile = () => {
    axios
      .get(API.Profile.myProfile)
      .then((res) => {
        sessionStorage.setItem("myProfile", JSON.stringify(res.data.myProfile));
      })
      .catch((e) => console.error(e));
  };
  return <div>Home</div>;
}

export default Home;
