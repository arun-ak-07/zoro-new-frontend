import React, { useState, useEffect, useContext } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { myContext } from '../context/Context';
import '../home/home.css'

const AutoSlideCarousel = ({ interval, images }) => {
  const { products } = useContext(myContext)
  const anime=[...new Set(products.map(data=>data.anime))]
  const category=[...new Set(products.map(data=>data.category))]
  const [index, setIndex] = useState(0);
  const nav = useNavigate()
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, interval);
    return () => clearInterval(intervalId);
  }, [interval, images.length]);

  const Show =(ind) => {
    if(ind === 0){
      // alert(ind)
      nav(`/Products/${anime[3]}`)
    }
    else if(ind === 1){
      // alert(ind)
      nav(`/ProductsDisplay/${category[3]}`)
    }
    else if(ind === 2){
      // alert(ind)
      nav(`/ProductsDisplay/${category[0]}`)
    }
    
    
    // alert(ind)
  }

  return (
    <Carousel activeIndex={index} onSelect={(selectedIndex) => setIndex(selectedIndex)} controls={false} style={{cursor:'pointer'}}>
      {images.map((image, idx) => (
        <Carousel.Item key={idx}>
         <img onClick={()=>Show(idx)}
            height={600}
            width="100%"
            src={image}
            alt={`Slide ${idx + 1}`}
            className='carouselImages'
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default AutoSlideCarousel;
