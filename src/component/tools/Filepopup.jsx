import React from "react";
import { useNavigate } from "react-router-dom";

const Filepopup = ({ popupContent, closePopup }) => {
  const navigate = useNavigate();

  const handleReplace = () => {
    sessionStorage.removeItem("file_name");
    sessionStorage.removeItem("session_id");
    navigate("/upload1");
  };
  return (
    popupContent && (
      <div className="popup-overlay" onClick={closePopup}>
        <div
          className="popup-content bg-[#ECEFF6]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center">
            <h4 className="text-start text-xl font-bold">
              Select another file
            </h4>
            <button
              onClick={closePopup}
              className="border border-[#FFFFFF] text-[#52AE30] bg-white rounded-[50px] pb-3 text-3xl w-10 h-10"
            >
              &times;
            </button>
          </div>
          <div className="h-[110px] border my-4 rounded-[25px] bg-white flex flex-col justify-center items-center gap-1">
            <div className="text-sm text-black font-semibold">
              The uploaded file is about to be replaced.
            </div>
            <div className="text-sm text-black font-semibold">
              Do you want to procced?{" "}
            </div>
            <div className="text-[11px] text-[#585757] font-medium">
              The columns selection would be lost.
            </div>
          </div>
          <div className="flex justify-center gap-4 items-center select-none">
            <div
              className="px-6 py-2.5 text-[#52AE30] bg-white rounded-[25px] text-sm shadow-md cursor-pointer"
              onClick={closePopup}
            >
              Keep the original file{" "}
            </div>
            <div
              className="px-6 py-2.5 text-white bg-[#FF435A] rounded-[25px] text-sm shadow-md cursor-pointer"
              onClick={handleReplace}
            >
              Replace
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Filepopup;
