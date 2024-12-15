import React from 'react';

const PopupMessage = ({ message }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-message">{message}</div>
      </div>
    </div>
  );
};

export default PopupMessage;
