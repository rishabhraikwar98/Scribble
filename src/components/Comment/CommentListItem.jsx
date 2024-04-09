import React, { useContext } from "react";
import no_user from "../../assets/no_user.png";
import { timeAgo } from "../../utils/timeAgo";
import Icon from "../Icon/Icon"
import { RiDeleteBinLine } from "react-icons/ri";
import { ProfileContext } from "../../context/ProfileContext";
import {motion} from "framer-motion"
function CommentListItem({ comment, deleteComment, isMyPost }) {
  const iconColor = "rgb(55 65 81)";
  const { myProfile } = useContext(ProfileContext);
  const isMyComment = () => {
    return comment.user._id === myProfile._id;
  };
  return (
    <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration:.3}}
    className="flex py-2 px-3 rounded-lg">
      <div className="flex w-1/2">
        <img
          className="w-10 h-10 rounded-full"
          src={comment.user.avatar || no_user}
          alt="avatar"
        />
        <div className="ml-3 w-full">
          <p className="text-gray-800 font-medium">{comment.user.user_name}</p>
          <p className="text-gray-600 text-xs">{timeAgo(comment.createdAt)}</p>
        </div>
      </div>
      <div className="flex justify-between items-start lg:w-11/12 w-6/12 ">
        <p className="text-gray-800 px-1 text-base">{comment.comment}</p>
        {isMyPost && (
          <motion.button
          whileHover={{scale:1.2}} 
          whileTap={{scale:1}}
            className="mb-3 p-1.5"
            onClick={() => {
              deleteComment(comment._id);
            }}
          >
            <Icon icon={RiDeleteBinLine} size={16} color={iconColor} />
          </motion.button>
        )}
        {!isMyPost && isMyComment() && (
          <motion.button
          whileTap={{scale:1.2}}
          whileHover={{scale:1}}
            className="mb-3 p-1.5"
            onClick={() => {
              deleteComment(comment._id);
            }}
          >
            <Icon icon={RiDeleteBinLine} size={16} color={iconColor} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

export default CommentListItem;
