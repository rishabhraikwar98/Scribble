import React, { useContext, useState } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { FaImage } from "react-icons/fa";
import { RiSendPlane2Line, RiCloseCircleLine } from "react-icons/ri";
import no_user from "../../assets/no_user.png";
import { UploadImage } from "../../utils/UploadImage";
const PostCreator = ({ refresh, createPost }) => {
  const { myProfile } = useContext(ProfileContext);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title && !file) {
      return;
    }
    await createPost(file, title);
    setTitle("");
    setFile(null);
    setImagePreview(null);
    await refresh();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if(selectedFile){
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-gray-50 p-3 px-5 border rounded-lg shadow-sm mb-8  lg:w-9/12 w-full">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <img
              src={myProfile ? myProfile.avatar : no_user} // Placeholder image
              alt="Profile"
              className="absolute w-10 h-10 rounded-full left-0 top-0 mt-2 ml-2"
            />
            <textarea
              className="w-full lg:h-28 h-24 p-4 border border-gray-300 rounded-md resize-none focus:outline-none pl-14"
              placeholder="What's on your mind?"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            ></textarea>
            <label
              htmlFor="fileInput"
              className="cursor-pointer absolute right-0 top-0 lg:mt-4 mt-2 lg:mr-6 mr-3"
            >
              <FaImage size={24} className="text-blue-500" />
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Selected"
                className="absolute w-10 h-10 object-cover rounded lg:right-2 right-0 lg:bottom-2 bottom-1 mb-2 mr-2"
              />
            )}
          </div>
          <div className="flex justify-between mt-2">
            {title || imagePreview ? (
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300 text-sm flex items-center"
                onClick={() => {
                  setTitle("");
                  setFile(null);
                  setImagePreview(null);
                }}
              >
                <RiCloseCircleLine className="inline-block mr-1" />
                Clear
              </button>
            ) : null}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 text-sm flex items-center"
            >
              <RiSendPlane2Line className="inline-block mr-1" />
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostCreator;
