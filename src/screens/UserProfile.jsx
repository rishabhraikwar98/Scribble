import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { API } from "../API/API";
import axios from "axios";
import Post from "../components/Post/Post";
import no_user from "../assets/no_user.png";
import Skeleton from "react-loading-skeleton";
import NoPostsUser from "../components/Post/NoPostsUser";
import PostSkeleton from "../components/Post/PostSkeleton";
import Modal from "../components/Modal/Modal";
import UserListItem from "../components/UserList/UserListItem";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ProfileContext } from "../context/ProfileContext";
import BlockUi from "@availity/block-ui";
import CustomLoader from "../components/Loader/CustomLoader";
import {motion} from "framer-motion"
function UserProfile() {
  const { token } = useAuth();
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [title, setTitle] = useState("");
  const { myProfile, setMyProfile } = useContext(ProfileContext);
  const [loading, setLoading] = useState(false);
  const [block, setBlock] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setShowModal(false)
    setLoadingPosts(true)
    getUserProfile();
    getMyProfile();
    getAllPosts();
  }, [userId]);
  const getUserProfile = async () => {
    try {
      setLoadingProfile(true)
      const URI = API.Profile.userProfile.replace(":userId", userId);
      const res = await axios.get(URI);
      setUserProfile(res.data.profile);
      setLoadingProfile(false)
    } catch (error) {
      toast.error("Please Try Again Later !");
    }
  };
  const getAllPosts = async () => {
    let URI = API.Posts.allPosts.replace(":userId", userId);
    try {
      const res = await axios.get(URI);
      setPosts(res.data.posts);
      setLoadingPosts(false);
    } catch (error) {
      toast.error("Please Try Again Later !");
    }
  };
  const getMyProfile = async () => {
    try {
      const res = await axios.get(API.Profile.myProfile);
      setMyProfile(res.data.myProfile);
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

  // profile actions
  const followUser = async (id) => {
    try {
      setLoading(true);
      let URI = API.Profile.follow.replace(":userId", id);
      await axios.patch(URI);
      await getUserProfile();
      await getMyProfile();
      setLoading(false);
      toast.success(`Started Following ${userProfile.user_name}`);
    } catch (error) {
      toast.error("Please Try Again Later !");
    }
  };
  const unfollowUser = async (id) => {
    try {
      setLoading(true);
      let URI = API.Profile.unfollow.replace(":userId", id);
      await axios.patch(URI);
      await getUserProfile();
      await getMyProfile();
      setLoading(false);
      toast.success(`Removed ${userProfile.user_name}`);
    } catch (error) {
      toast.error("Please Try Again Later !");
    }
  };
  return (
    <>
      {/* Followers/Following Modal */}
      <Modal title={title} isOpen={showModal} onClose={closeModal}>
        <BlockUi blocking={loading} >
          <div className="overflow-y-auto lg:max-h-96 max-h-80">
            <div>
              {title === "Followers" && !userProfile.followers.length ? (
                <p className="text-center font-medium mt-5 lg:text-lg text-base text-gray-500">
                  No Followers
                </p>
              ) : (
                ""
              )}
              {title === "Following" && !userProfile.following.length ? (
                <p className="text-center font-medium mt-5 lg:text-lg text-base text-gray-500">
                  Following No One
                </p>
              ) : (
                ""
              )}
              {title === "Followers" &&
                userProfile.followers.map((user, index) => {
                  return (
                    <UserListItem
                      key={index}
                      followUser={followUser}
                      unfollowUser={unfollowUser}
                      user={user}
                      isFollowing={isFollowing}
                    />
                  );
                })}
              {title === "Following" &&
                userProfile.following.map((user, index) => {
                  return (
                    <UserListItem
                      key={index}
                      followUser={followUser}
                      unfollowUser={unfollowUser}
                      user={user}
                      isFollowing={isFollowing}
                    />
                  );
                })}
            </div>
          </div>
        </BlockUi>
      </Modal>
      {/* profile */}
      <BlockUi
        blocking={block}
        loader={<CustomLoader size={40} color="blue" />}
      >
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.3}} className="layout scroll-smooth">
          <div className="box lg:mx-72 mx:20 lg:mt-12 mt-5">
            <div className="lg:flex lg:justify-between lg:items-center">
              <div className="info flex items-center gap-5 mx-10 lg:mx-5">
                <div className="avatar">
                  {!loadingProfile ? (
                    <img
                      draggable="false"
                      alt="avatar"
                      src={userProfile.avatar || no_user}
                      className="lg:w-24 w-16 rounded-full"
                    />
                  ) : (
                    <Skeleton circle width={100} height={100} />
                  )}
                </div>
                <div className="name">
                  <p className="font-medium text-xl lg:text-2xl mb-.5">
                    {!loadingProfile ? (
                      userProfile.name
                    ) : (
                      <Skeleton style={{ width: "150px" }} />
                    )}
                  </p>
                  <p className="font-medium text-gray-500 text-md lg:text-lg">
                    {!loadingProfile ? "@" + userProfile.user_name : <Skeleton />}
                  </p>
                </div>
              </div>
              <div className="stats flex justify-between lg:gap-16 lg:mx-10 mx-12 text-center my-5">
                <div className="p-1">
                  <p className="lg:text-2xl text-xl font-medium">
                    {!loadingProfile ? userProfile.total_posts : <Skeleton />}
                  </p>
                  <p className="lg:text-lg text-base text-gray-600 font-medium">
                    Posts
                  </p>
                </div>
                <div
                  onClick={() => openModal("Followers")}
                  className="p-1 lg:ml-4 ml-7 cursor-pointer"
                >
                  <p className="lg:text-2xl text-xl font-medium">
                    {!loadingProfile ? userProfile.followers.length : <Skeleton />}
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
                    {!loadingProfile ? userProfile.following.length : <Skeleton />}
                  </p>
                  <p className="lg:text-lg text-base text-gray-600 font-medium">
                    Following
                  </p>
                </div>
              </div>
            </div>
            {userProfile&&!loadingProfile && (
              <div className="lg:ml-5 lg:block w-full lg:w-auto flex justify-center lg:mt-6 mt-4">
                {myProfile && !isFollowing(userProfile._id) ? (
                  <button
                    onClick={async () => {
                      setBlock(true);
                      await followUser(userId);
                      setBlock(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-md text-white font-medium px-6 py-1.5 rounded-lg w-11/12 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-700 lg:w-32"
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      setBlock(true);
                      await unfollowUser(userId);
                      setBlock(false);
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-md font-medium px-6 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-500 w-11/12 lg:w-32"
                  >
                    Unfollow
                  </button>
                )}
              </div>
            )}
            <div className="about mx-6 lg:mt-8 mt-4">
              <p className="text-base font-medium">About Me</p>
              <div className="lg:w-11/12 w-full">
                <p className="text-base text-gray-500">
                  {!loadingProfile ? userProfile.bio : <Skeleton />}
                </p>
              </div>
            </div>
            {/* Posts */}
            <div className="posts mt-10 mx-5">
              <p className="text-2xl mb-5 font-medium text-gray-700">Posts</p>
              <div className="w-full flex flex-col items-center gap-10">
                {loadingPosts ? (
                  <PostSkeleton />
                ) : posts.length === 0 ? (
                  <NoPostsUser />
                ) : (
                  posts.map((post) => (
                    <Post
                      key={post.title}
                      post={post}
                      refresh={getAllPosts}
                      isFeed={false}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </BlockUi>
    </>
  );
}

export default UserProfile;
