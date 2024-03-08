import React from "react";
import no_user from "../assets/no_user.png";
import { timeAgo } from "../utils/timeAgo";
import Icon from "./Icon";
import { RiDeleteBinLine } from "react-icons/ri";
function CommentListItem({ comment,deleteComment }) {
  const iconColor = "rgb(55 65 81)";
  const userId = localStorage.getItem("userId");
  return (
    <div className="flex py-3 px-3">
      <div className="flex lg:mr-5 mr-2">
        <img
          className="w-10 h-10 rounded-full"
          src={comment.user.avatar || no_user}
          alt="avatar"
        />
        <div className="ml-3">
          <p className="text-gray-800 font-medium">{comment.user.user_name}</p>
          <p className="text-gray-600 text-xs">{timeAgo(comment.createdAt)}</p>
        </div>
      </div>
      <div className="flex justify-between items-start w-full lg:ml-8 ml-10 ">
        <p className="text-gray-800 px-1">{comment.comment}</p>
        {comment.user._id === userId && (
          <button className="mb-3 p-1.5" onClick={()=>{deleteComment(comment._id)}}>
            <Icon icon={RiDeleteBinLine} size={16} color={iconColor} />
          </button>
        )}
      </div>
    </div>
  );
}

export default CommentListItem;
