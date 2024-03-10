import React, { useEffect, useState,useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { API } from "../API/API";
import axios from "axios";
import Post from "../components/Post/Post";
import no_user from "../assets/no_user.png";
import Skeleton from "react-loading-skeleton";
import NoPosts from "../components/Post/NoPosts";
import PostSkeleton from "../components/Post/PostSkeleton";
import Modal from "../components/Modal/Modal";
import UserListItem from "../components/UserList/UserListItem";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { toast } from "react-toastify";
import { ProfileContext } from "../context/ProfileContext";
function MyProfile() {
  const { token } = useAuth();
  const {myProfile,setMyProfile} = useContext(ProfileContext)
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [title, setTitle] = useState("");
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingProfile,setLoadingProfile] =useState(true)
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    getMyProfile();
    getAllPosts();
  }, []);
  const getMyProfile = async () => {
    try {
      setLoadingProfile(true)
      const res = await axios.get(API.Profile.myProfile);
      setLoadingProfile(false)
      setMyProfile(res.data.myProfile);
    } catch (error) {
      toast.error("Please Try Again Later !");
    }
  };
  const getAllPosts = async () => {
    let URI = API.Posts.allPosts.replace(":userId", myProfile._id);
    try {
      const res = await axios.get(URI);
      setPosts(res.data.posts);
      setLoadingPosts(false);
    } catch (error) {
      toast.error("Please Try Again Later !");
    }
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = (title) => {
    setTitle(title);
    setShowModal(true);
  };

  // profile actions
  const isFollowing = (id) => {
    if (
      myProfile.following.filter((user) => {
        return user._id === id;
      }).length
    ) {
      return true;
    }
    return false;
  };
  const followUser = async (id) => {
    try {
      setLoading(true);
      let URI = API.Profile.follow.replace(":userId", id);
      await axios.patch(URI);
      await getMyProfile();
      setLoading(false);
    } catch (error) {
      toast.error("Please Try Again Later !");
    }
  };
  const unfollowUser = async (id) => {
    try {
      setLoading(true);
      let URI = API.Profile.unfollow.replace(":userId", id);
      await axios.patch(URI);
      await getMyProfile();
      setLoading(false);
    } catch (error) {
      toast.error("Please Try Again Later !");
    }
  };

  return (
    <div className="layout scroll scroll-smooth">
      {/* Followers/Following Modal */}
      <Modal title={title} isOpen={showModal} onClose={closeModal}>
        <div className="overflow-y-auto lg:max-h-96 max-h-80">
          <BlockUi blocking={loading} tag="div">
            {title === "Followers" && !myProfile.followers.length ? (
              <p className="text-center font-medium mt-5 lg:text-lg text-base text-gray-500">
                No Followers
              </p>
            ) : (
              ""
            )}
            {title === "Following" && !myProfile.following.length ? (
              <p className="text-center font-medium mt-5 lg:text-lg text-base text-gray-500">
                Following None
              </p>
            ) : (
              ""
            )}
            {title === "Followers" &&
              myProfile.followers.map((user) => {
                return (
                  <UserListItem
                    key={user._id}
                    followUser={followUser}
                    unfollowUser={unfollowUser}
                    user={user}
                    isFollowing={isFollowing}
                    loading={loading}
                  />
                );
              })}
            {title === "Following" &&
              myProfile.following.map((user) => {
                return (
                  <UserListItem
                    key={user._id}
                    followUser={followUser}
                    unfollowUser={unfollowUser}
                    user={user}
                    isFollowing={isFollowing}
                    loading={loading}
                  />
                );
              })}
          </BlockUi>
        </div>
      </Modal>
      {/* profile */}
      <div className="box lg:mx-72 mx:20 lg:mt-12 mt-5">
        <div className="info flex items-center gap-5 mx-5">
          <div className="avatar">
            {!loadingProfile ? (
              <img
                draggable="false"
                alt="avatar"
                src={ myProfile.avatar || no_user}
                className="lg:w-24 w-16 rounded-full"
              />
            ) : (
              <Skeleton circle width={100} height={100} />
            )}
          </div>
          <div className="name">
            <p className="font-medium text-xl lg:text-2xl mb-.5">
              {!loadingProfile ? (
                myProfile.name
              ) : (
                <Skeleton style={{ width: "150px" }} />
              )}
            </p>
            <p className="font-medium text-gray-500 text-md lg:text-lg">
              {!loadingProfile ? "@" + myProfile.user_name : <Skeleton />}
            </p>
          </div>
        </div>
        <div className="stats flex justify-between lg:gap-16 lg:mx-10 mx-12 text-center mt-5 lg:absolute lg:right-80 lg:top-28">
          <div className="p-1">
            <p className="lg:text-2xl text-xl font-medium">
              {!loadingProfile ? myProfile.total_posts : <Skeleton />}
            </p>
            <p className="lg:text-lg text-base text-gray-600 font-medium">
              Posts
            </p>
          </div>
          <div
            onClick={() => openModal("Followers")}
            className="p-1 ml-4 cursor-pointer"
          >
            <p className="lg:text-2xl text-xl font-medium">
              {!loadingProfile ? myProfile.followers.length : <Skeleton />}
            </p>
            <p className="lg:text-lg text-base text-gray-600 font-medium">
              Followers
            </p>
          </div>
          <div
            onClick={() => openModal("Following")}
            className="p-1 cursor-pointer"
          >
            <p className="lg:text-2xl text-xl font-medium">
              {!loadingProfile ? myProfile.following.length : <Skeleton />}
            </p>
            <p className="lg:text-lg text-base text-gray-600 font-medium">
              Following
            </p>
          </div>
        </div>
        <div className="about mx-6 lg:mt-8 mt-4">
          <p className="text-base font-medium">About Me</p>
          <div className="lg:w-11/12 w-full">
            <p className="text-base text-gray-500">
              {!loadingProfile ? myProfile.bio : <Skeleton />}
            </p>
          </div>
        </div>
        {/* Posts */}
        <div className="posts mt-10 mx-5">
          <p className="text-2xl mb-5 font-medium text-gray-700">Posts</p>
          <div className="w-full flex flex-col items-center gap-8">
            {loadingPosts ? (
              <PostSkeleton />
            ) : posts.length === 0 ? (
              <NoPosts />
            ) : (
              posts.map((post) => (
                <Post key={post.title} post={post} refresh={getAllPosts} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
