import React, { useContext, useState } from 'react'
import TwoHeadingsSlide from './TwoHeadingsSlide'
import { Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdHeartEmpty } from 'react-icons/io'
import { IoCartOutline } from 'react-icons/io5'
import DropdownBox from './DropdownBox'
import { FaAngleDown } from 'react-icons/fa'
import DropdownBox1 from './DropdownBox1'
import PopOverSearchButton from './PopoverSearchButton'
import myVideo from '../home/ZORO.gif';
import { myContext } from '../context/Context'
import DropDown from './DropDown'
import Offcanvas from 'react-bootstrap/Offcanvas';
import './home.css'
import './header.css'

const Header = () => {

    const { newCategory, setNewCategory,products,searchItem } = useContext(myContext)

    const heading1 = 'NOW ENJOY ALL INDIA FREE SHIPPING ON EVERY ORDER'; // First heading text
    const heading2 = 'EXTRA 5% DISCOUNT FOR ALL ONLINE PAYMENTS'; // Second heading text
    const interval = 3000; // Interval between heading changes (in milliseconds)
    const [isShopByAnimeHovered, setIsShopByAnimeHovered] = useState(false);
    const [isShopByProducts, setIsShopByProducts] = useState(false);

    const nav = useNavigate()
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showProd, setShowProd] = useState(false);
    const [showAnime, setShowAnime] = useState(false);
    const category=[...new Set(products.map(data=>data.category))]
    const anime=[...new Set(products.map(data=>data.anime))]

  return (
    <>
    <div className="header01" class="bg-variant text-white header01" style={{ display: 'flex', flexDirection: 'row' }}>
                    <TwoHeadingsSlide heading1={heading1}  heading2={heading2} interval={interval} />
                </div>

                <div className="header02">
                    <div className="headerLeft1">
                        <Navbar expand="lg" variant="dark">
                            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleShow} />
                        
      <Offcanvas show={show} onHide={handleClose} style={{width:'70%'}} className="custom-offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='no-padding no-margin'><Link to='/' style={{color:'black',fontSize:'14px'}}>HOME</Link></Offcanvas.Title>
        </Offcanvas.Header>
        <hr />
        <Offcanvas.Body className='d-flex flex-column'>
          <div className='d-flex justify-content-between align-items-center'><Link style={{color:'black', fontSize:'14px'}}>SHOP BY PRODUCTS</Link>
          {
            showProd === true ?
            <button onClick={()=>setShowProd(false)} className='border-0 bg-transparent fs-1'>-</button>
            :
            <button onClick={()=>setShowProd(true)} className='border-0 bg-transparent fs-1'>+</button>
          }
          </div>
          <hr style={{margin:'0px'}}/>
            {
                showProd === true &&
            <>
            <Link style={{color:'black',fontSize:'14px',marginTop:'12px'}} to={(`/ProductsDisplay/${category[8]}`)}>T-SHIRTS</Link>
          <hr />
          <Link style={{color:'black',fontSize:'14px'}}  to={(`/ProductsDisplay/${category[1]}`)}>WINTER WEAR</Link>
          <hr />
          <Link style={{color:'black',fontSize:'14px'} } to={(`/ProductsDisplay/${category[5]}`)}>JACKETS</Link>
          <hr />
          <Link style={{color:'black',fontSize:'14px'} } to={(`/ProductsDisplay/${category[6]}`)}>HOODIES</Link>
          <hr />
            </>
            }

          <div className='d-flex justify-content-between align-items-center'><Link style={{color:'black',fontSize:'14px'}}>SHOP BY ANIME</Link>
          {
            showAnime === true ?
            <button onClick={()=>setShowAnime(false)} className='border-0 bg-transparent fs-1'>-</button>
            :
            <button onClick={()=>setShowAnime(true)} className='border-0 bg-transparent fs-1'>+</button>
          }
          </div>
          <hr style={{margin:'0px'}}/>
            {
                showAnime === true &&
            <>
            <Link style={{color:'black',fontSize:'14px',marginTop:'12px'}} to={(`/Products/${anime[0]}`)}>NARUTO</Link>
          <hr />
          <Link style={{color:'black',fontSize:'14px'}} to={(`/Products/${anime[4]}`)}>ONE PIECE</Link>
          <hr />
          <Link style={{color:'black',fontSize:'14px'}} to={(`/Products/${anime[2]}`)}>JUJUSTU KAISEN</Link>
          <hr />
          <Link style={{color:'black',fontSize:'14px'}} to={(`/Products/${anime[0]}`)}>TOKYO REVENGERS</Link>
          <hr />
          <Link style={{color:'black',fontSize:'14px'}} to={(`/Products/${anime[5]}`)}>DRAGON BALL</Link>
          <hr />
          <Link style={{color:'black',fontSize:'14px'}} to={(`/Products/${anime[6]}`)}>ATTACK ON TITAN</Link>
          <hr />
          <Link style={{color:'black',fontSize:'14px'}} to={(`/Products/${anime[1]}`)}>DEMON SLAYER</Link>
          <hr />
            </>
            }


          <Link style={{color:'black',fontSize:'14px',marginTop:'12px'}} to={(`/ProductsDisplay/${category[3]}`)}>COMBO</Link>
          <hr />
          <Link style={{color:'black',fontSize:'14px'}} to={'/NewLaunch'}>NEW LAUNCH</Link>
          <hr />
          <Link style={{color:'black',fontSize:'14px'}} to={'/Login'}>LOGIN</Link>
          <hr />
          <Link style={{color:'black',fontSize:'14px'}} to={'/RegisterForm'}>REGISTER NOW</Link>
          <hr />
          <Link style={{color:'black',fontSize:'14px'}} to={'/Wishlist'}>WISHLIST</Link>
        </Offcanvas.Body>
      </Offcanvas>
    
                        </Navbar>
                        
                        <div style={{ fontSize: '16px', paddingLeft: '100px' }} className='logoTitle cursor-pointer' >
                            <Link to={('/')}><img src={myVideo} alt='ZORO' height={65} width={65}/></Link>
                        </div>
                        <Navbar expand="lg" variant="dark" style={{ width: '100%', height: '100%' }}>
                            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                            <Navbar.Collapse>
                                <Nav className="mr-auto" style={{
                                    display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', marginTop: '16px', marginLeft: '100px'
                                }}>
                                    <Nav.Link><p className="headerTitles1">HOME</p></Nav.Link>
                                    <Nav.Link
                                        onMouseEnter={() => setIsShopByProducts(true)}
                                        onMouseLeave={() => setIsShopByProducts(false)}
                                        style={{ position: 'relative', display: 'flex', alignItems: 'center' }} // Set position relative to parent link and align items to center
                                    >
                                        <p className="headerTitles1">SHOP BY PRODUCTS</p> {isShopByProducts ? <FaAngleDown style={{ marginBottom: '20px' }} /> : <FaAngleDown style={{ marginBottom: '20px' }} />}
                                        {isShopByProducts && <DropdownBox1 onMouseEnter={() => setIsShopByProducts(true)} onMouseLeave={() => setIsShopByProducts(false)} />} {/* Render dropdown if hovered */}
                                    </Nav.Link>

                                    <Nav.Link
                                        onMouseEnter={() => setIsShopByAnimeHovered(true)}
                                        onMouseLeave={() => setIsShopByAnimeHovered(false)}
                                        style={{ position: 'relative', display: 'flex', alignItems: 'center' }} // Set position relative to parent link and align items to center
                                    >
                                        <p className="headerTitles1">SHOP BY ANIME</p>
                                        {isShopByAnimeHovered ? <FaAngleDown style={{ marginBottom: '20px' }} /> : <FaAngleDown style={{ marginBottom: '20px' }} />} {/* Render arrow based on hover */}
                                        {isShopByAnimeHovered && <DropdownBox onMouseEnter={() => setIsShopByAnimeHovered(true)} onMouseLeave={() => setIsShopByAnimeHovered(false)} />} {/* Render dropdown if hovered */}
                                    </Nav.Link>


                                    <Nav.Link onClick={()=>nav(`/ProductsDisplay/${category[3]}`)}><p className="headerTitles1">COMBO</p></Nav.Link>
                                    <Nav.Link onClick={()=>nav('/NewLaunch')}><p className="headerTitles1">NEW LAUNCH</p></Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                    <div className="headerRight1" >
                        <Navbar expand="lg" variant="dark"
                        >
                            {/* <Navbar.Collapse id="basic-navbar-nav" > */}
                                <Nav className="mr-auto iconsNav" style={{ display: "flex", alignItems: "center", gap: "0" }}
                                >
                                    <PopOverSearchButton  />
                                    <Nav.Link onClick={()=>nav('/Wishlist')}><IoMdHeartEmpty className="headerRightIcons1 heaer " /></Nav.Link>
                                    <Nav.Link onClick={()=>nav('/cart/:productId')}><IoCartOutline  className="headerRightIcons1" /></Nav.Link>
                                    <DropDown />
                                </Nav>
                            {/* </Navbar.Collapse> */}
                        </Navbar>

                    </div>


                </div>
    </>
  )
}

export default Header
