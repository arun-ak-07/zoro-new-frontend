import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Image, Button } from 'react-bootstrap';
import { IoCartOutline } from 'react-icons/io5';
import '../productDisplay/ProductDisplay.css';
import TwoHeadingsSlide from '../home/TwoHeadingsSlide';
import { myContext } from '../context/Context';
import PopOverSearchButton from '../home/PopoverSearchButton';
import myVideo from '../home/ZORO.gif';
import DropDown from '../home/DropDown';
import { IoMdHeartEmpty } from "react-icons/io";
import DropdownBox1 from '../home/DropdownBox1';
import DropdownBox from '../home/DropdownBox';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaAngleDown, FaRegHeart } from 'react-icons/fa6';
import axios from 'axios'
import { backendUrl } from '../../utils/utils';
import toast from 'react-hot-toast';

const ProductDisplay = () => {
    const {  cart, setCart, wishlist, setWishlist,products,setProducts} = useContext(myContext)
    const heading1 = 'NOW ENJOY ALL INDIA FREE SHIPPING ON EVERY ORDER'; // First heading text
    const heading2 = 'EXTRA 5% DISCOUNT FOR ALL ONLINE PAYMENTS'; // Second heading text
    const interval = 3000; // Interval between heading changes (in milliseconds)
    const [isShopByAnimeHovered, setIsShopByAnimeHovered] = useState(false);
    const [isShopByProducts, setIsShopByProducts] = useState(false);
    // console.log(", iwshList",wishlist)
    const nav = useNavigate()
    // const [color,setColor] = useState('')
    const [size, setSize] = useState('S')
    const [shoeSize,setShoeSize] = useState('UK 6')
    const { productId } = useParams()
    const userID = localStorage.getItem("UserId")
    console.log("UserId", userID)
    // console.log("Naruto", naruto)
    const token = localStorage.getItem('AuthToken')
    console.log("AuthToken", token)
    // console.log("ProductDisplay Now", productDisp)
    const [displayProducts, setDisplayProducts] = useState({})
    //    const [color,setColor] = useState('black')
    //    const [bgColor,setBgColor] = useState('black')
    // useEffect(()=>{
    //     fetchWishlist()
    // },[])
    // const fetchWishlist = async () => {
    //     try{
    //         const response = await axios.post('${backendUrl}/Users/getWishlist', {UserId: userID})
    //         setWishlist(response.data.wishlist)

    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }

    // const disp=cart.find(data=>data._id==productId)

    useEffect(() => {
        displayProduct()
    }, [])
    console.log("Product Display Now", displayProducts)
    const displayProduct = async () => {
        const response = await axios.get(`${backendUrl}/Product/products/${productId}`)
        setDisplayProducts(response.data);
    }

    const addToCart = async (prod, id, sizee) => {

        try {
            if (token) {
                const isProductInCart = cart.find(item => item._id === id && item.size === sizee);
                if (isProductInCart) {
                    toast.error("Product already exists in cart");
                } else {
                    const response = await axios.put(`${backendUrl}/Users/cart`, {
                        id: prod._id,
                        userID,
                        name: prod.name,
                        price: prod.price,
                        image: prod.image,
                        qty: prod.qty,
                        size
                    },
                    
                    {headers : {
                            'Authorization' : `Bearer ${token}`
                        }}
                    );
                    console.log("response", response);
                    setCart(response.data.user.cart);
                }
                // Find the specific product within the products array
            const updatedProducts = products.map((item) => {
                if (item._id === id) {
                    // Check if the product size matches the specified size
                    if (item.stock && item.stock[size] > 0) {
                        const updatedStock = { ...item.stock }; // Create a copy of the stock object
                        updatedStock[size] = Math.max(0, updatedStock[size] - prod.qty); // Decrement the stock for the specified size, ensuring it doesn't go below zero
    
                        return {
                            ...item,
                            stock: updatedStock,
                        };
                    }
                }
                return item; // Return unchanged if it's not the product or size we're updating
            });
    
            // Update product stock in the database
            await axios.put(`${backendUrl}/Product/updateStock/${id}`, { products: updatedProducts });
    
            // Update local products state after successful stock decrement
            setProducts(updatedProducts);
            } else {
                toast.error("Sign in first");
                nav('/Login');
            }
        } catch (err) {
            if (err.response.status === 401) {
                // Unauthorized - invalid token or token not provided
                toast.error("Unauthorized - Please sign in again");
                // Redirect to login page or perform any other action as needed
                nav('/Login');
            } else if (err.response && err.response.data && err.response.data.message === "already added") {
                toast.error("Product already exists in cart");
            } else {
                console.log(err, "Product id not found");
            }
    };
    }


    // console.log("newcart", cart);
    // useEffect(() => {
    //     wishlist.map((data) => data.id === displayProducts.id ? setColor('black') : setColor('red'))
    //     // .includes(displayProducts) ? setColor('black') : setColor('red')
    //     console.log("first",color)
    // },)

    const addToWishlist = async (prod, id) => {
        try {
            if (token) {
                const isProductInWishlist = wishlist.find(wishlistItem => wishlistItem._id === id);
                if (isProductInWishlist) {
                    toast.error("Product already exists in cart")
                }
                else {
                    const response = await axios.post(`${backendUrl}/Users/wishlist`, {
                        id: prod._id,
                        userID,
                        name: prod.name,
                        price: prod.price,
                        image: prod.image,
                    })
                    console.log("response", response)
                    setWishlist(response.data.user.cart)
                    //             wishlist.map((data) => data.id === displayProducts.id ? setColor('black') : setColor('red'))
                    // // .includes(displayProducts) ? setColor('black') : setColor('red')
                    // console.log("first",color)

                }
            }
            else {
                toast.error('SignIn First')
                nav('/Login')
            }
        }
        catch (err) {
            if (err.response && err.response.data && err.response.data.message === "already added") {
                toast.error("Product already exists in wishlist")
            }
            else {
                console.log(err, "Product is not found")
            }
        }
    }

    const buyNow = async (prod, id,sizee) => {
        console.log("Product:", prod);
        try {
            if (token) {
                const isProductInCart = cart.find(item => item._id === id && item._size === sizee) ;
                if (isProductInCart) {
                    nav('/BuyNow')
                } else {
                    const response = await axios.put(`${backendUrl}/Users/cart`, {
                        id: prod._id,
                        userID,
                        name: prod.name,
                        price: prod.price,
                        image: prod.image,
                        qty: prod.qty,
                        size
                    },
                    {
                        headers : {
                            'Authorization' : `Bearer ${token}`
                        }}
                );
                    console.log("response", response);
                    setCart(response.data.user.cart);
                    nav('/BuyNow')
                }
            } else {
                toast.error("Sign in first");
                nav('/Login');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message === "already added") {
                // alert("Product already exists in cart");
                nav('/BuyNow')
            } else {
                console.log(err, "Product id not found");
            }
        }
    };

    const increementQty = async (id,sizee) => {
        // console.log("first",id)
        try {
            
            const newQty = 
            displayProducts._id === id && displayProducts.size === sizee ? { ...displayProducts, qty: displayProducts.qty + 1 } : displayProducts
            
            setDisplayProducts(newQty)
            axios.put(`${backendUrl}/Users/cart/${id}`, { userID, cart: newQty })
            console.log("Display",displayProducts)
            // Decrement product stock for the corresponding size
        }
        catch (err) {
            console.log(err)
        }
    }

    const decreementQty = async (id,sizee) => {
        // console.log("first",id)
        try {
            const newQty = 
            displayProducts._id === id && displayProducts.size === sizee ? { ...displayProducts, qty: displayProducts.qty - 1 } : displayProducts
            
            setDisplayProducts(newQty)
            axios.put(`${backendUrl}/Users/cart/${id}`, { userID, cart: newQty })
            console.log("Display",displayProducts)
        }
        catch (err) {
            console.log(err)
        }
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
                                    display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', marginTop: '16px', marginLeft: '100px'
                                }}>
                                    <Nav.Link onClick={() => nav('/')}><p className="headerTitles1H">HOME</p></Nav.Link>
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
                                    <Nav.Link><IoMdHeartEmpty onClick={() => nav('/Wishlist')} className="headerRightIcons1H" /></Nav.Link>
                                    <Nav.Link onClick={() => nav('/cart/:productId')}><IoCartOutline className="headerRightIcons1H" /></Nav.Link>
                                    <DropDown />
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>

                    </div>


                </div>
            </div>

            <div className="center1HP1">

                {/* {displayProducts.map((displayProducts, index) => ( */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'Left', alignItems: 'Left', paddingLeft: '150px', marginTop: '30px' }} className='homeNaruto'>
                        <Link to={'/'}><p>Home</p></Link>
                        <p style={{ marginLeft: '20px', marginRight: '20px' }}>/</p> <Link to={'/Naruto'}><p style={{ color: 'black' }} >{displayProducts.name}</p></Link></div>
                    <div className="prodDisp">

                        <div className="prod-leftSection">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ margin: '40px' }} src={displayProducts.image} alt="" height={700} width={600} /></div>
                            {/* <div style={{ margin: '10px' }}><img src="https://dukaan.b-cdn.net/700x700/webp/upload_file_service/5a57ac2d-8d37-4f94-b949-62d86a1d5c0e/fan-size-chart.png" height={250} width={700} alt="" /></div> */}
                        </div>

                        <div className="prod-rightSection" style={{ padding: '30px' }}>

                            <div><h2 style={{ fontSize: "22px", lineHeight: "28px", fontWeight: 'bold', letterSpacing: '1px' }}>{displayProducts.name}</h2></div>
                            <div style={{ marginTop: '20px' }}><p style={{ fontSize: '20px', lineHeight: '32px', fontWeight: '600' }}>Rs. {displayProducts.price}.00</p></div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div className="sizes" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}><p style={{ color: 'black', fontSize: '12px', display: 'flex', flexDirection: 'row' }}>SIZE :
                                        <p style={{ fontWeight: 'bold' }}> {size}</p></p> <p style={{ color: 'black', fontSize: '12px', marginLeft: '100px' }}>SZE CHART</p></div>
                                            
                                            <div>
                                        <button
                                            className="BtnProd"
                                            onClick={() => setSize('S')}
                                            style={{ backgroundColor: size === 'S' ? 'orange' : 'red' }}
                                        >
                                            S
                                        </button>
                                        <button
                                            className="BtnProd"
                                            onClick={() => setSize('M')}
                                            style={{ marginLeft: '20px', backgroundColor: size === 'M' ? 'orange' : 'red' }}
                                        >
                                            M
                                        </button>
                                        <button
                                            className="BtnProd"
                                            onClick={() => setSize('X')}
                                            style={{ marginLeft: '20px', backgroundColor: size === 'X' ? 'orange' : 'red' }}
                                        >
                                            X
                                        </button>
                                        <button
                                            className="BtnProd"
                                            onClick={() => setSize('XL')}
                                            style={{ marginLeft: '20px', backgroundColor: size === 'XL' ? 'orange' : 'red' }}
                                        >
                                            XL
                                        </button>
                                        <button
                                            className="BtnProd"
                                            onClick={() => setSize('XXL')}
                                            style={{ marginLeft: '20px', backgroundColor: size === 'XXL' ? 'orange' : 'red' }}
                                        >
                                            XXL
                                        </button>
                                    </div>

                                       
                                    

                                </div>


                            </div>

                            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'row' }}>
                                <Link style={{ color: 'black', display: 'flex', flexDirection: 'row' }}><FaRegHeart
                                    onClick={() => addToWishlist(displayProducts, displayProducts._id)}
                                    style={{ marginTop: '2px', color: wishlist.some(item => item.id === displayProducts._id) ? 'red' : 'black' }} className='iconsIP' />
                                    <p onClick={() => addToWishlist(displayProducts, displayProducts._id)} style={{ marginLeft: '5px' }}>Available in wishlist</p></Link>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ height: '40px', width: '90px', border: '1px solid', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <button style={{ height: '34px', width: '30px', background: 'white', borderColor: 'white', fontSize: '20px', border: 'white' }} onClick={() => displayProducts.qty > 1  ? decreementQty(displayProducts._id,displayProducts.size) : displayProducts}>-</button>
                                    <div style={{ height: '35px', width: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{displayProducts.qty}</div>
                                    <button style={{ height: '34px', width: '30px', background: 'white', borderColor: 'white', fontSize: '20px', border: 'white' }}  onClick={() => displayProducts.qty < 8 ? increementQty(displayProducts._id,displayProducts.size) :displayProducts}>+</button>
                                </div>
                                    <Button onClick={() => addToCart(displayProducts, displayProducts._id,displayProducts.size)}
                                        style={{ marginLeft: '10px',
                                        //  backgroundColor: cart.find(item => item.id === displayProducts._id && item.size === displayProducts.size) ? 'green' : 'black'
                                          }} variant='dark' className="acard-button1" >

                                        {/* {cart.find(item => item.id === displayProducts._id) ? "ADDED" : "ADD TO CART"} */}

                                        ADD TO CART
                                    </Button></div> &nbsp;&nbsp;
                                <div><Button onClick={() => buyNow(displayProducts, displayProducts._id,displayProducts.size)} className="acard-button2" style={{ width: '1000px', backgroundColor: '#ff312a' }}>Buy Now</Button></div>
                            </div>

                            <div class="trusted-badges-wrapper flex d-row" style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>

                                <div class="trusted-badge">
                                    <img src="https://dukaan.b-cdn.net/original/dukaan-media/plugins/trusted_badges_v2/free-shipping.svg" alt="badge" />
                                </div>

                                <div class="trusted-badge">
                                    <img src="https://dukaan.b-cdn.net/original/dukaan-media/plugins/trusted_badges_v2/cod-available.svg" alt="badge" />
                                </div>

                                <div class="trusted-badge">
                                    <img src="https://dukaan.b-cdn.net/original/dukaan-media/plugins/trusted_badges_v2/premium-quality.svg" alt="badge" />
                                </div>

                            </div>

                            <div style={{ marginTop: '40px' }}><p style={{ fontWeight: 'bold' }}>Products Details</p></div>
                            <div><h4 style={{ fontSize: '16px' }}>Cash On Delivery (COD) Available</h4></div>
                            <div><p>{displayProducts.description}</p></div>
                            <div><p>Fitting - Regular/Parallel Fit</p></div>
                            <div><p style={{ color: 'grey' }}>Please Note</p></div>
                            <div><ul>
                                <li>Kindly refer to the size chart given at the last slide of t-shirt images before placing the order</li>
                                <li>For further size assistance from our team, kindly DM us on Instagram or WhatsApp</li>
                                <li>For any custom print requirements or bulk orders, kindly DM us on Instagram or WhatsApp</li>
                            </ul></div>

                        </div>
                    </div>
                </div>
                {/* ))} */}


            </div>




            <div style={{ height: '100%', width: '100%' }}>
                <Image height="100%" width="100%" src='https://otakukulture.in/wp-content/uploads/2023/09/Footer_HD_-e1674635998929.png' />
            </div>
            <div className="footer1H" style={{paddingTop:'100px'}}>

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

                <div className='footBottom1H'><p style={{ fontSize: '13px', fontFamily: 'Poppins,sans-serif', color: 'white' }}>© 2024 ZORO All Rights Reserved.</p></div>

            </div>
        </div>
    );
};

export default ProductDisplay;
