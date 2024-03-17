import React, { useState, useEffect,useRef } from "react";
import PostCreator from "../components/Post/PostCreator";
import PostSkeleton from "../components/Post/PostSkeleton";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { API } from "../API/API";
import Post from "../components/Post/Post";
import { toast } from "react-toastify";
import { UploadImage } from "../utils/UploadImage";
import CustomLoader from "../components/Loader/CustomLoader";
import BlockUi from "@availity/block-ui";
function Home() {
  const iconColor = "rgb(55 65 81)";
  const { token } = useAuth();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [feed, setFeed] = useState([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [creatingPost, setCreatingPost] = useState(false);
  const [totalPages,setTotalPages] = useState(1)

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    getMyFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]); // Re-fetch feed when page changes

  const getMyFeed = async () => {
    const query = {
      page,
      limit,
    };
    try {
      const res = await axios.get(API.Feed.getFeed, { params: query });
      setFeed([...res.data.feed,...feed]); // Append new posts to existing feed
      setTotalPages(res.data.totalPages)
      setLoadingFeed(false);
    } catch (error) {
      toast.error("Please Try Again Later !");
      setLoadingFeed(false);
    }
  };

  const createPost = async (file, title) => {
    setCreatingPost(true);
    let imageUrl = "";
    if (file) {
      try {
        imageUrl = await UploadImage(file,"fit");
      } catch (error) {
        toast.error("Please Try Again Later !");
      }
    }
    try {
      const payload = {
        title: title,
        image: imageUrl,
      };
      await axios.post(API.Posts.createNewPost, payload);
      setCreatingPost(false);
    } catch (error) {
      toast.error("Please Try Again Later !");
      setCreatingPost(false);
    }
  };
  
  

  
  return (
    <>
    <div className="lg:mx-72 mx-5 mt-5">
      <BlockUi blocking={creatingPost} loader={<CustomLoader size={40} color="blue" />}>
        <PostCreator refresh={getMyFeed} createPost={createPost} />
      </BlockUi>
      <div className="w-full flex flex-col items-center gap-8">
        {loadingFeed ? (
          <PostSkeleton />
        ) : feed.length === 0 ? (
          <p>No feed</p>
        ) : (
          feed.map((post, index) => (
            <Post key={index} post={post} refresh={getMyFeed} isFeed={true} />
          ))
        )}
      </div>
    </div>
    </>
  );
}

export default Home;
