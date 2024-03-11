import React from "react";

const NoPosts = () => {
  return (
    <div className="flex flex-col items-center lg:mt-14 mt-8 justify-center lg:p-8 p-4 py-5">
      <h1 className="lg:text-2xl text-xl font-medium text-gray-700">
        You don't have any posts yet!
      </h1>
      <p className="mt-4 text-sm lg:text-base text-gray-500 text-center">
        Start creating posts to share your thoughts and experiences.
      </p>
    </div>
  );
};

export default NoPosts;
