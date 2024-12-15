import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { myContext } from "./components/context/Context";
import Home from "./components/home/Home";
import { useEffect, useState } from "react";
import Product from "./components/admin/Product";
import MyNavbar from "./components/home/MyNavbar";
import NavBarHover from "./components/home/NavBarHover";
import AdminManagement from "./components/admin/AdminManagement";
import CategoryManagement from "../src/components/admin/CategoryManagement";
import PopoverSearchButton from "./components/home/PopoverSearchButton";
import RegisterForm from "./components/register/RegisterForm";
import Login from "./components/login/Login";
import UserManagement from "./components/admin/userManagement";
import ImageSlider from "./components/home/ImageSlider";
import DropDown from "./components/home/DropDown";
import Naruto from "./components/shopByAnime/Naruto";
import axios from "axios";
import DemonSlayer from "./components/shopByAnime/DemonSlayer";
import JujustuKaisen from "./components/shopByAnime/JujustuKaisen";
import ProductDisplay from "./components/productDisplay/ProductDisplay";
import SearchItem from "./components/searchItem/SearchItem";
import Cart from "./components/cart/Cart";
import Wishlist from "./components/wishlist/Wishlist";
import TokyoRevengers from "./components/shopByAnime/TokyoRevengers";
import OnePiece from "./components/shopByAnime/OnePiece";
import BuyNow from "./components/buyNow/BuyNow";

import MyProfile from "./components/myprofile/MyProfile";
import Modal from "./components/home/Modal";
import Anime from "./components/shopByAnime/Anime";
import ShopByProducts from "./components/ShopByProducts/ShopByProducts";
import Shoe from "./components/admin/Shoe";
import PopupMessage from "./components/demo/PopupMesssage";
import Demo from "./components/demo/Demo";
import Oversize from "./components/ShopByProducts/Oversize";
import NewLaunch from "./components/newLaunch/NewLaunch";
import MyOrders from "./components/myOrders/MyOrders.jsx";
import SoldierCollection from "./components/soldierCollection/SoldierCollection.jsx";
import { backendUrl } from "./utils/utils.js";
import { Toaster } from "react-hot-toast";

