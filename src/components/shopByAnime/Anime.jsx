import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Image, Card, Button } from 'react-bootstrap';
import '../shopByAnime/Naruto.css';
import { myContext } from '../context/Context';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../shopByAnime/Anime.css'
import { FaAngleDown, FaRegHeart } from 'react-icons/fa6';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaSearchPlus } from 'react-icons/fa';
import axios from 'axios';
import { backendUrl } from '../../utils/utils';
import toast from 'react-hot-toast';
import Header from '../home/Header';
import Footer from '../home/Footer';




const Anime = () => {
    const { products, setProducts, cart, setCart, wishlist, setWishlist, size, setSize } = useContext(myContext)

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [naruto, setNaruto] = useState([])
    const [id, setId] = useState(null)
    const [productTypeFilters, setProductTypeFilters] = useState([]);
    const [priceRangeFilters, setPriceRangeFilters] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [checkboxes, setCheckboxes] = useState([
        false
    ]);

    const nav = useNavigate()
    const userID = localStorage.getItem("UserId")
    const token = localStorage.getItem('AuthToken')

    const {anime}=useParams()

    const animeSplit=anime.split("_").join(" ")

    const productData=products.filter(item=>item.anime==animeSplit)

    console.log("anime",productData,anime,animeSplit);

    const openModal = (item) => {
        setShowModal(true);
        setSelectedProduct(item)
      };
    
      const closeModal = () => {
        setShowModal(false);
      };

    const getNaruto = async () => {
        try{
            const anime = 'naruto'
            const response = await axios.get(`${backendUrl}/Users/getCategory/${anime}`)
            console.log("Response",response.data)
            setNaruto(response.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getNaruto()
    },[])

    useEffect(() => {
        fetchProducts()

    }, []);

    const fetchProducts = async () => {
        try {
            const responseponse = await axios.get(`${backendUrl}/Product/products`)
            setProducts(responseponse.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const changeDiv = async (prod, id) => {
        setId(id)
        setSize('S')
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
                alert('SignIn First')
                nav('/Login')
            }
        }
        catch (err) {
            if (err.response && err.response.data && err.response.data.message === "already added") {
                alert("Product already exists in wishlist")
            }
            else {
                console.log(err, "Product is not found")
            }
        }
    }

    

    const handleCheckboxChange = (index) => {
        const newCheckboxes = [...checkboxes];
        newCheckboxes[index] = !newCheckboxes[index];
        setCheckboxes(newCheckboxes);
    };

    const handleClearSelection = () => {
        setCheckboxes(Array(13).fill(false));
    };

const filterProductType = (type) => {
        if (productTypeFilters.includes(type)) {
            setProductTypeFilters(productTypeFilters.filter(filterType => filterType !== type));
        } else {
            setProductTypeFilters([...productTypeFilters, type]);
        }
    };

    const filterPriceRange = (initial, final) => {
        if (priceRangeFilters.length === 2 && priceRangeFilters.includes(initial) && priceRangeFilters.includes(final)) {
            setPriceRangeFilters([]);
        } else {
            // setPriceRangeFilters([initial, final]);
            setPriceRangeFilters([...priceRangeFilters,initial,final])
        }
    };

    const filteredProducts = productData.filter(product => {
        if (productTypeFilters.length > 0 && !productTypeFilters.includes(product.category)) {
            return false;
        }
        if (priceRangeFilters.length === 2 && (product.price < priceRangeFilters[0] || product.price > priceRangeFilters[1])
         && (!priceRangeFilters.includes(product.price)))  {
            return false;
        }
        return true;
    });

    const clearAllFilters = () => {
        setProductTypeFilters([]);
        setPriceRangeFilters([]);
        setCheckboxes(Array(13).fill(false));
    };
    
    const increementQty = async (id,sizee) => {
        // console.log("first",id)
        try {
            const updatedProducts = products.map((item) => {
                if (item._id === id) {
                    // Check if the product size matches the specified size
                    if (item.stock && item.stock[sizee] > 1) {
            const newQty = 
            selectedProduct._id === id ? { ...selectedProduct, qty: selectedProduct.qty + 1 } : selectedProduct
            
            setSelectedProduct(newQty)
            axios.put(`${backendUrl}/Users/cart/${id}`, { userID, cart: newQty })
            console.log("Display",selectedProduct)
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
    const decreementQty = async (id,sizee) => {
        try {
            const newQty = 
            selectedProduct._id === id ? { ...selectedProduct, qty: selectedProduct.qty - 1 } : selectedProduct
            
            setSelectedProduct(newQty)
            axios.put(`${backendUrl}/Users/cart/${id}`, { userID, cart: newQty })
            console.log("Display",selectedProduct)
        }
        catch (err) {
            console.log(err)
        }
    }
    const category=[...new Set(products.map(data=>data.category))]
    return (
        <div className="main1H">

            <div className="header1H">

            <Header/>
        
            </div>

            <div className="center1N">

                <div className='narutoTitle'><h1>{animeSplit.toUpperCase()}</h1></div>
                <div className="narutoTitleImage">
                    {/* <Image height='100%' width='100%' src='https://otakukulture.in/wp-content/uploads/2023/09/Naruto.png'></Image> */}
                </div>

                <div style={{ display: 'flex', justifyContent: 'Left', alignItems: 'Left', paddingLeft: '150px', marginTop: '30px' }} className='homeNaruto'>
                    <Link to={'/'}><p>Home</p></Link>
                    <p style={{ marginLeft: '20px', marginRight: '20px' }}>/</p> <Link to={'/Naruto'}><p>{animeSplit}</p></Link></div>

                <div className="narutoProducts">

                    <div className="productsLeft">

                        <div className="categoryHead" style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', marginTop: '10px' }}><p>CATEGORIES</p></div>
                        <div className="categoryHead1" style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', marginTop: '20px' }}><p>PRODUCT TYPE</p></div>
                        
                        <div className="productCategory">
                            <div className='checkBoxDiv'><input type="checkbox" checked={checkboxes[0]}  onChange={() => filterProductType("t-shirt") || handleCheckboxChange(0)} className='checkBox' /><label>T - Shirt</label></div>
                            <div className='checkBoxDiv'><input type="checkbox" checked={checkboxes[1]}  onChange={() => filterProductType("hoodies") || handleCheckboxChange(1)} className='checkBox' /><label>Hoodies</label></div>
                            <div className='checkBoxDiv'><input type="checkbox" checked={checkboxes[2]}  onChange={() => filterProductType("jacket") || handleCheckboxChange(2)} className='checkBox' /><label>Jacket</label></div>
                            <div className='checkBoxDiv'><input type="checkbox" checked={checkboxes[3]} onChange={() => filterProductType("sweatshirt") || handleCheckboxChange(3)} className='checkBox' /><label>Sweatshirt</label></div>
                            <div className='checkBoxDiv'><input type="checkbox" checked={checkboxes[4]} onChange={() => filterProductType("oversize") || handleCheckboxChange(4)} className='checkBox' /><label>Oversize</label></div>
                            <div className='checkBoxDiv'><input type="checkbox" checked={checkboxes[5]} onChange={() => filterProductType("tanktop") || handleCheckboxChange(5)} className='checkBox' /><label>Tank Top</label></div>
                            <div className='checkBoxDiv'><input type="checkbox" checked={checkboxes[6]} onChange={() => filterProductType("combo") || handleCheckboxChange(6)} className='checkBox' /><label>Combo</label></div>
                        </div>

                        <div className='priceCategory'>
                            <div className="categoryHead1" style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', marginTop: '30px' }}><p>PRICE</p></div>
                        <div className='checkBoxDiv'><input type="checkbox" checked={checkboxes[7]}  onChange={()=>filterPriceRange(0,250) || handleCheckboxChange(7)} className='checkBox' /><label className='lbl'>0 - 250</label></div>
                        <div className='checkBoxDiv'><input type="checkbox" checked={checkboxes[8]}  onChange={()=>filterPriceRange(250,500) || handleCheckboxChange(8)}  className='checkBox' /><label className='lbl'>250 - 500</label></div>
                        <div className='checkBoxDiv'><input type="checkbox" checked={checkboxes[9]}  onChange={()=>filterPriceRange(500,750) || handleCheckboxChange(9)} className='checkBox' /><label className='lbl'>500 - 750</label></div>
                        <div className='checkBoxDiv'><input type="checkbox" checked={checkboxes[10]}  onChange={()=>filterPriceRange(750,1000) || handleCheckboxChange(10)} className='checkBox' /><label className='lbl'>750 - 1000</label></div>
                        <div className='checkBoxDiv'><input type="checkbox" checked={checkboxes[11]}  onChange={()=>filterPriceRange(1000,1250) || handleCheckboxChange(11)} className='checkBox' /><label className='lbl'>1000 - 1250</label></div>
                        <div className='checkBoxDiv'><input type="checkbox" checked={checkboxes[12]}  onChange={()=>filterPriceRange(1250,1500) || handleCheckboxChange(12)} className='checkBox' /><label className='lbl'>1250 - 1500</label></div>
                        <div className='checkBoxDiv'><input type="checkbox" checked={checkboxes[13]}  onChange={()=>filterPriceRange(1500,1750) || handleCheckboxChange(13)} className='checkBox' /><label className='lbl'>1500 - 1750</label></div>
                        {/* <div className='checkBoxDiv'><input type="checkbox" onChange={()=>filterPriceRange(1750,2000)} className='checkBox' /><label className='lbl'>1750 - 2000</label></div> */}
                        </div>
                        {/* <div className="categoryHead1" style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', marginTop: '30px' }}><p>SIZE</p></div> */}


                    </div>

                    <div className="productsRight">
                        {
                            productTypeFilters.length !== 0 || priceRangeFilters.length !== 0 ? <div style={{ display: 'flex', justifyContent: 'left', width: '100%' }}>
                                <button style={{ border: 'none', backgroundColor: 'black', color: 'white', fontSize: '12px', height: '25px' }} onClick={clearAllFilters}>Clear all</button></div> : false
                        }
                        {
                            filteredProducts.map((item, cardIndex) => (
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

            </div>


<hr />

            <div style={{ height: '100%', width: '100%' }}>
                {/* <Image height="100%" width="100%" src='https://otakukulture.in/wp-content/uploads/2023/09/Footer_HD_-e1674635998929.png'></Image>  */}
            </div>
            <div className="footer1H" style={{paddingTop:'100px'}}>

                <Footer/>

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
                                    <button style={{ height: '34px', width: '30px', background: 'white', borderColor: 'white', fontSize: '20px', border: 'white' }} onClick={() => selectedProduct.qty > 1 ? decreementQty(selectedProduct._id,selectedProduct.size) : selectedProduct} >-</button>
                                    <div style={{ height: '35px', width: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{selectedProduct.qty}</div>
                                    <button style={{ height: '34px', width: '30px', background: 'white', borderColor: 'white', fontSize: '20px', border: 'white' }}  onClick={() => selectedProduct.qty < 8 ? increementQty(selectedProduct._id,selectedProduct.size) :selectedProduct}>+</button>
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

export default Anime;
