import React, { useContext, useRef, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import no_user from "../assets/no_user.png";
import Loading from "react-loading";
import { LiaEdit } from "react-icons/lia";
import { FaUserEdit } from "react-icons/fa";
import Icon from "../components/Icon/Icon";
import axios from "axios";
import { UploadImage } from "../utils/UploadImage";
import { toast } from "react-toastify";
import { API } from "../API/API";
import BlockUi from "@availity/block-ui";
function Settings() {
  const iconColor = "rgb(55 65 81)";
  const { myProfile, setMyProfile } = useContext(ProfileContext);
  const fileInputRef = useRef(null);
  const [changingAvatar, setChangingAvatar] = useState(false);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(myProfile.name);
  const [user_name, setUser_Name] = useState(myProfile.user_name);
  const [email, setEmail] = useState(myProfile.email);
  const [bio, setBio] = useState(myProfile.bio);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [setttingPassword, setSettingPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [block1, setBlock1] = useState(false);
  const [block2, setBlock2] = useState(false);
  const updateAvatar = async (file) => {
    if (!file) return;
    try {
      const newAvatar = await UploadImage(file);
      if (!newAvatar) {
        toast.error("Could not update Avatar !");
        return;
      }
      const payload = {
        avatar: newAvatar,
      };
      await axios.patch(API.Profile.updateMyProfile, payload);
      await getMyProfile();
    } catch (error) {
      toast.error("Please Try Again Later !");
    }
  };
  const updateProfile = async () => {
    if (!name.trim() || !email.trim() || !email.trim()) {
      toast.error("Form can't be empty !");
      return;
    }
    try {
      const payload = {
        name,
        user_name,
        email,
        bio,
      };
      setBlock1(true);
      await axios.patch(API.Profile.updateMyProfile, payload);
      await getMyProfile();
      toast.success("Profile Updated !");
      setEditable(false);
      setBlock1(false);
    } catch (error) {
      toast.error(error.response.data.message);
      cancelUpadate();
      setBlock1(false);
    }
  };
  const updatePassword = async () => {
    if (!password || !newPassword) {
      toast.error("Password can't be empty !");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    try {
      const payload = {
        currentPassword: password.trim(),
        newPassword: newPassword.trim(),
      };
      setBlock2(true);
      await axios.patch(API.Auth.changePassword, payload);
      toast.success("Password Updated !");
      setSettingPassword(false);
      setBlock2(false);
    } catch (error) {
      toast.error(error.response.data.message);
      cancelPasswordChange();
      setBlock2(false);
    }
  };
  const getMyProfile = async () => {
    try {
      const res = await axios.get(API.Profile.myProfile);
      setMyProfile(res.data.myProfile);
    } catch (error) {
      toast.error("Please Try Again Later !");
    }
  };
  const handleFileChange = async (event) => {
    try {
      setChangingAvatar(true);
      await updateAvatar(event.target.files[0]);
      setChangingAvatar(false);
    } catch (error) {
      setChangingAvatar(false);
      toast.error("Please Try Again Later !");
    }
  };
  const handleAvatarClick = async () => {
    fileInputRef.current.click();
  };
  const cancelUpadate = () => {
    setEditable(false);
    setName(myProfile.name);
    setUser_Name(myProfile.user_name);
    setEmail(myProfile.email);
    setBio(myProfile.bio);
  };
  const cancelPasswordChange = () => {
    setSettingPassword(false);
    setPassword("");
    setConfirmPassword("");
    setNewPassword("");
    setPasswordMatchError(false);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="lg:w-5/12 w-11/12">
          <div className="lg:mt-8 mt-6 lg:py-6 py-4 w-full">
            <p className="lg:text-4xl text-3xl text-gray-800 font-bold">
              Settings
            </p>
          </div>
          <div className="settings-content">
            <p className="text-gray-800 text-xl font-semibold">
              Profile Settings
            </p>
            <div className="profile form my-10">
              <div className="avatar changer flex justify-center">
                {!changingAvatar ? (
                  <>
                    <img
                      alt="avatar"
                      draggable={false}
                      className=" cursor-pointer w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-gray-500"
                      src={myProfile.avatar || no_user}
                    />
                    <button
                      onClick={handleAvatarClick}
                      className="lg:mt-14 mt-11 -ml-1"
                    >
                      <Icon icon={FaUserEdit} size={22} color={iconColor} />
                    </button>
                  </>
                ) : (
                  <Loading type="spinningBubbles" color={iconColor} />
                )}
                <input
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                />
              </div>
              <div className="profile-edit form">
                <BlockUi tag="div" blocking={block1}>
                  <div className="mb-1.5 flex justify-end">
                    <button
                      onClick={() => setEditable(true)}
                      className="rounded-lg flex gap-1 px-4 py-1 bg-gray-800 text-white text-sm"
                    >
                      <p>Edit</p>
                      <Icon icon={LiaEdit} size={18} color={"white"} />
                    </button>
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="font-medium mb-1">Name</label>
                    <input
                      autoFocus
                      disabled={!editable}
                      className={`${
                        !editable ? "text-gray-500" : "text-gray-800"
                      }  bg-gray-100 rounded-lg outline-none px-3 py-3`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="font-medium mb-1">User Name</label>
                    <input
                      disabled={!editable}
                      className={`${
                        !editable ? "text-gray-500" : "text-gray-800"
                      }  bg-gray-100 rounded-lg outline-none px-3 py-3`}
                      value={user_name}
                      onChange={(e) => setUser_Name(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="font-medium mb-1">Email</label>
                    <input
                      type="email"
                      disabled={!editable}
                      className={`${
                        !editable ? "text-gray-500" : "text-gray-800"
                      }  bg-gray-100 rounded-lg outline-none px-3 py-3`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="font-medium mb-1">About Me</label>
                    <textarea
                      disabled={!editable}
                      rows={4}
                      cols={10}
                      style={{ resize: "none" }}
                      className={`${
                        !editable ? "text-gray-500" : "text-gray-800"
                      }  bg-gray-100 rounded-lg outline-none px-3 py-3`}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>
                  {editable && (
                    <div className="form action flex gap-8 mb-5">
                      <button
                        onClick={updateProfile}
                        className="bg-blue-600 px-3 py-1.5 w-20 rounded-xl text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelUpadate}
                        className="bg-gray-200 px-3 py-1.5 w-20 rounded-xl text-gray-800 font-medium hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </BlockUi>
              </div>
            </div>
            <p className="text-gray-800 text-xl font-semibold">
              Account Settings
            </p>
            <div className="account form my-8">
              {!setttingPassword ? (
                <div className="flex lg:gap-52 gap-20 items-center mb-10">
                  <div>
                    <p className="font-medium -mb-4">Password</p>
                    <p className="text-4xl font-medium text-gray-500">
                      ...........
                    </p>
                  </div>
                  <button
                    onClick={() => setSettingPassword(true)}
                    className="bg-gray-200 text-gray-800 py-1.5 w-20 rounded-xl text-sm font-medium  hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-500"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div className="change password lg:w-1/2 w-full">
                  <BlockUi blocking={block2} tag={"div"}>
                    <div className="flex flex-col mb-4">
                      <label className="font-medium mb-1">
                        Current Password
                      </label>
                      <input
                        placeholder="Enter Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`text-gray-800 bg-gray-100 rounded-lg outline-none px-3 py-2.5`}
                      />
                    </div>
                    <div className="flex flex-col mb-4">
                      <label className="font-medium mb-1">New Password</label>
                      <input
                        value={newPassword}
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter New Password"
                        className={`text-gray-800 bg-gray-100 rounded-lg outline-none px-3 py-2.5`}
                      />
                    </div>
                    <div className="flex flex-col mb-4">
                      <label className="font-medium mb-1">
                        Confirm Password
                      </label>
                      <input
                        value={confirmPassword}
                        type="password"
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setPasswordMatchError(false);
                        }}
                        placeholder="Confirm Password"
                        className={`text-gray-800 bg-gray-100 rounded-lg outline-none px-3 py-2.5`}
                      />
                    </div>
                    {passwordMatchError && (
                      <p className="text-xs text-right text-gray-800 -mt-2 mb-4 px-2">
                        Confirm password didn't match!
                      </p>
                    )}
                    <div className="form action flex gap-8 mb-5 mt-2">
                      <button
                        onClick={updatePassword}
                        className="text-sm bg-blue-600 px-3 py-1.5 w-20 rounded-xl text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-700"
                      >
                        Update
                      </button>
                      <button
                        onClick={cancelPasswordChange}
                        className="text-sm bg-gray-200 px-3 py-1.5 w-20 rounded-xl text-gray-800 font-medium hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </BlockUi>
                </div>
              )}
              <div className="flex lg:gap-52 gap-20 items-center mt-8">
                <div>
                  <p className="font-medium">Account Status</p>
                  <p className="text-sm font-medium text-gray-500">Active</p>
                </div>
                <button className="bg-gray-200 text-gray-800 py-1.5 w-24 rounded-xl text-sm font-medium  hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-500">
                  Deactivate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
