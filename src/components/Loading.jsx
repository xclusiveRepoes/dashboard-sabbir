import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-200 text-sm tracking-widest uppercase">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
