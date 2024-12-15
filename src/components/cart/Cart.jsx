import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { IoCartOutline } from 'react-icons/io5';
import '../cart/Cart.css';
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
import { GiShoppingCart } from "react-icons/gi";
import axios from 'axios';
import { backendUrl } from '../../utils/utils';

const Cart = () => {
    const { cart, setCart, products, qty, setQty,setProducts } = useContext(myContext)
    const heading1 = 'NOW ENJOY ALL INDIA FREE SHIPPING ON EVERY ORDER'; // First heading text
    const heading2 = 'EXTRA 5% DISCOUNT FOR ALL ONLINE PAYMENTS'; // Second heading text
    const interval = 3000; // Interval between heading changes (in milliseconds)
    const [isShopByAnimeHovered, setIsShopByAnimeHovered] = useState(false);
    const [isShopByProducts, setIsShopByProducts] = useState(false);
    const nav = useNavigate()
    const userID = localStorage.getItem("UserId")
    console.log("UserId", userID)
    useEffect(() => {
        fetchCart()
    }, [])
    console.log("Cart", cart)

    const fetchCart = async () => {
        try {

            const response = await axios.post(`${backendUrl}/Users/getCart`, { UserId: userID })
            setCart(response.data.cart)
        } catch (error) {
            console.log(error);
        }

    }



    const removeCart = async (id,size,qt) => {
        try {
            const isProductInCart = cart.find(item => item._id === id && item.size === size);
            if(isProductInCart){

            }
            else {
                const response = await axios.put(`${backendUrl}/Users/deleteCart/${id}`, { userID,size });
                 // Find the specific product within the products array
            const updatedProducts = products.map((item) => {
                if (item._id === id) {
                    // Check if the product size matches the specified size
                    if (item.stock && item.stock[size] > 0) {
                        const updatedStock = { ...item.stock }; // Create a copy of the stock object
                        // cart.map(data => data._id === item.id && data.size === size ? 
                        updatedStock[size] = Math.max(0, updatedStock[size] + qt) // Decrement the stock for the specified size, ensuring it doesn't go below zero
                        // : data)
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
            }
            
            console.log("first", id, userID);
            fetchCart();
        } catch (err) {
            console.log(err);
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.qty, 0)
    }

    const amount = calculateTotal()


    console.log("car", cart.image);
    const token = localStorage.getItem('AuthToken')
    console.log("AuthToken", token)
    const emailCheck = localStorage.getItem("userEmail")

   
    const increementQty = async (id,sizee) => {
        try {   
            const updatedProducts = products.map((item) => {
                if (item._id === id) {
                    // Check if the product size matches the specified size
                    if (item.stock && item.stock[sizee] > 1) {

                const newQty = cart.map((item) =>

                item.id === id && item.size === sizee ? { ...item, qty: item.qty + 1 } : item
            )
            setCart(newQty)

             axios.put(`${backendUrl}/Users/cart/${id}`, { userID, cart: newQty })
            console.log("cart", cart)
                // Decrement product stock for the corresponding size
            stockDecreement(id, sizee);
        }
        else{
            alert("out of stock")
        }
    }
    })
        }
        catch (err) {
            console.log(err)
        }
    }

    const stockDecreement = async (id, size) => {
        try {
            // Find the specific product within the products array
            const updatedProducts = products.map((item) => {
                if (item._id === id) {
                    // Check if the product size matches the specified size
                    if (item.stock && item.stock[size] > 0) {
                        const updatedStock = { ...item.stock }; // Create a copy of the stock object
                        updatedStock[size] = Math.max(0, updatedStock[size] - item.qty); // Decrement the stock for the specified size, ensuring it doesn't go below zero
    
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
            console.log("updatedProducts", updatedProducts);
        } catch (error) {
            console.log('Error decrementing stock:', error);
        }
    };
    
    
    
    const category=[...new Set(products.map(data=>data.category))]

    const decreementQty = async (id,sizee) => {
        try {
            const newQty = cart.map((item) =>

                item.id === id && item.size === sizee? { ...item, qty: item.qty - 1 } : item
            )
            setCart(newQty)

            await axios.put(`${backendUrl}/Users/cart/${id}`, { userID, cart: newQty })
            console.log("cart", cart)
            await stockIncreement(id, sizee);
        }
        catch (err) {
            console.log(err)
        }
    }

    const stockIncreement = async (id, size) => {
        try {
            // Find the specific product within the products array
            const updatedProducts = products.map((item) => {
                if (item._id === id) {
                    // Check if the product size matches the specified size
                    if (item.stock && item.stock[size] > 0) {
                        const updatedStock = { ...item.stock }; // Create a copy of the stock object
                        updatedStock[size] = Math.max(0, updatedStock[size] + item.qty); // Decrement the stock for the specified size, ensuring it doesn't go below zero
    
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
            console.log("updatedProducts", updatedProducts);
        } catch (error) {
            console.log('Error decrementing stock:', error);
        }
    };

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
                                    <Nav.Link onClick={()=>nav('/Wishlist')}><IoMdHeartEmpty className="headerRightIcons1H" /></Nav.Link>
                                    <Nav.Link onClick={()=>nav('/cart/:productId')}><IoCartOutline className="headerRightIcons1H" /></Nav.Link>
                                    <DropDown />
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>

                    </div>


                </div>
            </div>

            <div className="center1HCC">

                {
                    cart.length === 0 ? (

                        <>
                            <div style={{ display: 'flex', justifyContent: 'Left', alignItems: 'Left', paddingLeft: '150px', marginTop: '30px' }} className='homeNaruto'>
                                <Link to={'/'}><p>Home</p></Link>
                                <p style={{ marginLeft: '20px', marginRight: '20px' }}>/</p> <Link to={'/Naruto'}><p style={{ fontWeight: 'bold' }}>Cart</p></Link></div>


                            <div className="emptyCart1">
                                <div>
                                    <GiShoppingCart style={{ color: 'grey', fontWeight: 'bold', height: '150px', width: '150px' }} />
                                </div>
                                <div><h2 className='cartHeading'>YOUR SHOPPING CART IS EMPTY</h2></div>
                                {
                                    emailCheck === null ? (
                                        <div><p>Please <Link to={'/Login'} style={{ color: 'black', fontWeight: 'bold' }}><u >SIGN IN</u></Link> IN to view your saved Cart</p></div>
                                    ) : (
                                        false
                                    )
                                }
                            </div>

                        </>
                    ) : (
                        <>

                            <div style={{ display: 'flex', justifyContent: 'Left', alignItems: 'Left', paddingLeft: '150px', marginTop: '30px' }} className='homeNaruto'>
                                <Link to={'/'}><p>Home</p></Link>
                                <p style={{ marginLeft: '20px', marginRight: '20px' }}>/</p> <Link to={'/Naruto'}><p style={{ fontWeight: 'bold' }}>Cart</p></Link></div>

                            <div className="emptyCart2">

                                <div className="centerf2AddToCartc">

                                    <div className='centerf2AddToCartc1' style={{height:'auto',width:'65%',paddingLeft:'35px'}}>

                                    {cart && cart?.length !== 0 ?
                                        <div className="amain-card1aAddToCart">
                                            {
                                                cart.map((data, index) => (


                                                    <div class="card1aAddToCart" key={data._id}>

                                                        <div className="card1a-leftAddToCart">
                                                        <Link to={(`/ProductDisplay/${data.id}`)}><img src={data.image} alt="" style={{ height: '260px', width: '100%' }} /></Link>
                                                        </div>
                                                        <div className="card1a-rightAddToCart">
                                                            <div className="removeButtonAddToCart"><Link style={{ textDecoration: 'none' }} onClick={() => removeCart(data.id,data.size,data.qty)}><p style={{ fontSize: '16px', color: 'grey', letterSpacing: '1px' }}>REMOVE</p></Link></div>
                                                            <div className="data11AddToCart"><h2 style={{ fontSize: '20px' }}>{data.name}</h2></div>
                                                            <div className="data11AddToCart"><h2 style={{ fontSize: '20px',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center' }}><p>size: </p> <p style={{fontSize:'14px',marginTop:'5px'}}> {data.size}</p></h2></div>
                                                            <div className="data12AddToCart"><h2 style={{ fontSize: '20px' }}>Rs. {data.price * data.qty}.00</h2></div>

                                                            {/* <CartDropDown  quantity={data.quantity} onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)} /> */}
                                                            <div className="dropDwonQuantity" style={{ display: 'flex', flexDirection: 'row', marginBottom: '60px' }}>
                                                                <button style={{ border: 'none' }} onClick={() => data.qty > 1 ? decreementQty(data.id,data.size) : data}>-</button> &nbsp;
                                                                <button style={{ borderRadius: '20px', height: '30px', width: '30px' }} >{data.qty}</button>&nbsp;
                                                                <button style={{ border: 'none' }} onClick={() => data.qty < 8 ? increementQty(data.id,data.size) :data}>+</button></div>

                                                        </div>


                                                    </div>
                                                ))
                                            }
                                        </div> : <div></div>
                                    }

                                    </div>

                                    <div className="centerf2AddToCartc2" style={{height:'auto',width:'35%'}}>

                                    <div className="amain-card2aAddToCart">

                                        <div className="amain-card2aAddToCart-top">
                                            <div style={{ paddingLeft: '50px', marginTop: '10px' }}><h4>PRICE DETAILS</h4></div>
                                        </div>

                                        <div className="amain-card2aAddToCart-center" >

                                            <div style={{ paddingLeft: '50px', marginTop: '5px', display: 'flex', flexDirection: 'row' }}><p>Price ({cart.length} item)</p><p style={{ marginLeft: '170px' }}>{amount}₹</p></div>

                                            <div style={{ paddingLeft: '50px', display: 'flex', flexDirection: 'row', width: '100%' }}><p >Delivery Fee</p><p style={{ textDecoration: 'line-through', marginLeft: '140px' }}>₹ 40</p>&nbsp; <p style={{ color: 'green' }}>FREE</p></div>
                                        </div>

                                        <div className="amain-card2aAddToCart-bottom">
                                            <div style={{ paddingLeft: '50px', marginTop: '5px', display: 'flex', flexDirection: 'row' }}><p>Grand Total</p><p style={{ marginLeft: '182px' }}>{amount}₹</p></div>
                                            <div style={{ paddingLeft: '50px' }}><p>Inclusive of all taxes</p></div>
                                            <div style={{ paddingLeft: '50px' }}><p>Average delivery time: 7-9 days</p></div>
                                        </div>

                                        <div className="amain-card2aAddToCart-button" style={{ padding: '5px' }}>
                                            <div ><Link to={'/BuyNow'}><button class="btn btn-dark" style={{ width: '350px' }} >PLACE ORDER</button></Link></div>
                                        </div>

                                    </div>
                                    </div>

                                </div>

                            </div>
                        </>
                    )

                }

            </div>




            <div style={{ height: '100%', width: '100%' }}>
                <Image height="100%" width="100%" src='https://otakukulture.in/wp-content/uploads/2023/09/Footer_HD_-e1674635998929.png'></Image>
            </div>
            <div className="footer1H"  style={{paddingTop:'100px'}} >

                <div className="footer1aH"style={{backgroundColor:'black'}}>
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

export default Cart;
