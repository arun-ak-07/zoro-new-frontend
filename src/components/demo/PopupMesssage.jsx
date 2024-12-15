import React, { useState, useEffect } from 'react';
import './PopupMessage.css'; // Import CSS file for styling

function PopupMessage() {
  const [showPopup, setShowPopup] = useState(false);

  // Function to toggle the visibility of the popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Function to hide the popup after 5 seconds
  useEffect(() => {
    let timer;
    if (showPopup) {
      timer = setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showPopup]);

  return (
    <div>
      {/* Button to trigger the popup message */}
      <button onClick={togglePopup}>Place Order</button>

      {/* Popup message */}
      {showPopup && (
        <div className="popup-container">
          <div className="popup-message">
            <h2>Your product is placed!</h2>
            {/* Fireworks animation */}
            <div className="fireworks">
              {/* Generate multiple fireworks */}
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="firework" style={{ animationDelay: `${index * 0.2}s` }}></div>
              ))}
            </div>
            <button onClick={togglePopup} style={{border:'none',backgroundColor:'white'}}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupMessage;
