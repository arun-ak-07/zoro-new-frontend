import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Image, Button } from 'react-bootstrap';
import { IoCartOutline } from 'react-icons/io5';
import '../myOrders/MyOrders.css';
import TwoHeadingsSlide from '../home/TwoHeadingsSlide';
import { myContext } from '../context/Context';
import PopOverSearchButton from '../home/PopoverSearchButton';
import myVideo from '../home/ZORO.gif';
import DropDown from '../home/DropDown';
import { IoMdHeartEmpty } from "react-icons/io";
import DropdownBox1 from '../home/DropdownBox1';
import DropdownBox from '../home/DropdownBox';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa6';
import { GiShoppingCart } from 'react-icons/gi';
import axios from 'axios';
import { backendUrl } from '../../utils/utils';

const MyOrders = () => {
    const { myOrders,setMyOrders,products} = useContext(myContext)
    const heading1 = 'NOW ENJOY ALL INDIA FREE SHIPPING ON EVERY ORDER'; // First heading text
    const heading2 = 'EXTRA 5% DISCOUNT FOR ALL ONLINE PAYMENTS'; // Second heading text
    const interval = 3000; // Interval between heading changes (in milliseconds)
    const [isShopByAnimeHovered, setIsShopByAnimeHovered] = useState(false);
    const [isShopByProducts, setIsShopByProducts] = useState(false);
    const nav = useNavigate()
    const userID = localStorage.getItem("UserId")
    console.log("UserId", userID)
    useEffect(()=>{
        fetchmyOrders()
    },[])
    const fetchmyOrders = async () => {
        try{
            const response = await axios.post(`${backendUrl}/Users/getWishlist`, {UserId: userID})
            setMyOrders(response.data.myOrders) 
        }
        catch (err) {
            console.log(err)
        }
    }
    console.log("MYOrders",myOrders)
    const cancelOrders = async (index) => {
        try {
            await axios.post(`${backendUrl}/Users/deletemyOrders/${index}`, { userId:userID });
            console.log("myOrders ID", userID);
            fetchmyOrders();
        } catch (error) {
            console.error('Error removing myOrders item:', error);
        }
    };
    console.log("response", myOrders)
    const displayProduct = async (id) => {
        nav(`/product/${id}`)
    }
    const category=[...new Set(products.map(data=>data.category))]
    return (
        <div className="main1H">

            <div className="header1H">

                <div className="header01H" class="bg-primary text-white header01" style={{ display: 'flex', flexDirection: 'row' }}>
                    <TwoHeadingsSlide heading1={heading1} heading2={heading2} interval={interval} />
                </div>

                <div className="header02H">
                    <div className="headerLeft1H">
                        <div style={{ fontSize: '16px', paddingLeft: '100px' }} >
                        <Link to={('/')}><img src={myVideo} alt='ZORO' height={65} width={65} /></Link>
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

                                    <Nav.Link onClick={()=>nav(`/ProductsDisplay/${category[3]}`)}><p className="headerTitles1H">COMBO</p></Nav.Link>
                                    <Nav.Link onClick={()=>nav('/NewLaunch')}><p className="headerTitles1H">NEW LAUNCH</p></Nav.Link>
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
                                    <Nav.Link onClick={()=>nav('/myOrders')}><IoMdHeartEmpty className="headerRightIcons1H" /></Nav.Link>
                                    <Nav.Link onClick={()=>nav('/cart/:productId')}><IoCartOutline className="headerRightIcons1H" /></Nav.Link>
                                    <DropDown/>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>

                    </div>


                </div>
            </div>

            <div className="center1HWW">
            
            <div style={{display:'flex',justifyContent:'Left',alignItems:'Left',paddingLeft:'150px',marginTop:'30px'}} className='homeNaruto'>
                    <Link to={'/'}><p>Home</p></Link> 
                <p style={{marginLeft:'20px',marginRight:'20px'}}>/</p> <Link to={'/Naruto'}><p style={{fontWeight:'bold'}}>myOrders</p></Link></div>

            <div className="emptyWish">
                    
                <div><h2 className='wishHeading'>myOrders</h2></div>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'left',width:'100%',alignItems:'left'}}>
                    <p style={{fontWeight:'bold',fontSize:'14px',letterSpacing:'1px',marginLeft:'200px'}}>PRODUCT</p>
                <p style={{fontWeight:'bold',marginLeft:'600px',fontSize:'14px',letterSpacing:'1px'}}>PRICE</p></div>
                <hr style={{width:'1300px',color:'grey'}}/>
                {
                    myOrders.length === 0 ? 
                    <div className='wishDescrip'><p>Orders list empty.</p></div> 
                    
                    :
                    <div style={{display:'flex',width:'100%',flexDirection:'column',height:'auto'}}>
                        {
                            myOrders.map((wish,index) => (
                                <div key={index} style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',marginTop:'10px'}}>

                                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'40%',marginLeft:"30px",paddingLeft:'100px'}}>
                                    <div > <Link to={(`/ProductDisplay/${wish.id}`)}><img src={wish.image} height={150} width={120} alt="" /></Link></div>
                                    <div style={{marginLeft:'40px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                                        <p className='myOrdersName'>{wish.name}</p>
                                        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                            <p style={{fontSize:'14px'}}>qty : {wish.qty}</p>
                                    <p style={{fontSize:'12px',marginLeft:'10px'}}>SIZE : {wish.size}</p></div>
                                        </div>
                                    
                                    </div>

                                    <div style={{width:'30%',display:'flex'}}><p className='myOrdersPrice' style={{marginLeft:'250px'}}>Total Price : Rs. {wish.price*wish.qty}.00</p></div>

                                    <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',width:'30%'}}>
                                    {/* <div ><Button  variant='danger' style={{fontWeight:'bold',border:'none',fontSize:'14px',width:'160px',height:'40px'}} onClick={() => nav(`/ProductDisplay/${wish.id}`)}>VIEW PRODUCT</Button></div> */}
                                    <div style={{marginLeft:'30px'}}><Button variant='danger' style={{fontWeight:'bold',width:'160px',height:'40px'}} onClick={()=>cancelOrders(index)}>cancel order</Button></div>
                                    </div>
                                </div>
                                
                            ))
                        }
                    </div>
                }
                
                </div>
                
            </div>

            

            
            <div style={{height:'100%',width:'100%'}}>
                    <hr />
            </div>
            <div className="footer1H"  style={{paddingTop:'100px'}}>

                <div className="footer1aH" style={{backgroundColor:'black'}}>
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

export default MyOrders;
