import { useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import { useAuth } from "../context/AuthContext";
import Icon from "./Icon";
import { RiHome2Line } from "react-icons/ri";
import { RiSearchLine } from "react-icons/ri";
import { LuBell} from "react-icons/lu";
import { LiaUserAltSolid } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useEffect, useState,useRef } from "react";
import { API } from "../API/API";
import axios from "axios";
import no_user from "../assets/no_user.png";
import ReactLoading from "react-loading";
function Navbar() {
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  const iconColor = "rgb(55 65 81)";
  const [myProfile, setMyProfile] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    getMyProfile();
  }, []);

  const getMyProfile = async () => {
    try {
      const res = await axios.get(API.Profile.myProfile);
      setMyProfile(res.data.myProfile);
      localStorage.setItem("userId",res.data.myProfile._id)
    } catch (error) {}
  };
  return (
    <nav className="bg-white w-full lg:h-16 h-14 border-b border-gray-200 shadow-sm flex items-center justify-between lg:px-10 px-3">
      <div className="logo cursor-pointer" onClick={() => navigate("/home")}>
        <img src={logo1} className="w-[115px]" />
      </div>
      {myProfile ? (
        <div className="icons flex justify-between lg:gap-4 gap-2 cursor-pointer">
          <div
            onClick={() => {
              navigate("/home");
            }}
            className="bg-gray-100 w-10 h-10 flex justify-center items-center rounded-xl"
          >
            <Icon icon={RiHome2Line} size={20} color={iconColor} />
          </div>
          <div
            onClick={() => {
              navigate("/search");
            }}
            className="bg-gray-100 w-10 h-10 flex justify-center items-center rounded-xl"
          >
            <Icon icon={RiSearchLine} size={20} color={iconColor} />
          </div>
          <div
            onClick={() => {
              navigate("/notifications");
            }}
            className="bg-gray-100 w-10 h-10 flex justify-center items-center rounded-xl"
          >
            <Icon icon={LuBell} size={20} color={iconColor} />
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <div className=" avatar flex justify-center items-center">
              <img
                alt="my photo"
                draggable="false"
                src={myProfile && myProfile.avatar ? myProfile.avatar : no_user}
                className={`w-[38px] rounded-full border-2 border-gray-400 ${
                  !myProfile.avatar && "opacity-50"
                }`}
              />
            </div>
          </button>
          {menuOpen && (
            <div className="absolute right-2 mt-14 xl:w-40 w-36 bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
              <ul className="lg:py-3 py-2 text-gray-700 font-medium text-md">
                <li
                  onClick={() => {
                    navigate("/profile/me");
                    setMenuOpen(!menuOpen);
                  }}
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer flex gap-3 items-center"
                >
                  <Icon icon={LiaUserAltSolid} size={22} color={iconColor} />
                  <p>My Profile</p>
                </li>
                <li
                  onClick={() => {
                    navigate("/profile/settings");
                    setMenuOpen(!menuOpen);
                  }}
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer flex gap-3 items-center"
                >
                  <Icon icon={IoSettingsOutline} size={22} color={iconColor} />
                  <p>Settings</p>
                </li>
                <li
                  onClick={() => logout()}
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer flex gap-3 items-center"
                >
                  <Icon icon={CiLogout} size={22} color={iconColor} />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <ReactLoading type="cylon" color={iconColor} />
      )}
    </nav>
  );
}

export default Navbar;
