import React from "react";
import no_user from "../assets/no_user.png";
import { useNavigate } from "react-router-dom";
function UserListItem({ user, isFollowing, followUser, unfollowUser,loading}) {
  const myId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const handleRedirect = () => {
    if (user._id === myId) {
      navigate(`/profile/me`);
    } else {
      navigate(`/profile/${user._id}/${user.user_name}`);
    }
  };
  return (
    <div className="flex items-center lg:mb-5 mb-4 justify-between">
      <div className="flex gap-3 lg:px-10 px-6 items-center cursor-pointer">
        <div className="avatar">
          <img
            alt="avatar"
            onClick={handleRedirect}
            className={`lg:w-14 w-12 rounded-full ${
              !user.avatar && "opacity-60"
            }`}
            src={!user.avatar ? no_user : user.avatar}
          />
        </div>
        <div
          className="name mb-1"
          onClick={handleRedirect}
        >
          <p className="lg:text-xl text-lg -mb-1 lg:-mb-0.5 font-semibold">{user.user_name}</p>
          <p className="lg:text-base text-sm font-medium text-gray-500">
            {user.name}
          </p>
        </div>
      </div>
      <div className="action flex justify-center w-1/3">
        {user._id!==myId?<div> 
        {isFollowing(user._id) ? (
          <button
            onClick={() => unfollowUser(user._id)}
            className="bg-gray-200 hover:bg-gray-300 rounded-lg lg:text-sm text-xs font-medium px-3 py-2"
          >
            Unfollow
          </button>
        ) : (
          <button
            onClick={() => followUser(user._id)}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg lg:text-sm text-xs text-white font-medium px-5 py-2"
          >
            Follow
          </button>
        )}
        </div>:""}
      </div>
    </div>
  );
}

export default UserListItem;
