import React, { useContext, useEffect, useState, useRef } from "react";
import Icon from "../Icon/Icon";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { LiaComment } from "react-icons/lia";
import { FiEdit } from "react-icons/fi";
import { API } from "../../API/API";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import no_user from "../../assets/no_user.png";
import no_image from "../../assets/no_image.png";
import { timeAgo } from "../../utils/timeAgo";
import Modal from "../Modal/Modal";
import CommentSection from "../Comment/CommentSection";
import toast from "react-hot-toast";
import { ProfileContext } from "../../context/ProfileContext";
import { useNavigate } from "react-router-dom";
import BlockUi from "@availity/block-ui";
import CustomLoader from "../Loader/CustomLoader";
import { UploadImage } from "../../utils/UploadImage";
const Post = ({ post, refresh, isFeed }) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { myProfile } = useContext(ProfileContext);
  const iconColor = "rgb(55 65 81)";
  const [openComments, setOpenComments] = useState(false);
  const { author, image, title, total_comments, liked_by, createdAt } = post;
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState("");
  const fileInputRef = useRef(null);
  const [block,setBlock] = useState(false)
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
      toast.success("Post Deleted !");
    } catch (error) {
      toast.error("Please Try Again Later !");
    }
  };
  const handleEditPost = async (postId) => {
    setBlock(true)
    const payload = {
      title: newTitle,
      image:image
    };
    const URI = API.Posts.editPost.replace(":postId", postId);
    if(newImage){
      const imageURL= await UploadImage(newImage,"fit")
      payload.image = imageURL
    }
    try {
      await axios.patch(URI, payload);
      setBlock(false)
      handleCloseEdit()
      await refresh();
      toast.success("Post Updated !");
    } catch (error) {
      setBlock(false)
      toast.error("Please Try Again Later !");
    }
  };

  //Comment Actions
  const getAllComments = async () => {
    const URI = API.Comments.allComments.replace(":postId", post._id);
    try {
      const res = await axios.get(URI);
      setComments(res.data.comments);
    } catch (error) {
      toast.error("Please try again later !");
    }
  };

  const closeCommentsModal = async () => {
    setOpenComments(false);
    await refresh();
  };
  const openCommentsModal = async () => {
    setOpenComments(true);
    await getAllComments();
    setLoadingComments(false);
  };
  const handleRedirect = () => {
    if (post.author._id === myProfile._id) {
      navigate(`/profile/me`);
    } else {
      navigate(`/profile/${post.author._id}/${post.author.user_name}`);
    }
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
    setNewTitle(title);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setNewTitle("");
    setNewImage("")
  };

  return (
    <>
    {/* comment modal */}
      <Modal
        title={"Comments"}
        isOpen={openComments}
        onClose={closeCommentsModal}
      >
        <CommentSection
          loadingComments={loadingComments}
          postId={post._id}
          comments={comments}
          refresh={getAllComments}
        />
      </Modal>
      {/* post edit modal */}
      <Modal title={"Edit Post"} onClose={handleCloseEdit} isOpen={openEdit}>
        <BlockUi blocking={block} loader={<CustomLoader color="blue" size={40}/>}>
        <div className="p-4">
          <div className="lg:mt-4 -mt-2">
            <label
              htmlFor="editTitle"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Change Image
            </label>
            <div className="flex justify-center">
              {!newImage ? (
                <div className="relative">
                <img
                  alt="image"
                  src={!image ? no_image : image}
                  className={`h-48 rounded-lg object-contain border cursor-pointer ${!image&&"opacity-50"} ${image&&"shadow-lg"}`}
                  onClick={() => {
                    fileInputRef.current.click();
                  }}
                />
                {!image&&<p className="absolute top-32 right-12 text-gray-500 text-xl">No Image</p>}
                </div>

              ) : (
                <img
                  alt="new image"
                  className="h-48 rounded-lg object-contain cursor-pointer shadow-lg"
                  src={newImage&&URL.createObjectURL(newImage)}
                />
              )}
              <input
                ref={fileInputRef}
                style={{ display: "none" }}
                id="editImage"
                type="file"
                accept="image/*"
                onChange={(e) => setNewImage(e.target.files[0])}
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="editTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Edit Title
            </label>
            <input
              id="editTitle"
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm px-3 py-2 text-gray-800 outline-none"
              placeholder="Enter new title"
            />
          </div>
          <div className="mt-5 flex gap-5 justify-end">
            <button
              type="button"
              className="inline-flex justify-center w-20 px-4 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none"
              onClick={()=>handleEditPost(post._id)}
            >
              Save
            </button>
            <button
              type="button"
              className="inline-flex justify-center w-20 px-4 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 focus:outline-none"
              onClick={handleCloseEdit}
            >
              Cancel
            </button>
          </div>
        </div>
        </BlockUi>
      </Modal>
      {post && myProfile ? (
        <>
          <div className="bg-gray-50 shadow-md rounded-lg p-4 mb-3 lg:w-8/12 w-full">
            {/* Post header */}
            <div
              onClick={handleRedirect}
              className="flex items-center mb-4 cursor-pointer"
            >
              <img
                src={author.avatar || no_user}
                alt="Profile"
                className="w-8 h-8 mr-1 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">@{author.user_name}</p>
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
                className={`font-medium mb-2 ${
                  !image ? "text-2xl" : "text-lg"
                }`}
              >
                {title}
              </p>
            )}
            <p className="text-gray-500 text-xs">{timeAgo(createdAt)}</p>
            {/* Post actions */}
            <div className="flex items-center mt-3 lg:gap-12 gap-6">
              {
                <button
                  className="flex lg:gap-2 gap-1 items-center hover:bg-gray-200 p-1 rounded-lg"
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
                  <p className="mt-1">
                    {liked_by.length ? liked_by.length : ""}
                  </p>
                  <Icon
                    icon={AiFillLike}
                    size={22}
                    color={
                      liked_by
                        .map((item) => {
                          return item.user;
                        })
                        .includes(myProfile && myProfile._id)
                        ? "blue"
                        : iconColor
                    }
                  />
                  <p className="text-sm font-medium">Like</p>
                </button>
              }
              <button
                onClick={openCommentsModal}
                className="flex lg:gap-2 gap-1 items-center  hover:bg-gray-200 p-1 rounded-lg"
              >
                <p>{total_comments > 0 ? total_comments : ""}</p>
                <Icon icon={LiaComment} size={22} color={iconColor} />
                <p className="text-sm font-medium">Comment</p>
              </button>
              <div className="w-full flex justify-end  gap-4 items-center">
                {post && author._id === myProfile._id && !isFeed && (
                  <>
                    <button
                      onClick={handleOpenEdit}
                      className="hover:bg-gray-200 p-1 rounded-lg"
                    >
                      <Icon icon={FiEdit} size={18} color={iconColor} />
                    </button>
                    <button
                      className="hover:bg-gray-200 p-1 rounded-lg"
                      onClick={() => handleDeletePost(post._id)}
                    >
                      <Icon
                        icon={RiDeleteBinLine}
                        size={20}
                        color={iconColor}
                      />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Post;
