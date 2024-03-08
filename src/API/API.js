//const base_url = "http://localhost:5000/api/v1";
const base_url = "https://scribble-api-dbra.onrender.com/api/v1";
export const API = {
  Auth: {
    login: base_url + "/auth/login", // POST
    signup: base_url + "/auth/signup", // POST
  },
  Image_Upload: base_url + "/upload", // POST
  Profile: {
    myProfile: base_url + "/profile/me", // GET
    userProfile: base_url + "/profile/:userId", // GET
    follow: base_url + "/profile/follow/:userId", // PATCH
    unfollow: base_url + "/profile/unfollow/:userId", // PATCH
    searchProfiles: base_url + "/profile/search", //GET
  },
  Posts: {
    allPosts: base_url + "/post/:userId/all", // GET
    deletePost: base_url + "/post/:postId", // DELETE
    like: base_url + "/post/:postId/like", // POST | DELETE
  },
  Comments: {
    allComments: base_url + "/post/:postId/comment", //GET
    addComment: base_url + "/post/:postId/comment", // POST
    deleteComment: base_url+"/post/:postId/comment/:commentId" //DELETE
  },
};
