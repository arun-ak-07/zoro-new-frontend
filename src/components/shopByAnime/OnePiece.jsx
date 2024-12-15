import React, { useContext,  useEffect,  useState } from 'react';
import { Navbar, Nav, Image, Card } from 'react-bootstrap';
import { IoCartOutline } from 'react-icons/io5';
import '../shopByAnime/OnePiece.css';
import TwoHeadingsSlide from '../home/TwoHeadingsSlide';
import { myContext } from '../context/Context';
import PopOverSearchButton from '../home/PopoverSearchButton';
import myVideo from '../home/ZORO.gif';
import DropDown from '../home/DropDown';
import { IoMdHeartEmpty } from "react-icons/io";
import DropdownBox1 from '../home/DropdownBox1';
import DropdownBox from '../home/DropdownBox';
import { Link, useNavigate } from 'react-router-dom';
import '../shopByAnime/Naruto.css'
import { FaAngleDown, FaRegHeart } from 'react-icons/fa6';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaSearchPlus } from 'react-icons/fa';
import axios from 'axios';
import { backendUrl } from '../../utils/utils';


const OnePice = () => {
    const { products,setProducts } = useContext(myContext)
    const heading1 = 'NOW ENJOY ALL INDIA FREE SHIPPING ON EVERY ORDER'; // First heading text
    const heading2 = 'EXTRA 5% DISCOUNT FOR ALL ONLINE PAYMENTS'; // Second heading text
    const interval = 3000; // Interval between heading changes (in milliseconds)
    const [isShopByAnimeHovered, setIsShopByAnimeHovered] = useState(false);
    const [isShopByProducts, setIsShopByProducts] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [onePiece,setOnePiece] = useState([])
    // const [products,setProducts] = useState([])
    const nav = useNavigate()
    
    console.log("Products",products)
    
    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
      };
    
      const handleMouseLeave = () => {
        setHoveredIndex(null);
      };
      
      useEffect(() => {
        fetchProducts()
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get(`${backendUrl}/Product/products`)
        setProducts(response.data)
    }
    useEffect(() => {
        handleOnePiece()
    })

    function handleOnePiece(){
        setOnePiece(products.filter((data) => (data.anime === "one piece")))
    }

      console.log("Naruto",onePiece)
    return (
        <div className="main1H">

            <div className="header1H">

                <div className="header01H" class="bg-primary text-white header01" style={{ display: 'flex', flexDirection: 'row' }}>
                    <TwoHeadingsSlide heading1={heading1} heading2={heading2} interval={interval} />
                </div>

                <div className="header02H">
                    <div className="headerLeft1H">
                        <div style={{ fontSize: '16px', paddingLeft: '100px' }} >
                        <img src={myVideo} alt='ZORO' height={65} width={65} />
                        </div>
                        <Navbar expand="lg" variant="dark" style={{ width: '100%', height: '100%' }}>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto" style={{
                                     display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', marginTop: '16px',marginLeft:'100px' }}>
                                    <Nav.Link onClick={()=>nav('/')}><p className="headerTitles1H">HOME</p></Nav.Link>
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

                                    <Nav.Link><p className="headerTitles1H">COMBO</p></Nav.Link>
                                    <Nav.Link><p className="headerTitles1H">NEW LAUNCH</p></Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                    <div className="headerRight1H" >
                        <Navbar expand="lg" variant="dark"
                        >
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav" >
                                <Nav className="mr-auto" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "5px" }}
                                >
                                    <PopOverSearchButton />
                                    <Nav.Link><IoMdHeartEmpty className="headerRightIcons1H" /></Nav.Link>
                                    <Nav.Link><IoCartOutline className="headerRightIcons1H" /></Nav.Link>
                                    <DropDown/>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>

                    </div>


                </div>
            </div>

            <div className="center1N">
                
                <div className='narutoTitle'><h1>One Piece</h1></div>
                <div className="narutoTitleImage">
                        <Image height='100%' width='100%' src='https://otakukulture.in/wp-content/uploads/2023/09/Op.png'></Image>
                </div>

                <div style={{display:'flex',justifyContent:'Left',alignItems:'Left',paddingLeft:'150px',marginTop:'30px'}} className='homeNaruto'>
                    <Link to={'/'}><p>Home</p></Link> 
                <p style={{marginLeft:'20px',marginRight:'20px'}}>/</p> <Link to={'/Naruto'}><p>One Piece</p></Link></div>

                <div className="narutoProducts">

                    <div className="productsLeft">
                        
                        <div className="categoryHead" style={{display:'flex',alignItems:'left',justifyContent:'left',marginTop:'10px'}}><p>CATEGORIES</p></div>
                        <div className="categoryHead1" style={{display:'flex',alignItems:'left',justifyContent:'left',marginTop:'20px'}}><p>PRODUCT TYPE</p></div>
                        <div className="productCategory">
                            <div  className='checkBoxDiv' ><input type="checkbox" className='checkBox'/><label>T - Shirt</label></div>
                            <div className='checkBoxDiv'><input type="checkbox" className='checkBox'/><label>Hoodies</label></div>
                            <div  className='checkBoxDiv'><input type="checkbox" className='checkBox'/><label>Jacket</label></div>
                            <div  className='checkBoxDiv'><input type="checkbox" className='checkBox'/><label>Sweatshirt</label></div>
                            <div  className='checkBoxDiv'><input type="checkbox" className='checkBox'/><label>Combo</label></div>
                            <div  className='checkBoxDiv'><input type="checkbox" className='checkBox'/><label>Tank Top</label></div>
                            <div  className='checkBoxDiv'><input type="checkbox" className='checkBox'/><label>Combo</label></div>
                        </div>
                        <div className="categoryHead1" style={{display:'flex',alignItems:'left',justifyContent:'left',marginTop:'30px'}}><p>PRICE</p></div>
                        <div>
                            
                        </div>
                        <div className="categoryHead1" style={{display:'flex',alignItems:'left',justifyContent:'left',marginTop:'30px'}}><p>SIZE</p></div>
                        <div></div>

                    </div>

                    <div className="productsRight">
                        {
                            onePiece.map((item,cardIndex) => (
                                <Link>
                                <Card
                                style={{ width: '300px', border: 'none',marginTop:'40px' }}
                                onMouseEnter={() => handleMouseEnter(cardIndex)}
                                onMouseLeave={handleMouseLeave}
                              >
                                <div className="slideIconsMainI" style={{ position: 'relative' }}>
                                  <Card.Img
                                    variant="top"
                                    src={item.image}
                                    style={{ width: '330px', height: '410px', objectFit: 'cover' }}
                                  />
                                  {hoveredIndex === cardIndex && (
                                    <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
                                      <div className='slideIconsI'><FaRegHeart className='iconsI' /></div>
                                      <div className='slideIconsI'><AiOutlineShoppingCart className='iconsI' /></div>
                                      <div className='slideIconsI'><FaSearchPlus className='iconsI' /></div>
                                    </div>
                                  )}
                                </div>
                                <div><p className='homeCards1'>{item.name}</p></div>
                                <div><p className='homeCardsPrice1'>Rs. {item.price}.00</p></div>
                              </Card></Link>
                            ))
                        }
                    </div>

                </div>

            </div>

            

            
            <div style={{height:'100%',width:'100%'}}>
                    <Image height="100%" width="100%" src='https://otakukulture.in/wp-content/uploads/2023/09/Footer_HD_-e1674635998929.png'></Image> 
            </div>
            <div className="footer1H">

                <div className="footer1aH">
                    <div className="leftFooter1H">
                        <div><h4 class="h4" style={{ fontWeight: 'bold', marginLeft: '30px' }}>LOCATION</h4></div>

                        <div class="text custom-text" style={{ paddingLeft: '118px' }}>
                            <p style={{ fontSize: '13px', letterSpacing: '1px' }}>24-A New India Colony,<br />Marine Drive Kochi,<br />683106 Kerala</p>
                            <p style={{ fontSize: '13px', letterSpacing: '1px' }}><b>Email</b><a href="mailto:support@fansarmy.in"> :support@zoro.in</a></p></div>

                    </div>

                    <div className="centerFooter1H">
                        <div><h4 class="h4" style={{ fontWeight: 'bold' }}>INFORMATION</h4></div>
                        <div style={{ paddingRight: '52px' }}>
                            <ul><li><a href="/pages/about-us">About Us</a></li><li><a href="/pages/contact-us">Contact Us</a></li><li><a href="/pages/bulk-order">Bulk Order</a></li></ul>
                        </div>
                    </div>

                    <div className="rightFooter1H">
                        <div><h4 class="h4" style={{ fontWeight: 'bold' }}>CUSTOMER SERVICES</h4></div>
                        <div style={{ paddingRight: '5px' }}>
                            <ul><li><a href="/policies/shipping-policy">Shipping Policy</a></li>
                                <li><a href="/policies/refund-policy">Return and Replace Policy</a></li>
                                <li><a href="/pages/cancellation-policy">Cancellation Policy</a></li>
                                <li><a href="https://fanfreeak.myshopify.com/apps/return_prime">Return and Replace Portal</a></li>
                                <li><a href="/policies/terms-of-service">Terms of Service</a></li></ul>
                        </div>
                    </div>
                </div>
                
                <div className='footBottom1H'><p style={{ fontSize: '13px', fontFamily: 'Poppins,sans-serif',color:'white' }}>© 2024 ZORO All Rights Reserved.</p></div>

            </div>
        </div>
    );
};

export default OnePice;
