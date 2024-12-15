import React, { useState, useEffect } from 'react';
import './TwoHeadingsSlide.css'; // Assuming you have some CSS for styling

const TwoHeadingsSlide = ({ heading1, heading2, interval }) => {
  const [isHeading1Visible, setIsHeading1Visible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsHeading1Visible((prevVisibility) => !prevVisibility);
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  return (
    <div className="two-headings-slide-container">
      <div className={`heading1 ${isHeading1Visible ? 'visible' : 'hidden'} slideImage`}>{heading1}</div>
      <div className={`heading2 ${isHeading1Visible ? 'hidden' : 'visible'} slideImage`}>{heading2}</div>
    </div>
  );
};

export default TwoHeadingsSlide;
