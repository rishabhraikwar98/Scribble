import React, { useState, useEffect } from "react";
import CommentListItem from "./CommentListItem";
import axios from "axios";
import { API } from "../API/API";
import { data } from "autoprefixer";
import Skeleton from "react-loading-skeleton";
import Loading from "react-loading";
function CommentSection({ comments, refresh, postId, loadingComments }) {
  const iconColor = "rgb(55 65 81)";
  const [newComment, setNewComment] = useState("");
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
        {!loadingComments &&
          comments.length?
          comments.map((comment) => {
            return (
              <CommentListItem
                deleteComment={deleteComment}
                key={comment._id}
                comment={comment}
              />
            );
          }):<p className="text-center font-medium mt-5 lg:text-lg text-base text-gray-500">No comments</p>}
        {loadingComments && <div className="w-full flex justify-center"><Loading type="bubbles" color={iconColor}/></div> }
      </div>
      <div className="comment-input flex justify-between mx-4 lg:mt-5">
        <input
          className="w-full rounded-md border px-3 py-2 focus:outline-none"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
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