function App() {
  const fetchProducts = async () => {
    const response = await axios.get(`${backendUrl}/Product/products`);
    setProducts(response.data);
  };
  const userID = localStorage.getItem("UserId");
  // console.log("UserId", userID)
  useEffect(() => {
    fetchProducts();
  }, []);

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [anime, setAnime] = useState("");
  const [producId, setProductId] = useState("");
  const [qty, setQty] = useState("");
  const [size, setSize] = useState("S");
  const [stock, setStock] = useState({
    S: 0,
    M: 0,
    X: 0,
    XL: 0,
    XXL: 0,
  });

  const [shoeSize, setShoeSize] = useState("UK 6");
  const [searchItem, setSearchItem] = useState([]);
  const [serInp, setSerInp] = useState("");

  const [newCategory, setNewCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const [newTrendsCategory, setNewTrendsCategory] = useState([]);
  const [catTrendName, setCatTrendName] = useState("");
  const [catTrendImage, setCatTrendImage] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [banBtn, setBanBtn] = useState([]);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [productDisp, setProductDisp] = useState([]);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [productType, setProductType] = useState("t-shirt");

  const [pincode, setPincode] = useState("");
  const [locality, setLocality] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [addressType, setAddressType] = useState("");
  const [phone, setPhone] = useState("");

  const [addrz, setAddrz] = useState([]);
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);
  // console.log("Cart", cart)
  const fetchCart = async () => {
    try {
      const response = await axios.post("${backendUrl}/Users/getCart", {
        UserId: userID,
      });
      setCart(response.data.cart);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchWishlist();
  }, []);
  const fetchWishlist = async () => {
    try {
      const response = await axios.post(`${backendUrl}/Users/getWishlist`, {
        UserId: userID,
      });
      setWishlist(response.data.wishlist);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAddress();
  }, []);
  console.log("Hello New Address", addrz);

  const fetchAddress = async () => {
    try {
      const response = await axios.post(`${backendUrl}/Users/address`, {
        UserId: userID,
      });
      setAddrz(response.data.address);
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    products,
    setProducts,
    name,
    setName,
    price,
    setPrice,
    image,
    setImage,
    category,
    setCategory,
    description,
    setDescription,
    anime,
    setAnime,
    qty,
    setQty,
    producId,
    setProductId,
    newCategory,
    setNewCategory,
    categoryName,
    setCategoryName,
    categoryImage,
    setCategoryImage,
    size,
    setSize,
    stock,
    setStock,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    banBtn,
    setBanBtn,
    newTrendsCategory,
    setNewTrendsCategory,
    catTrendName,
    setCatTrendName,
    catTrendImage,
    setCatTrendImage,
    searchItem,
    setSearchItem,
    serInp,
    setSerInp,
    productDisp,
    setProductDisp,
    loginEmail,
    setLoginEmail,
    loginPassword,
    cart,
    setCart,
    wishlist,
    setWishlist,
    shoeSize,
    setShoeSize,
    productType,
    setProductType,
    setLoginPassword,
    pincode,
    setPincode,
    locality,
    setLocality,
    address,
    setAddress,
    city,
    setCity,
    state,
    setState,
    landmark,
    setLandmark,
    addressType,
    setAddressType,
    phone,
    setPhone,
    addrz,
    setAddrz,
    myOrders,
    setMyOrders,
  };

  return (
    <div className="App">
      <BrowserRouter>
        <myContext.Provider value={values}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/AdminManagement" element={<AdminManagement />} />
            <Route
              path="/CategoryManagement"
              element={<CategoryManagement />}
            />
            <Route path="/UserManagement" element={<UserManagement />} />
            {/* <Route path='/Shoe' element={<Shoe/>}/> */}

            {/* MY PROFILE */}
            <Route path="/MyProfile" element={<MyProfile />} />

            {/* CART */}
            <Route path="/cart/:productId" element={<Cart />} />

            {/* WISHLIST */}
            <Route path="/Wishlist" element={<Wishlist />} />

            {/* BUYNOW */}
            <Route path="/BuyNow" element={<BuyNow />} />

            {/* HOME */}
            <Route path="/MyNavbar" element={<MyNavbar />} />
            <Route path="/NavbarHover" element={<NavBarHover />} />
            <Route
              path="/PopoverSearchButton"
              element={<PopoverSearchButton />}
            />
            <Route path="/ImageSlider" element={<ImageSlider />} />
            <Route path="/DropDown" element={<DropDown />} />
            <Route path="/Modal" element={<Modal />} />

            <Route path="/SearchItem" element={<SearchItem />} />

            {/* REGISTER */}
            <Route path="/RegisterForm" element={<RegisterForm />} />
            <Route path="/Login" element={<Login />} />

            {/* SHOP BY ANIME */}
            <Route path="/Naruto" element={<Naruto />} />
            <Route path="/DemonSlayer" element={<DemonSlayer />} />
            <Route path="/JujustuKaisen" element={<JujustuKaisen />} />
            <Route path="/TokyoRevengers" element={<TokyoRevengers />} />
            <Route path="/OnePiece" element={<OnePiece />} />

            <Route path="/Products/:anime" element={<Anime />} />

            <Route
              path="/ProductsDisplay/:category"
              element={<ShopByProducts />}
            />

            {/* PRODUCT DISPLAY */}
            <Route
              path="/ProductDisplay/:productId"
              element={<ProductDisplay />}
            />

            {/* <Route path='/ProductList' element={<ProductList/>}/> */}

            {/* DEMO LINKS */}
            <Route path="/Popup" element={<PopupMessage />} />
            <Route path="/Demo" element={<Demo />} />

            {/* SHOP BY PRODUCTS */}
            <Route path="/Oversize" element={<Oversize />} />

            {/* NEW LAUNCH */}
            <Route path="/NewLaunch" element={<NewLaunch />} />
            {/* SOLDIER COLLECTION */}
            <Route path="/SoldierCollection" element={<SoldierCollection />} />

            {/* MYORDERS */}
            <Route path="/MyOrders" element={<MyOrders />} />
          </Routes>
        </myContext.Provider>
        <Toaster
  position="top-right"
  reverseOrder={true}
/>
      </BrowserRouter>
    </div>
  );
}

export default App;
