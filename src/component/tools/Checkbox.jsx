import React from "react";

const CustomCheckbox = ({ checked, onClick }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className={`w-6 h-6 border-2 !rounded-[8px] ${
          checked ? "bg-[#00425F] border-[#00425F]" : "bg-white border-gray-400"
        } flex items-center justify-center rounded-md cursor-pointer transition-all duration-300`}
        onClick={onClick}
      >
        {checked ? (
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M20.292 6.707a1 1 0 00-1.415 0L9 16.585l-4.293-4.292a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l11-11a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CustomCheckbox;
