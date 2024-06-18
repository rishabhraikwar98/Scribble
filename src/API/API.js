const BASE_URL = process.env.REACT_APP_BASE_URL+"/api/v1";
export const API = {
  Auth: {
    login: BASE_URL + "/auth/login", // POST
    signup: BASE_URL + "/auth/signup", // POST
    changePassword: BASE_URL+"/auth/change-password" // PATCH
  },
  Image_Upload: BASE_URL + "/upload", // POST
  Profile: {
    myProfile: BASE_URL + "/profile/me", // GET
    updateMyProfile: BASE_URL + "/profile/me", // PATCH
    userProfile: BASE_URL + "/profile/:userId", // GET
    follow: BASE_URL + "/profile/follow/:userId", // PATCH
    unfollow: BASE_URL + "/profile/unfollow/:userId", // PATCH
    searchProfiles: BASE_URL + "/profile/search", //GET
  },
  Posts: {
    allPosts: BASE_URL + "/post/:userId/all", // GET
    createNewPost: BASE_URL + "/post", // POST
    deletePost: BASE_URL + "/post/:postId", // DELETE
    editPost: BASE_URL + "/post/:postId", // Patch
    like: BASE_URL + "/post/:postId/like", // POST | DELETE
  },
  Comments: {
    allComments: BASE_URL + "/post/:postId/comment", //GET
    addComment: BASE_URL + "/post/:postId/comment", // POST
    deleteComment: BASE_URL + "/post/:postId/comment/:commentId", //DELETE
  },
  Feed: {
    getFeed: BASE_URL + "/home/feed", //GET
  },
};
