import React, { useState, useEffect } from "react";
import PostCreator from "../components/Post/PostCreator";
import PostSkeleton from "../components/Post/PostSkeleton";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { API } from "../API/API";
import Post from "../components/Post/Post";
import { toast } from "react-toastify";
import { UploadImage } from "../utils/UploadImage";
import Loading from "react-loading";
import BlockUi from "react-block-ui";
function Home() {
  const iconColor = "rgb(55 65 81)";
  const { token } = useAuth();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [feed, setFeed] = useState([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [creatingPost, setCreatingPost] = useState(false);
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    getMyFeed();
  }, []);

  useEffect(() => {
    getMyFeed();
  }, [page]);
  const getMyFeed = async () => {
    const query = {
      page,
      limit,
    };
    try {
      const res = await axios.get(API.Feed.getFeed, { params: query });
      setFeed(res.data.feed);
      setLoadingFeed(false);
    } catch (error) {
      toast.error("Please Try Again Later !");
    }
  };

  const createPost = async (file, title) => {
    setCreatingPost(true);
    let imageUrl = "";
    if (file) {
      try {
        imageUrl = await UploadImage(file);
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
    <div className="lg:mx-72 mx-5 mt-5">
      <BlockUi
        loader={
          <div className="flex justify-center">
            <Loading width={80} type="bubbles" color={iconColor}/>
          </div>
        }
        tag="div"
        blocking={creatingPost}
      >
        <PostCreator refresh={getMyFeed} createPost={createPost} />
      </BlockUi>
      <div className="w-full flex flex-col items-center gap-8">
        {loadingFeed ? (
          <PostSkeleton />
        ) : feed.length === 0 ? (
          <p>No feed</p>
        ) : (
          feed.map((post) => (
            <Post key={post.title} post={post} refresh={getMyFeed} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
