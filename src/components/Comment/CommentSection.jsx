import React, { useContext, useEffect, useState } from "react";
import CommentListItem from "../Comment/CommentListItem";
import axios from "axios";
import { API } from "../../API/API";
import Loading from "react-loading";
import { ProfileContext } from "../../context/ProfileContext";

function CommentSection({ comments, refresh, postId, loadingComments }) {
  const iconColor = "rgb(55 65 81)";
  const { myProfile } = useContext(ProfileContext);
  const [newComment, setNewComment] = useState("");
  const [isMyPost, setIsMyPost] = useState(false);
  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = async () => {
    let URI = API.Posts.allPosts.replace(":userId", myProfile._id);
    try {
      const res = await axios.get(URI);
      if (res.data.posts.map((p) => p._id).filter((p) => p === postId).length) {
        setIsMyPost(true);
      } else {
        setIsMyPost(false);
      }
    } catch (error) {}
  };
  const submitComment = async () => {
    setNewComment("");
    const URI = API.Comments.addComment.replace(":postId", postId);
    try {
      const payload = {
        comment: newComment,
      };
      await axios.post(URI, payload);
      await refresh();
    } catch (error) {}
  };
  const deleteComment = async (commentId) => {
    const URI =
      API.Comments.addComment.replace(":postId", postId) + `/${commentId}`;
    try {
      await axios.delete(URI);
      await refresh();
    } catch (error) {}
  };

  return (
    <div className="comment-section">
      <div className="comments min-h-80 overflow-y-auto max-h-80">
        {loadingComments && (
          <div className="w-full flex justify-center">
            <Loading type="bubbles" color={iconColor} />
          </div>
        )}
        {!loadingComments && comments.length === 0 && (
          <p className="text-center font-medium mt-5 lg:text-lg text-base text-gray-500">
            No comments
          </p>
        )}
        {!loadingComments && comments.length
          ? comments.map((comment,index) => {
              return (
                <CommentListItem
                  deleteComment={deleteComment}
                  key={index}
                  comment={comment}
                  isMyPost={isMyPost}
                />
              );
            })
          : ""}
      </div>
      <div className="comment-input flex justify-between mx-4 lg:mt-5">
        <input
          autoFocus
          className="w-full rounded-md border px-3 py-2 focus:outline-none"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 text-lg font-medium text-gray-600"
          onClick={submitComment}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default CommentSection;
