import Skeleton from "react-loading-skeleton";

const PostSkeleton = () => {
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 mb-4 lg:w-8/12 w-full">
        {/* Post header */}
        <div className="flex items-center mb-4 gap-5">
          <Skeleton circle width={40} height={40} />
          <div>
            <Skeleton width={100} height={20} />
          </div>
        </div>
        {/* Post image */}
        <div className="mb-4 flex justify-center">
          <Skeleton className="rounded-lg" width={620} height={250} />
        </div>
        {/* Post title */}
        <div className="mb-2">
          <Skeleton width={"80%"} height={20} />
        </div>
        {/* Post Date */}
        <div>
          <Skeleton width={50} height={15} />
        </div>

        {/* Post actions */}
        <div className="flex items-center mt-3 gap-12">
          <button className="flex gap-1 items-center">
            <Skeleton width={80} height={25} />
          </button>
          <button className="flex gap-1 items-center">
            <Skeleton width={80} height={25} />
          </button>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-4 lg:w-8/12 w-full">
        {/* Post header */}
        <div className="flex items-center mb-4 gap-5">
          <Skeleton circle width={40} height={40} />
          <div>
            <Skeleton width={100} height={20} />
          </div>
        </div>
        {/* Post image */}
        <div className="mb-4 flex justify-center">
          <Skeleton className="rounded-lg" width={620} height={250} />
        </div>
        {/* Post title */}
        <div className="mb-2">
          <Skeleton width={"80%"} height={20} />
        </div>
        {/* Post Date */}
        <div>
          <Skeleton width={50} height={15} />
        </div>

        {/* Post actions */}
        <div className="flex items-center mt-3 gap-12">
          <button className="flex gap-1 items-center">
            <Skeleton width={80} height={25} />
          </button>
          <button className="flex gap-1 items-center">
            <Skeleton width={80} height={25} />
          </button>
        </div>
      </div>
    </>
  );
};

export default PostSkeleton;
