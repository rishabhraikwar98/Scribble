import React, { useContext, useEffect, useState } from "react";
import Icon from "../Icon/Icon";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { LiaComment } from "react-icons/lia";
import { FiEdit } from "react-icons/fi";
import { API } from "../../API/API";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import no_user from "../../assets/no_user.png";
import {timeAgo} from "../../utils/timeAgo";
import Modal from "../Modal/Modal";
import CommentSection from "../Comment/CommentSection";
import { toast} from "react-toastify";
import { ProfileContext } from "../../context/ProfileContext";
const Post = ({ post, refresh }) => {
  const { token } = useAuth();
  const {myProfile} =useContext(ProfileContext)
  const iconColor = "rgb(55 65 81)";
  const [openComments, setOpenComments] = useState(false);
  const { author, image, title, total_comments, liked_by, createdAt } = post;
  const [comments, setComments] = useState([]);
  const [loadingComments,setLoadingComments]= useState(true)
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  // Post Actions
  const handleLikePost = async (postId) => {
    const URI = API.Posts.like.replace(":postId", postId);
    try {
      await axios.post(URI);
      await refresh();
    } catch (error) {
      toast.error("Please Try Again Later !");
    }
  };
  const handleUnlikePost = async (postId) => {
    const URI = API.Posts.like.replace(":postId", postId);
    try {
      await axios.delete(URI);
      await refresh();
    } catch (error) {
      toast.error("Please Try Again Later !");
    }
  };
  const handleDeletePost = async (postId) => {
    const URI = API.Posts.deletePost.replace(":postId", postId);
    try {
      await axios.delete(URI);
      await refresh();
      toast.info("Post Deleted !");
    } catch (error) {
      toast.error("Please Try Again Later !");
    }
  };
  //Comment Actions
  const getAllComments = async () => {
    const URI = API.Comments.allComments.replace(":postId", post._id);
    try {
      const res = await axios.get(URI);
      setComments(res.data.comments)
    } catch (error) {
      toast.error("Please try again later !")
    }
  };

  const closeCommentsModal =async () => {
    setOpenComments(false);
    await refresh()
  };
  const openCommentsModal = async () => {
    setOpenComments(true);
    await getAllComments()
    setLoadingComments(false)
  };

  return (
    <>
      <Modal
        title={"Comments"}
        isOpen={openComments}
        onClose={closeCommentsModal}
      >
        <CommentSection loadingComments={loadingComments} postId={post._id} comments={comments} refresh={getAllComments} />
      </Modal>
      <div className="bg-gray-50 shadow-md rounded-lg p-6 mb-3 lg:w-8/12 w-full">
        {/* Post header */}
        <div className="flex items-center mb-4">
          <img
            src={author.avatar || no_user}
            alt="Profile"
            className="w-8 h-8 mr-4 rounded-full"
          />
          <div>
            <p className="font-medium">@{author.user_name}</p>
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
          <p
            className={`font-medium mb-2 ${!image ? "text-2xl" : "text-lg"}`}
          >
            {title}
          </p>
        )}
        <p className="text-gray-500 text-xs">{timeAgo(createdAt)}</p>
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
                  .includes(myProfile._id)
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
                    .includes(myProfile._id)
                    ? "blue"
                    : iconColor
                }
              />
              <p className="text-sm lg:text-base font-medium">Like</p>
            </button>
          }
          <button
            onClick={openCommentsModal}
            className="flex lg:gap-2 gap-1 items-center"
          >
            <p>{total_comments}</p>
            <Icon icon={LiaComment} size={24} color={iconColor} />
            <p className="text-sm lg:text-base font-medium">Comment</p>
          </button>
          <div className="w-full flex justify-end  lg:gap-8 gap-5 items-center">
            {author._id === myProfile._id && (
              <>
                {/* <button>
                  <Icon icon={FiEdit} size={20} color={iconColor} />
                </button> */}
                <button onClick={() => handleDeletePost(post._id)}>
                  <Icon icon={RiDeleteBinLine} size={22} color={iconColor} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
