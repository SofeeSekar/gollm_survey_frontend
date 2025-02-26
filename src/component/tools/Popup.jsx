import React from "react";

const Popup = ({ popupContent, closePopup }) => {
    console.log(popupContent);
    
  return (
    popupContent && (
      <div className="popup-overlay" onClick={closePopup}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-popup" onClick={closePopup}>
            &times;
          </button>
          <h4 className="text-center text-xl font-bold py-4">Select another file</h4>
          <p className="text-md">{popupContent}</p>
        </div>
      </div>
    )
  );
};

export default Popup;
