import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../home/NavBarHover.css';

function NavBarHover() {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="App">
      <Link style={{color:'white'}}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}>
        SHOP BY ANIME
      </Link>
      {isShown && (
  <div className="anime-dropdown" style={{ position: 'absolute', top: '60%', }}>
             onMouseEnter={() => setIsShown(true)}
             onMouseLeave={() => setIsShown(false)}
             
          <div style={{background:'black',height:'230px',width:'400px',display:'flex',flexDirection:'row',paddingTop:'10px'}}>
          <div style={{height:'100%',width:'100%',display:'flex',flexDirection:'column',justifyContent:'left',paddingLeft:'20px'}}>
        <Link className='linksN'>NARUTO</Link>
        <Link className='linksN'>ONE PIECE</Link>
        <Link className='linksN'>JUJUSTU KAISEN</Link>
        <Link className='linksN'>TOKYO REVENGERS</Link>
          </div>
          <div style={{height:'100%',width:'100%',display:'flex',flexDirection:'column',justifyContent:'left'}}>
        <Link className='linksN'>DRAGON BALL</Link>
        <Link className='linksN'>ATTACK ON TITAN</Link>
        <Link className='linksN'>DEMON SLAYER</Link>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default NavBarHover;

 
    