import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { IoCartOutline } from 'react-icons/io5';
import '../myprofile/MyProfile.css';
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
// import { PiUserCircleBold } from "react-icons/pi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import axios from 'axios';
import { BsThreeDotsVertical } from "react-icons/bs";
import { backendUrl } from '../../utils/utils';
import toast from 'react-hot-toast';

const MyProfile = () => {
    const { username, setUsername, email, setEmail, setWishlist, setCart,
        pincode, setPincode, locality, setLocality, address, setAddress, city, setCity, state, setState, landmark, setLandmark, addressType, setAddressType,
        phone, setPhone,products,
    } = useContext(myContext)
    const heading1 = 'NOW ENJOY ALL INDIA FREE SHIPPING ON EVERY ORDER'; // First heading text
    const heading2 = 'EXTRA 5% DISCOUNT FOR ALL ONLINE PAYMENTS'; // Second heading text
    const interval = 3000; // Interval between heading changes (in milliseconds)
    const [isShopByAnimeHovered, setIsShopByAnimeHovered] = useState(false);
    const [isShopByProducts, setIsShopByProducts] = useState(false);
    const userID = localStorage.getItem("UserId")
    const [user, setUser] = useState([])
    const [userId, setUserId] = useState(null)

    const [addId, setAddId] = useState(false)
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [showInformationForm, setShowInformationForm] = useState(true)
    const [newAddress, setNewAddress] = useState([])
    const [emailId, setEmailId] = useState(true)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [allUsers, setAllUsers] = useState([])
    const [editId, setEditId] = useState(null)
    
    useEffect(() => {
        fetchAllUser()
    }, []);

    const fetchAllUser = async () => {
        const response = await axios.get(`${backendUrl}/users/Users`)
        setAllUsers(response.data)
    }

    console.log("All users", allUsers)
    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Function to handle edit action
    const handleEdit = async (add,index) => {
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
            const response = await axios.put(`${backendUrl}/Users/updateAddress/${index}`,{
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
            window.location.reload();
        }
        catch (err) {
            console.log(err)
        }
    }

    // Function to handle delete action
    const handleDelete = async (index) => {
        // Implement delete logic here
        try {
            await axios.post(`${backendUrl}/Users/deleteAddress/${index}`, { userId: userID })
            window.location.reload();
        }
        catch (err) {
            console.log(err)
        }
    };

    console.log("UserId", userID)
    // const [usersname,setUsersname] = useState([])

    useEffect(() => {
        fetchAddress()
    }, [])
    console.log("New Address", newAddress)

    const fetchAddress = async () => {
        try {

            const response = await axios.post('${backendUrl}/Users/address', { UserId: userID })
            setNewAddress(response.data.address)
        } catch (error) {
            console.log(error);
        }
    }



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

    const nav = useNavigate()

    useEffect(() => {
        fetchUser()
    }, [])
    const fetchUser = async () => {
        const response = await axios.get("${backendUrl}/users/Users")
        // setUser(response.data)
        {
            response.data.filter((data) => data._id === userID ? setUser(data) : data)
        }
    }
    console.log("Users daa", user)
    const editUserName = async () => {
        setUserId(userID)
        setUsername(user.username)
    }
    const editEmail = async () => {
        setEmailId(false)
        setEmail(user.email)
    }

    const saveUser = async () => {
        try {
            if (username === '') {
                alert("username not be null")
            }
            else {
                const existingUser = allUsers.find((data) => data.username === username);
                if (existingUser) {
                    toast.error('User already exists. Please choose a different username.');
                    return;
                }
                const response = await axios.put(`${backendUrl}/Users/editUsers`, { username: username, userID })
                setUser(response.data)
                setUserId(null)
                console.log("first", user)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const saveEmail = async () => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address.');
            return;
        }
        try {
            // Check if the email already exists
            const existingUser = allUsers.find((data) => data.email === email);
            if (existingUser) {
                toast.error('Email already exists. Please choose a different email.');
                return;
            } else {
                // If email doesn't exist and is valid, proceed with saving
                const response = await axios.put(`${backendUrl}/Users/editEmail`, { email: email, userID });
                setUser(response.data);
                setEmailId(true);
                console.log("first", username);
            }
        } catch (err) {
            console.log(err);
        }
    };



    const Logout = async () => {
        localStorage.removeItem("AuthToken")
        localStorage.removeItem("UserId")
        localStorage.removeItem("userEmail")
        localStorage.removeItem("authToken")
        setWishlist('')
        setCart('')
        toast.success("Logout completed successfully")
        nav('/Login')
    }
    const manageAddress = async () => {
        setAddId(true)
    }
    const addAddress = async () => {
        setAddId(true)
    }
    const handleManageAddressClick = () => {
        setShowAddressForm(true);
        setShowInformationForm(false);
    };

    const handleManageInformationClick = () => {
        setShowInformationForm(true);
        setShowAddressForm(false);
        setAddId(false)
    }

    const category=[...new Set(products.map(data=>data.category))]

    function func(){
        nav('/MyOrders')
    }

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

            <div className="centerMP">

                <div className="MPcenter">

                    <div className="leftMP">
                        <div className="topMP">

                            <div className="leftTopMP">
                                <FaRegCircleUser style={{ fontSize: '60px' }} />
                            </div>

                            <div className="rightTopMP">
                                <p style={{ fontSize: '14px', margin: '0px', paddin: '0px' }}>Hello,</p>
                                <h5 style={{ fontWeight: 'bold', margin: '0px', padding: '0px' }}>{user.username}</h5>
                            </div>

                        </div>

                        <div className="bottomMP">

                            <div style={{ display: 'flex', width: '100%', height: '50px', paddingLeft: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%' }}><FaUser style={{ color: 'blue', fontSize: '20px' }} /></div>
                                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', width: '80%', height: '100%', paddingTop: '17px' }}><p className='accSettings'>ACCOUNT SETTINGS</p></div>
                            </div>
                            <div style={{ paddingLeft: '70px', paddingTop: '20px' }}>
                                <Link><p className='pfl' onClick={handleManageInformationClick}>Profile Information</p></Link>
                                <Link><p style={{ marginTop: '20px' }} className='pfl' onClick={handleManageAddressClick}>Manage Addresses</p></Link>
                            </div>
                            <hr style={{ width: '100%', color: 'grey' }} />

                            <div className="ordersMP">

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%' }}><img class="_3GARO3" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDI0IDE4Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04LjY5NCAtMTEpIj48ZWxsaXBzZSBjeD0iMjAuNTU3IiBjeT0iMjAiIHJ4PSIyMC41NTciIHJ5PSIyMCIvPjxwYXRoIGZpbGw9IiMyODc0RjEiIGQ9Ik05IDExdjE3LjEwOGMwIC40OTMuNDEuODkyLjkxOC44OTJoNC45M3YtNS4yNTdoLTMuMDMzbDQuOTEyLTQuNzcgNC45NzIgNC44M2gtMy4wMzVWMjloMTIuNDE3Yy41MDcgMCAuOTE4LS40LjkxOC0uODkyVjExSDl6Ii8+PC9nPjwvc3ZnPg==" /></div>
                                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', width: '80%', height: '100%', paddingTop: '17px' }}><p className='accSettings' style={{cursor:'pointer'}} onClick={func}>MY ORDERS</p></div>

                            </div>
                            <hr style={{ width: '100%' }} />
                            <div className="topBottomMP">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%' }}><RiLogoutCircleRLine style={{ color: 'blue', fontSize: '22px' }} /></div>
                                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', width: '80%', height: '100%', paddingTop: '0px' }}><button
                                    style={{ border: 'none', backgroundColor: 'white' }}
                                    className='accSettings' onClick={Logout}>Logout</button></div>
                            </div>

                        </div>
                    </div>

                    <div className="rightMP" style={{ paddingTop: '20px' }}>

                        <div className="rightMPProfile">

                            {showInformationForm && (
                                <div>
                                    <div className="profileInformation">

                                        <p style={{ fontWeight: 'bold' }}>Personal Information</p>
                                        <Link style={{ color: 'blue', marginLeft: '30px' }}><p onClick={editUserName}>Edit</p></Link>

                                    </div>

                                    <div className="userInformation">

                                        {user._id !== userId ?

                                            <input className='userInfo1' type="text" value={user.username} /> :
                                            <div>
                                                <input className='userInfo2' type="text" onChange={(a) => setUsername(a.target.value)} value={username} />
                                                <button onClick={saveUser}>SAVE</button>
                                            </div>
                                        }


                                    </div>

                                    <div className="profileInformation">

                                        <p style={{ fontWeight: 'bold' }}>Email Address</p>
                                        <Link style={{ color: 'blue', marginLeft: '30px' }}><p onClick={editEmail}>Edit</p></Link>

                                    </div>

                                    <div className="userInformation">

                                        {emailId === true ?

                                            <input className='userInfo1' type="text" value={user.email} /> :
                                            <div>
                                                <input className='userInfo2' type="text" onChange={(b) => setEmail(b.target.value)} value={email} />
                                                <button onClick={saveEmail}>SAVE</button>

                                            </div>
                                        }


                                    </div>
                                </div>

                            )}


                            <div className="addressInformation">
                                {showAddressForm && (
                                    <div>
                                        <div><p style={{ fontWeight: 'bold' }}>Manage Addresses</p></div>
                                        <button onClick={addAddress} style={{ height: '60px', width: '840px', border: '1px solid', alignItems: 'center', display: 'flex', flexDirection: 'row', backgroundColor: 'white' }}>
                                            <p style={{ marginTop: '18px', marginLeft: '20px', color: 'blue', fontSize: '25px' }}>+ </p><p style={{ marginTop: '18px', marginLeft: '10px', color: 'blue' }}>ADD NEW ADDRESS</p>
                                        </button>
                                    </div>
                                )}

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

                                {showAddressForm && (
                                    <div>
                                        {newAddress.map((addr, index) => (

                                            index !== editId ? (

                                                <div className='addr' key={index} style={{ height: '120px', width: '840px', border: '1px solid', display: 'flex', flexDirection: 'row', backgroundColor: 'white', marginTop: '20px', paddingTop: '10px', paddingLeft: '20px' }}>
                                                    <div style={{ width: '85%', display: 'flex', flexDirection: 'column' }}>
                                                        <div><button style={{ border: 'none' }}>{addr.addressType}</button></div>
                                                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5px' }}><p style={{ fontWeight: 'bold' }}>{user.username}</p><p style={{ fontWeight: 'bold', marginLeft: '10px' }}>{addr.phone}</p></div>
                                                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5px' }}><p>{addr.address},</p><p>{addr.locality},</p>
                                                            <p>{addr.city},</p><p>{addr.state}-</p><p style={{ fontWeight: 'bold' }}>{addr.pincode}</p></div>
                                                    </div>

                                                    <div style={{ width: '15%', display: 'flex', justifyContent: 'right', flexDirection: 'column', alignItems: 'right', paddingLeft: '0px' }}>
                                                        <button className='btnsz' onClick={() => handleEdit(addr, index)}>Edit</button>
                                                        <button className='btnsz' onClick={() => handleDelete(index)}>Delete</button>
                                                    </div>

                                                </div>
                                            ) : (

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
                                                            <button style={{ width: '200px', height: '40px', backgroundColor: 'blue', color: 'white', border: 'none' }} onClick={()=>handleUpdate(index)}>UPDATE</button>
                                                            <button type="button" onClick={() => setEditId(null)} style={{ border: 'none', backgroundColor: 'white', marginLeft: '10px', color: 'blue' }}>CANCEL</button>
                                                        </div>
                                                    </form>
                                                </div>

                                            )


                                        ))}
                                    </div>
                                )}


                            </div>


                        </div>



                    </div>

                </div>

            </div>




            <div style={{ height: '100%', width: '100%' }}>
                <Image height="100%" width="100%" src='https://otakukulture.in/wp-content/uploads/2023/09/Footer_HD_-e1674635998929.png'></Image>
            </div>
            <div className="footer1H" style={{ paddingTop: '100px' }}>

                <div className="footer1aH" style={{ backgroundColor: 'black' }}>
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

export default MyProfile;
