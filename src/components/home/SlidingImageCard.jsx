import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import './SlidingCard.css'; // Import CSS file for styling

const SlidingImageCard = ({ images, title, description }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sliding-card">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={images[currentImageIndex]} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <div>
            <Button variant="primary" onClick={previousImage}>
              Previous
            </Button>{' '}
            <Button variant="primary" onClick={nextImage}>
              Next
            </Button>{' '}
            <Button variant="primary" onClick={toggleCard}>
              {isOpen ? 'Close' : 'Open'}
            </Button>
          </div>
        </Card.Body>
      </Card>
      <div className={`overlay ${isOpen ? 'show' : ''}`} onClick={toggleCard}></div>
    </div>
  );
};

export default SlidingImageCard;
