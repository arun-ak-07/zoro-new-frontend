import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Image, Card, Button } from 'react-bootstrap';
import { IoCartOutline } from 'react-icons/io5';
import '../searchItem/SearchItem.css';
import TwoHeadingsSlide from '../home/TwoHeadingsSlide';
import { myContext } from '../context/Context';
import PopOverSearchButton from '../home/PopoverSearchButton';
import myVideo from '../home/ZORO.gif';
import DropDown from '../home/DropDown';
import { IoMdHeartEmpty } from "react-icons/io";
import DropdownBox1 from '../home/DropdownBox1';
import DropdownBox from '../home/DropdownBox';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleDown, FaRegHeart } from 'react-icons/fa6';
import axios from 'axios';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaSearchPlus } from 'react-icons/fa';
import { backendUrl } from '../../utils/utils';
import toast from 'react-hot-toast';
// import { handleSearch } from '../../../../../backEnd/controller/productController';

const SearchItem = () => {
    const { searchItem,setSearchItem,serInp, setSerInp,products, setProducts, cart, setCart, wishlist, setWishlist, size, setSize  } = useContext(myContext)
    const heading1 = 'NOW ENJOY ALL INDIA FREE SHIPPING ON EVERY ORDER'; // First heading text
    const heading2 = 'EXTRA 5% DISCOUNT FOR ALL ONLINE PAYMENTS'; // Second heading text
    const interval = 3000; // Interval between heading changes (in milliseconds)
    const [isShopByAnimeHovered, setIsShopByAnimeHovered] = useState(false);
    const [isShopByProducts, setIsShopByProducts] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [id, setId] = useState(null)
    const nav = useNavigate()

    const userID = localStorage.getItem("UserId")
    const token = localStorage.getItem('AuthToken')
    console.log("Searched Item",searchItem)

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
        const storedProducts = localStorage.getItem('searchItem');
        if (storedProducts) {
          setSearchItem(JSON.parse(storedProducts));
        }
      }, []);

      const openModal = (item) => {
        setShowModal(true);
        setSelectedProduct(item)
      };
    
      const closeModal = () => {
        setShowModal(false);
      };

      const increementQty = async (id) => {
        // console.log("first",id)
        try {
            const newQty = 
            selectedProduct._id === id ? { ...selectedProduct, qty: selectedProduct.qty + 1 } : selectedProduct
            
            setSelectedProduct(newQty)
            axios.put(`${backendUrl}/Users/cart/${id}`, { userID, cart: newQty })
            console.log("Display",selectedProduct)
            
        }
        catch (err) {
            console.log(err)
        }
    }

      const addToCart = async (prod, id, sizee) => {
        // console.log("Product:", prod);
        // console.log("SIzeee",sizee)
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
    const changeDiv = async (prod, id) => {
        setId(id)
        setSize('S')
    }
    // useEffect(()=>{
    //     handleSearch()
    // })
    // async function handleSearch() {
    //     const response = await axios.get('${backendUrl}/Product/searchProducts', {
    //         params: {
    //             q: serInp,
    //             // criteria: searchCriteria.join(',') // Convert array to comma-separated string
    //         }
    //     });
    //     setSearchItem(response.data)
    // }
    
    // useEffect(()=> {
    //     const storedSearchItem = localStorage.getItem('searchInput')
    //     console.log("search",storedSearchItem);
    //     if(storedSearchItem !== null){
    //         setSerInp(storedSearchItem)
    //     }

//     },[])
//     useEffect(() => {
//     const storedSearchItem = JSON.parse(localStorage.getItem('searchItem'));
//     if (storedSearchItem) {
//         setSearchItem(storedSearchItem);
//     }
// }, []);


    // const handleChange = async () => {
    //     if (serInp === null || serInp === "") {
    //     }
    //     else {
    //         const query = serInp
    //         setSerInp(query)
    //         const filteredResults = products.filter((user) => {
    //             const { name, price, category, anime } = user

    //             return (
    //                 name.toLowerCase().includes(query.toLowerCase()) ||
    //                 price.toString().includes(query) ||
    //                 category.toLowerCase().includes(query.toLowerCase()) ||
    //                 anime.toLowerCase().includes(query.toLowerCase())
    //             )
    //         })
    //         setSearchItem(filteredResults)
    //     }
    // }
    // useEffect(()=> {
    //     handleChange()
    // },[])
    // async function handleChange() {
    //     const response = await axios.get('${backendUrl}/Product/searchProducts', {
    //         params: {
    //             q: serInp,
    //             // criteria: searchCriteria.join(',') // Convert array to comma-separated string
    //         }
    //     });
    //     setSearchItem(response.data)
    // }
       

    

console.log("Products",products)
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

            
{
    searchItem.length != '' ?
    (
        <div className="center1HSS2">
            <div className="searchResults">
                    <h2>Search results For "{serInp}" </h2>
                </div>
                <div style={{display:'flex',justifyContent:'Left',alignItems:'Left',paddingLeft:'150px',marginTop:'30px'}} className='homeNaruto'>
                    <Link to={'/'}><p>Home</p></Link> 
                <p style={{marginLeft:'20px',marginRight:'20px'}}>/</p> <Link to={'/Naruto'}><p>Search</p></Link></div>
                <div className="inpResults">
                    <p>Showing : {searchItem.length} Results</p>
                </div>
            <div className="searchItemss">
            {
                            searchItem.map((item,cardIndex) => (
                                <div>
                                {
                                    item._id === id ? (
                                        <Card
                                            style={{ width: '330px', height: '460px', border: 'none', marginTop: '40px', backgroundColor: 'white' }} className='narutoCardChange1'>
                                            <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}>
                                                <button onClick={() => setId(null)} style={{
                                                    fontSize: '18px', border: 'none', backgroundColor: 'white', fontWeight: 'bold'
                                                }}>x</button></div>
                                            <div className='narutoCardChange2'>
                                                <div><p className='homeCardsPrice1' style={{ fontSize: '20px', fontWeight: 'bold' }}>Rs. {item.price}.00</p></div>
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><p>size: </p> <p style={{ fontSize: '14px', marginTop: '2px' }}> {size}</p></div>
                                                {/* {
                                                    item.category === "shoe"
                                                } */}
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
                                                <div style={{ marginTop: '20px' }}>
                                                    <Button variant='danger'
                                                        // style={{ backgroundColor: cart.find(items => items.id === item._id && items.size === item.size) ? 'green' : 'black' }}
                                                        className='addtocartNAruto' onClick={() => addToCart(item, item._id, item.size)}>ADD TO CART</Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ) : (

                                        <Card
                                            style={{ width: '300px', border: 'none', marginTop: '40px' }}
                                            onMouseEnter={() => handleMouseEnter(cardIndex)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <div className="slideIconsMainI" style={{ position: 'relative' }}>
                                                <Link to={(`/ProductDisplay/${item._id}`)}>
                                                    <Card.Img
                                                        // onClick={() => displayProduct(item._id)}
                                                        variant="top"
                                                        src={item.image}
                                                        style={{ width: '330px', height: '410px', objectFit: 'cover' }}
                                                    /></Link>
                                                {hoveredIndex === cardIndex && (
                                                    <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
                                                        <div className='slideIconsI'>
                                                            <Link><FaRegHeart style={{ color: wishlist.some(items => items.id === item._id) ? 'red' : 'white' }}
                                                                onClick={() => addToWishlist(item, item._id)} className='iconsI' /></Link></div>
                                                        <div className='slideIconsI'>
                                                            <Link><AiOutlineShoppingCart
                                                                //  style={{ color: cart.some(items => items.id === item._id) ? 'red' : 'white' }}
                                                                className='iconsI' onClick={() => changeDiv(item, item._id)}
                                                            /></Link>

                                                        </div>
                                                        <div className='slideIconsI'><Link><FaSearchPlus onClick={() => openModal(item)}  className='iconsI'
                                                            />
                                                        </Link>

                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div><p className='homeCards1'>{item.name}</p></div>
                                            <div><p className='homeCardsPrice1'>Rs. {item.price}.00</p></div>
                                        </Card>

                                    )
                                }



                            </div>   
                            ))
                        }
            </div>
        </div>
    ) : (

        <div className="center1HSS">
            <div className="searchResults">
                    <h2>Search results For "{serInp}" </h2>
                </div>
                <div style={{display:'flex',justifyContent:'Left',alignItems:'Left',paddingLeft:'150px',marginTop:'30px'}} className='homeNaruto'>
                    <Link to={'/'}><p>Home</p></Link> 
                <p style={{marginLeft:'20px',marginRight:'20px'}}>/</p> <Link to={'/Naruto'}><p>Search</p></Link></div>
                <div className="inpResults">
                    <p>Showing : {searchItem.length} Results</p>
                </div>
            <div className="searchItemss">
            {
                            searchItem.map((item,cardIndex) => (
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

    )

    
}
                
          
            

            

            
            {/* <div style={{height:'100%',width:'100%'}}>
                    <Image height="100%" width="100%" src='https://otakukulture.in/wp-content/uploads/2023/09/Footer_HD_-e1674635998929.png' />
            </div> */}
            <div className="footer1H" style={{paddingTop:'100px'}} >

                <div className="footer1aH">
                    <div className="leftFooter1H" style={{backgroundColor:'black'}}>
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
            {showModal && (
        <div className="modal1">
          <div className="modal-content1">
            {/* <span className="close" onClick={closeModal}>
              &times;
            </span> */}
            <div className='maindiv'>
                <div className="leftdiv">
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                    <img style={{margin:'10px'}} src={selectedProduct.image} height={340} width={310} alt="" />
                    <Button variant='danger' onClick={()=>nav(`/ProductDisplay/${selectedProduct._id}`)} style={{width:'310px',height:'30px',marginBottom:'20px',display:'flex',justifyContent:'center',alignItems:'center',border:'none'}}>View Product Details</Button>
                </div>
                </div>
                <div className="rightdiv">
                    <div><p style={{fontSize:'18px',fontWeight:'bold'}}>{selectedProduct.name}</p></div>
                    <div><p style={{fontSize:'20px',fontWeight:'bold'}}>Rs. {selectedProduct.price}.00</p></div>
                    <div><p style={{fontSize:'14px'}}>{selectedProduct.description}</p></div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'left' }}><p style={{fontSize:'14px'}}>SIZE : </p> <p style={{ fontSize: '14px', marginTop: '0px',marginLeft:'5px' }}> {size}</p></div>
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

                                                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ height: '40px', width: '90px', border: '1px solid', display: 'flex', flexDirection: 'row', alignItems: 'center',marginTop:'30px' }}>
                                    <button style={{ height: '34px', width: '30px', background: 'white', borderColor: 'white', fontSize: '20px', border: 'white' }}>-</button>
                                    <div style={{ height: '35px', width: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{selectedProduct.qty}</div>
                                    <button style={{ height: '34px', width: '30px', background: 'white', borderColor: 'white', fontSize: '20px', border: 'white' }}  onClick={() => selectedProduct.qty < 8 ? increementQty(selectedProduct._id) :selectedProduct}>+</button>
                                </div>
                                    <Button onClick={() => addToCart(selectedProduct, selectedProduct._id,selectedProduct.size)}
                                        style={{ marginLeft: '10px',marginTop:'30px' 
                                        //  backgroundColor: cart.find(item => item.id === selectedProduct._id && item.size === selectedProduct.size) ? 'green' : 'black'
                                          }} variant='dark' className="acard-button1" >

                                        {/* {cart.find(item => item.id === selectedProduct._id) ? "ADDED" : "ADD TO CART"} */}

                                        ADD TO CART
                                    </Button></div>

                                    <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'row' }}>
                                <Link style={{ color: 'black', display: 'flex', flexDirection: 'row' }}><FaRegHeart
                                    onClick={() => addToWishlist(selectedProduct, selectedProduct._id)}
                                    style={{ marginTop: '2px', color: wishlist.some(item => item.id === selectedProduct._id) ? 'red' : 'black' }} className='iconsIP' />
                                    <p onClick={() => addToWishlist(selectedProduct, selectedProduct._id)} style={{ marginLeft: '5px' }}>Available in wishlist</p></Link>
                            </div>
                    
                </div>
            </div>
            <Button variant='secondary' style={{width:'100%'}} onClick={closeModal}>Close</Button>
          </div>
        </div>
      )}
        </div>
    );
};

export default SearchItem;
