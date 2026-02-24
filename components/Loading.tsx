import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="animate-spin inline-block size-10 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
