import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { IoCartOutline } from 'react-icons/io5';
import '../buyNow/BuyNow.css';
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
import toast from 'react-hot-toast';

const BuyNow = () => {
    const { cart, setCart, username, setUsername, email, setEmail, setWishlist, products,setProducts,
        pincode, setPincode, locality, setLocality, address, setAddress, city, setCity, state, setState, landmark, setLandmark, addressType, setAddressType,
        phone, setPhone, addrz } = useContext(myContext)
    const heading1 = 'NOW ENJOY ALL INDIA FREE SHIPPING ON EVERY ORDER'; // First heading text
    const heading2 = 'EXTRA 5% DISCOUNT FOR ALL ONLINE PAYMENTS'; // Second heading text
    const interval = 3000; // Interval between heading changes (in milliseconds)
    const [isShopByAnimeHovered, setIsShopByAnimeHovered] = useState(false);
    const [isShopByProducts, setIsShopByProducts] = useState(false);
    const [newAddress, setNewAddress] = useState([])
    const [editId, setEditId] = useState(null)
    const [showPopup, setShowPopup] = useState(false);
    const nav = useNavigate()
    const userID = localStorage.getItem("UserId")
    console.log("UserId", userID)
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [changeAddress, setChangeAddress] = useState(true)
    const [selectAddress, setSelectAddress] = useState([])
    const [addId, setAddId] = useState(false)
    const togglePopup = async () => {
        try{
        if (addrz.length === 0) {
            toast.error("Delivery address required")
        }
        else{
            setShowPopup(!showPopup);
            await axios.post(`${backendUrl}/Users/myOrders/${userID}`,{cart:cart})
            
        }
    }
    catch (err) {
        console.log(err)
    }
    };

    // Function to hide the popup after 5 seconds
    useEffect(() => {
        let timer;
        if (showPopup) {
            timer = setTimeout(() => {
                setShowPopup(false);
                nav('/')
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [showPopup]);
    useEffect(() => {
        fetchAddress()
    }, [])
    console.log("New Address", newAddress)

    const handleAddressSelection = (index) => {
        setSelectedAddress(index);
        console.log("index", index)
    };

    const fetchAddress = async () => {
        try {
            const response = await axios.post(`${backendUrl}/Users/address`, { UserId: userID });
            const addresses = response.data.address;
            if (addresses.length > 0) {
                // Set the first address as the default selected address
                setSelectAddress(addresses[0]);
            }
            setNewAddress(addresses);
        } catch (error) {
            console.log(error);
        }
    };



    const handleEdit = async (add, index) => {
        // Implement edit logic here
        setPincode(add.pincode);
        setLocality(add.locality);
        setAddress(add.address);
        setCity(add.city);
        setState(add.state);
        setLandmark(add.landmark);
        setAddressType(add.addressType);
        setPhone(add.phone);
        // Set the editId to the index to switch to the edit mode
        setEditId(index);


    };
    const handleUpdate = async (index) => {
        // e.preventDefault();
        try {
            const response = await axios.put(`${backendUrl}/Users/updateAddress/${index}`, {
                pincode: pincode,
                locality: locality,
                address: address,
                city: city,
                state: state,
                landmark: landmark,
                addressType: addressType,
                phone: phone,
                userId: userID
            })
            setNewAddress(response.data)
            setPincode('');
            setLocality('');
            setAddress('');
            setCity('');
            setState('');
            setLandmark('');
            setAddressType('');
            setPhone('');
        }
        catch (err) {
            console.log(err)
        }
    }

    // Function to handle delete action
    const handleDelete = async (index) => {
        // Implement delete logic here
        try {
            await axios.post(`${backendUrl}/Users//deleteAddress/${index}`, { userId: userID })
        }
        catch (err) {
            console.log(err)
        }
    };

    const [user, setUser] = useState([])
    useEffect(() => {
        fetchUser()
    }, []);

    const fetchUser = async () => {
        const response = await axios.get(`${backendUrl}/users/Users`)
        // setUser(response.data)
        {
            response.data.filter((data) => data._id === userID ? setUser(data) : data)
        }
    }
    console.log("Users daa", user)
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


    const removeCart = async (id) => {
        try {
            const response = await axios.put(`${backendUrl}/Users/deleteCart/${id}`, { userID });
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
            toast.error("out of stock")
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

    const decreementQty = async (id, sizze) => {
        try {
            const newQty = cart.map((item) =>

                item.id === id && item.size === sizze ? { ...item, qty: item.qty - 1 } : item
            )
            setCart(newQty)

            await axios.put(`${backendUrl}/Users/cart/${id}`, { userID, cart: newQty })
            console.log("cart", cart)
            await stockIncreement(id, sizze);
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

    const deliver = async (index) => {
        setChangeAddress(true);
        // alert(index);
        try {
            const response = await axios.post(`${backendUrl}/Users/getAddressByIndex/${index}`, { userId: userID });
            const selectedAddress = response.data.address;
            setSelectAddress(selectedAddress);
            console.log("Selected Address", selectedAddress);
        } catch (error) {
            console.log(error);
            // Handle errors here
        }
    };

    const addAddress = async () => {
        setAddId(true)
    }

    const category = [...new Set(products.map(data => data.category))]
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/Users/address/${userID}`, {
                pincode,
                locality,
                address,
                city,
                state,
                landmark,
                addressType,
                phone
            });
            console.log("address", response.data);
            // Clear the form after successful submission
            setPincode('');
            setLocality('');
            setAddress('');
            setCity('');
            setState('');
            setLandmark('');
            setAddressType('');
            setPhone('');
            setAddId(false)
            window.location.reload();
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };
    console.log("first", addressType)
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

                                    <Nav.Link onClick={() => nav(`/ProductsDisplay/${category[3]}`)}><p className="headerTitles1H">COMBO</p></Nav.Link>
                                    <Nav.Link onClick={() => nav('/NewLaunch')}><p className="headerTitles1H">NEW LAUNCH</p></Nav.Link>
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
                                    <Nav.Link onClick={() => nav('/Wishlist')}><IoMdHeartEmpty className="headerRightIcons1H" /></Nav.Link>
                                    <Nav.Link onClick={() => nav('/cart/:productId')}><IoCartOutline className="headerRightIcons1H" /></Nav.Link>
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

                            {/* <div style={{ display: 'flex', justifyContent: 'Left', alignItems: 'Left', paddingLeft: '150px', marginTop: '30px' }} className='homeNaruto'>
                                <Link to={'/'}><p>Home</p></Link>
                                <p style={{ marginLeft: '20px', marginRight: '20px' }}>/</p> <Link to={'/Naruto'}><p style={{ fontWeight: 'bold' }}>Cart</p></Link></div> */}

                            <div className="emptyCart2">



                                <div className="centerf2AddToCartB">

                                    <div className="leftCenterBuyNow">

                                        <div className="centerBuyNow1">
                                            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '15px', paddingLeft: '20px' }}>
                                                <button style={{ height: '20px', width: '20px', border: 'none', color: 'blue', fontSize: '13px' }}>1</button>
                                                <h6 style={{ color: 'gray', fontWeight: 'bold', marginLeft: '15px', marginTop: '3px' }}>LOGIN</h6></div>
                                            <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '55px', paddingTop: '10px' }}>
                                                <p className='userBuyNow'>{user.username}</p>
                                                <p className='emailBuyNow'>{user.email}</p>
                                            </div>
                                        </div>

                                        <div className="centerBuyNow2" style={{ marginTop: '20px', paddingTop: '8px', paddingLeft: '20px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                <button style={{ height: '20px', width: '20px', border: 'none', color: 'blue', fontSize: '13px' }}>2</button>
                                                <h6 style={{ color: 'gray', fontWeight: 'bold', marginLeft: '15px', marginTop: '3px' }}>DELIVERY ADDRESS</h6></div>
                                            {addrz.length === 0 ? <><button onClick={addAddress} style={{ height: '60px', width: '740px', border: '1px solid', alignItems: 'center', display: 'flex', flexDirection: 'row', backgroundColor: 'white' }}>
                                                <p style={{ marginTop: '18px', marginLeft: '20px', color: 'blue', fontSize: '25px' }}>+ </p><p style={{ marginTop: '18px', marginLeft: '10px', color: 'blue' }}>ADD NEW ADDRESS</p>
                                            </button>
                                                {addId === true &&


                                                    <div style={{ marginTop: '20px' }}>
                                                        <form style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', width: '100%' }}>

                                                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                                                <div>
                                                                    <input type="text" style={{ height: '60px', width: '300px', fontSize: '14px' }} placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                                                                </div>
                                                                <div style={{ marginLeft: '10px' }}>
                                                                    <input type="text" style={{ height: '60px', width: '300px', fontSize: '14px' }} placeholder="Locality" value={locality} onChange={(e) => setLocality(e.target.value)} />
                                                                </div>
                                                            </div>

                                                            <div style={{ marginTop: '10px', width: '100%' }}>
                                                                <textarea type="text" style={{ height: '100px', width: '610px' }} placeholder="Address (Area and Street)" value={address} onChange={(e) => setAddress(e.target.value)} />
                                                            </div>

                                                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                                                <div>
                                                                    <input style={{ height: '60px', width: '300px', fontSize: '14px' }} type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                                                                </div>
                                                                <div style={{ marginLeft: '10px' }}>
                                                                    <input style={{ height: '60px', width: '300px', fontSize: '14px' }} type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
                                                                </div>
                                                            </div>

                                                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '10px' }}>
                                                                <div>
                                                                    <input style={{ height: '60px', width: '300px', fontSize: '14px' }} type="text" placeholder="Landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
                                                                </div>
                                                                <div style={{ marginLeft: '10px' }}>
                                                                    <input style={{ height: '60px', width: '300px', fontSize: '14px' }} type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                                                </div>
                                                            </div>

                                                            <div style={{ marginTop: '10px', width: '100%' }}>
                                                                <p style={{ fontSize: '14px', color: 'grey' }}>Address Type</p>
                                                                <input type="checkbox" value={addressType} onChange={() => setAddressType("Home")} className='roundbox' /><label className='roundbox'>Home</label>
                                                                <input type="checkbox" value={addressType} onChange={() => setAddressType("Work")} className='roundbox' /><label className='roundbox'>Work</label>
                                                            </div>

                                                            <div style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }}>
                                                                <button style={{ width: '200px', height: '40px', backgroundColor: 'blue', color: 'white', border: 'none' }} onClick={handleSubmit}>SAVE</button>
                                                                <button type="button" onClick={() => setAddId(false)} style={{ border: 'none', backgroundColor: 'white', marginLeft: '10px', color: 'blue' }}>CANCEL</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                }
                                            </>

                                                :
                                                <div style={{ width: '100%' }}>

                                                    {changeAddress === true && selectAddress && (
                                                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>

                                                            {/* {
    selectAddress.map((addr, index) => ( */}
                                                            <div className='addr' style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', marginTop: '10px', width: "80%" }}>
                                                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                                                    <div>
                                                                        <label>
                                                                            {selectAddress.addressType}
                                                                        </label>
                                                                    </div>
                                                                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5px' }}>
                                                                        <p style={{ fontWeight: 'bold' }}>{user.username}</p>
                                                                        <p style={{ fontWeight: 'bold', marginLeft: '10px' }}>{selectAddress.phone}</p>
                                                                        <p style={{ marginLeft: '5px' }}>{selectAddress.address},</p>
                                                                        <p>{selectAddress.locality},</p>
                                                                        <p>{selectAddress.city},</p>
                                                                        <p>{selectAddress.state}-</p>
                                                                        <p style={{ fontWeight: 'bold' }}>{selectAddress.pincode}</p>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            {/* ))
} */}

                                                            <div style={{ width: '20%', display: 'flex', justifyContent: 'right' }}>
                                                                <button style={{ color: 'blue', background: 'white', height: '35px', width: '100px', margin: '20px' }} onClick={() => setChangeAddress(false)}>CHANGE</button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {changeAddress === false &&
                                                        <div>
                                                            {
                                                                newAddress.map((addr, index) => (
                                                                    <div className='addr' key={index} style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', marginTop: '10px' }}>
                                                                        <div style={{ width: '85%', display: 'flex', flexDirection: 'column' }}>
                                                                            <div>
                                                                                <label>
                                                                                    <input type="checkbox" checked={selectedAddress === index} onChange={() => handleAddressSelection(index)} />
                                                                                    {addr.addressType}
                                                                                </label>
                                                                            </div>
                                                                            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5px' }}>
                                                                                <p style={{ fontWeight: 'bold' }}>{user.username}</p>
                                                                                <p style={{ fontWeight: 'bold', marginLeft: '10px' }}>{addr.phone}</p>
                                                                                <p style={{ marginLeft: '5px' }}>{addr.address},</p>
                                                                                <p>{addr.locality},</p>
                                                                                <p>{addr.city},</p>
                                                                                <p>{addr.state}-</p>
                                                                                <p style={{ fontWeight: 'bold' }}>{addr.pincode}</p>
                                                                            </div>
                                                                            <div style={{ marginTop: '10px' }}>
                                                                                <button style={{ background: '#FB641B', color: 'white', border: 'none', width: '180px', height: '40px' }} onClick={() => deliver(index)}>DELIVER HERE</button>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                ))
                                                            }

                                                        </div>
                                                    }

                                                </div>
                                            }
                                        </div>

                                        <div style={{ height: '50px', width: '800px', border: '1px solid', marginLeft: '30px', marginTop: '20px', background: 'orangered', paddingTop: '10px', paddingLeft: '20px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                <button style={{ height: '20px', width: '20px', border: 'none', color: 'blue', fontSize: '13px' }}>3</button>
                                                <h6 style={{ color: 'WHITE', fontWeight: 'bold', marginLeft: '15px', marginTop: '3px' }}>ORDER SUMMARY</h6></div>
                                        </div>
                                        {cart && cart?.length !== 0 ?

                                            <div className="amain-card1aAddToCart">
                                                {
                                                    cart.map((data, index) => (


                                                        <div class="card1aAddToCartb" key={data._id}>

                                                            <div className="card1a-leftAddToCart">
                                                                <img src={data.image} alt="" style={{ height: '260px', width: '100%' }} />
                                                            </div>
                                                            <div className="card1a-rightAddToCart">
                                                                <div className="removeButtonAddToCartB1"><Link style={{ textDecoration: 'none' }} onClick={() => removeCart(data.id)}><p style={{ fontSize: '16px', color: 'grey', letterSpacing: '1px' }}>REMOVE</p></Link></div>
                                                                <div className="data11AddToCart"><h2 style={{ fontSize: '20px' }}>{data.name}</h2></div>
                                                                <div className="data11AddToCart"><h2 style={{ fontSize: '20px',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center' }}><p>size: </p> <p style={{fontSize:'14px',marginTop:'5px'}}> {data.size}</p></h2></div>
                                                                <div className="data12AddToCart"><h2 style={{ fontSize: '20px' }}>Rs. {data.price * data.qty}.00</h2></div>

                                                                {/* <CartDropDown  quantity={data.quantity} onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)} /> */}
                                                                <div className="dropDwonQuantity" style={{ display: 'flex', flexDirection: 'row', marginBottom: '70px' }}>
                                                                    <button style={{ border: 'none' }} onClick={() => data.qty > 1 ? decreementQty(data.id, data.size) : data}>-</button> &nbsp;
                                                                    <button style={{ borderRadius: '20px', height: '30px', width: '30px' }} >{data.qty}</button>&nbsp;
                                                                    <button style={{ border: 'none' }} onClick={() => data.qty < 8 ? increementQty(data.id, data.size) : data}>+</button></div>

                                                            </div>


                                                        </div>
                                                    ))
                                                }
                                            </div> : <div></div>
                                        }
                                    </div>

                                    <div className="amain-card2aAddToCartb">

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

                                        <div className="amain-card2aAddToCart-buttonB" style={{ padding: '5px' }}>
                                            <div ><Link><button class="btn btn-dark" style={{ width: '100%' }} onClick={togglePopup}>Continue</button></Link></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </>
                    )

                }

            </div>

            <div>

                {/* Popup message */}
                {showPopup && (
                    <div className="popup-container">
                        <div className="popup-message">
                            <h2>Your order is placed!</h2>
                            {/* Fireworks animation */}
                            <div className="fireworks">
                                {/* Generate multiple fireworks */}
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="firework" style={{ animationDelay: `${index * 0.2}s` }}></div>
                                ))}
                            </div>
                            {/* <button onClick={togglePopup} style={{ border: 'none', backgroundColor: 'white' }}>Close</button> */}
                        </div>
                    </div>
                )}
            </div>
            {/* Popup message */}

            <div style={{ height: '100%', width: '100%' }}>
                {/* <Image height="100%" width="100%" src='https://otakukulture.in/wp-content/uploads/2023/09/Footer_HD_-e1674635998929.png'></Image> */}
                <hr />
            </div>
            <div className="footer1H">

                <div className="footer1aH" style={{ paddingTop: '100px' }}>
                    <div className="leftFooter1H" style={{ backgroundColor: 'black' }}>
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

export default BuyNow;
