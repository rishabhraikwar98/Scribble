import React, { useEffect } from "react";
import Icon from "./Icon";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { LiaComment } from "react-icons/lia";
import { FiEdit } from "react-icons/fi";
import { API } from "../API/API";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import no_user from "../assets/no_user.png";
import { extractDate } from "../utils/extractDate";
const Post = ({ post, handleLikePost,handleUnlikePost,handleDeletePost }) => {
  const { token } = useAuth();
  const userId = localStorage.getItem("userId");
  const iconColor = "rgb(55 65 81)";
  const { author, image, title, total_comments, liked_by, createdAt } = post;
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  return (
    <div className="bg-gray-50 shadow-md rounded-lg p-6 mb-3 lg:w-8/12 w-full">
      {/* Post header */}
      <div className="flex items-center mb-4">
        <img
          src={author.avatar ? author.avatar : no_user}
          alt="Profile"
          className={`w-8 h-8 mr-4 rounded-full ${
            !author.avatar && "opacity-50"
          }`}
        />
        <div>
          <p className="font-semibold">@{author.user_name}</p>
        </div>
      </div>

      {/* Post image */}
      {image && (
        <div className="mb-4 flex justify-center">
          <img src={image} alt="Post" className="w-full rounded-lg" />
        </div>
      )}

      {/* Post title */}
      {title && (
        <p className={`font-semibold mb-2 ${!image ? "text-2xl" : "text-lg"}`}>
          {title}
        </p>
      )}
      <p className="text-gray-500 text-xs">{extractDate(createdAt)}</p>
      {/* Post actions */}
      <div className="flex items-center mt-3 lg:gap-12 gap-6">
        {
          <button
            className="flex lg:gap-2 gap-1 items-center"
            onClick={() => {
              !liked_by
                .map((item) => {
                  return item.user;
                })
                .includes(userId)
                ? handleLikePost(post._id)
                : handleUnlikePost(post._id);
            }}
          >
            <p className="mt-1">{liked_by.length}</p>
            <Icon
              icon={AiFillLike}
              size={24}
              color={
                liked_by
                  .map((item) => {
                    return item.user;
                  })
                  .includes(userId)
                  ? "blue"
                  : iconColor
              }
            />
            <p className="text-sm lg:text-base font-semibold">Like</p>
          </button>
        }
        <button className="flex lg:gap-2 gap-1 items-center">
          <p>{total_comments}</p>
          <Icon icon={LiaComment} size={24} color={iconColor} />
          <p className="text-sm lg:text-base font-semibold">Comment</p>
        </button>
        <div className="w-full flex justify-end  lg:gap-8 gap-5 items-center">
          {author._id === userId && (
            <>
              <button>
                <Icon icon={FiEdit} size={20} color={iconColor} />
              </button>
              <button onClick={() => handleDeletePost(post._id)}>
                <Icon icon={RiDeleteBinLine} size={22} color={iconColor} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
