import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Carousel } from "react-bootstrap";
import "../home/ImageSlider.css";
import { myContext } from "../context/Context";
import axios from "axios";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { FaSearchPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../home/home.css";
import { backendUrl } from "../../utils/utils";
import toast from "react-hot-toast";
import AddToCart from "../cart/AddToCart";

function ImageSlider() {
  const [index, setIndex] = useState(0);
  const {
    size,
    setSize,
    products,
    setProducts,
    producId,
    cart,
    setCart,
    wishlist,
    setWishlist,
  } = useContext(myContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const nav = useNavigate();
  const [id, setId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const userID = localStorage.getItem("UserId");
  console.log("UserId", userID);
  // console.log("Naruto", naruto)
  const token = localStorage.getItem("AuthToken");
  console.log("AuthToken", token);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get(`${backendUrl}/Product/products`);
    setProducts(response.data);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // Number of cards to display per slide
  const chunkSize = 4;

  // Split products into overlapping chunks of size chunkSize
  const productChunks = [];
  for (let i = 0; i < products.length - chunkSize + 1; i++) {
    productChunks.push(products.slice(i, i + chunkSize));
  }
  const displayProduct = (id) => {
    console.log("id", id);

    nav(`/product/${id}`);
  };

  console.log("ProductId", producId);

  const addToCart = async (prod, id, sizee) => {
    console.log("Product:", prod);
    console.log("Product:", prod);
    console.log("SIzeee", sizee);
    try {
      if (token) {
        const isProductInCart = cart.find(
          (item) => item._id === id && item.size === sizee
        );
        if (isProductInCart) {
          toast.error("Product already exists in cart");
        } else {
          const response = await axios.put(
            `${backendUrl}/Users/cart`,
            {
              id: prod._id,
              userID,
              name: prod.name,
              price: prod.price,
              image: prod.image,
              qty: prod.qty,
              size,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("response", response);
          setCart(response.data.user.cart);
        }
      } else {
        toast.error("Sign in first");
        nav("/Login");
      }
    } catch (err) {
      if (err.response.status === 401) {
        // Unauthorized - invalid token or token not provided
        toast.error("Unauthorized - Please sign in again");
        // Redirect to login page or perform any other action as needed
        nav("/Login");
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.message === "already added"
      ) {
        toast.error("Product already exists in cart");
      } else {
        console.log(err, "Product id not found");
      }
    }
  };

  const changeDiv = async (prod, id) => {
    setId(id);
    setSize("S");
  };

  // console.log("newcart", cart);

  const addToWishlist = async (prod, id) => {
    try {
      if (token) {
        const isProductInWishlist = wishlist.find(
          (wishlistItem) => wishlistItem._id === id
        );
        if (isProductInWishlist) {
          toast.error("Product already exists in cart");
        } else {
          const response = await axios.post(`${backendUrl}/Users/wishlist`, {
            id: prod._id,
            userID,
            name: prod.name,
            price: prod.price,
            image: prod.image,
          });
          console.log("response", response);
          setWishlist(response.data.user.cart);
        }
      } else {
        toast.error("Sign in first");
        nav("/Login");
      }
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.message === "already added"
      ) {
        toast.error("Product already exists in wishlist");
      } else {
        console.log(err, "Product is not found");
      }
    }
  };

  const openModal = (item) => {
    setShowModal(true);
    setSelectedProduct(item);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const increementQty = async (id) => {
    // console.log("first",id)
    try {
      const newQty =
        selectedProduct._id === id
          ? { ...selectedProduct, qty: selectedProduct.qty + 1 }
          : selectedProduct;

      setSelectedProduct(newQty);
      axios.put(`${backendUrl}/Users/cart/${id}`, { userID, cart: newQty });
      console.log("Display", selectedProduct);
    } catch (err) {
      console.log(err);
    }
  };

  const decreementQty = async (id) => {
    // console.log("first",id)
    try {
      const newQty =
        selectedProduct._id === id
          ? { ...selectedProduct, qty: selectedProduct.qty - 1 }
          : selectedProduct;

      setSelectedProduct(newQty);
      axios.put(`${backendUrl}/Users/cart/${id}`, { userID, cart: newQty });
      console.log("Display", selectedProduct);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Carousel
      interval={3000}
      activeIndex={index}
      onSelect={handleSelect}
      controls={false}
    >
      {productChunks.map((chunk, idx) => (
        <Carousel.Item key={idx}>
          <div className="d-flex justify-content-evenly newlySLide">
            {chunk.slice(-16).map((item, cardIndex) => (
              <div>
                {item._id === id ? (
                  <Card
                    style={{
                      width: "330px",
                      height: "460px",
                      border: "none",
                      marginTop: "40px",
                      backgroundColor: "white",
                    }}
                    className="narutoCardChange1"
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        alignItems: "right",
                      }}
                    >
                      <button
                        onClick={() => setId(null)}
                        style={{
                          fontSize: "18px",
                          border: "none",
                          backgroundColor: "white",
                          fontWeight: "bold",
                        }}
                      >
                        x
                      </button>
                    </div>
                    <div className="narutoCardChange2">
                      <div>
                        <p
                          className="homeCardsPrice1"
                          style={{ fontSize: "20px", fontWeight: "bold" }}
                        >
                          Rs. {item.price}.00
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <p>size: </p>{" "}
                        <p style={{ fontSize: "14px", marginTop: "2px" }}>
                          {" "}
                          {size}
                        </p>
                      </div>
                      <div>
                        <button
                          className="BtnProd"
                          onClick={() => setSize("S")}
                          style={{
                            backgroundColor: size === "S" ? "orange" : "red",
                          }}
                        >
                          S
                        </button>
                        <button
                          className="BtnProd"
                          onClick={() => setSize("M")}
                          style={{
                            marginLeft: "20px",
                            backgroundColor: size === "M" ? "orange" : "red",
                          }}
                        >
                          M
                        </button>
                        <button
                          className="BtnProd"
                          onClick={() => setSize("X")}
                          style={{
                            marginLeft: "20px",
                            backgroundColor: size === "X" ? "orange" : "red",
                          }}
                        >
                          X
                        </button>
                        <button
                          className="BtnProd"
                          onClick={() => setSize("XL")}
                          style={{
                            marginLeft: "20px",
                            backgroundColor: size === "XL" ? "orange" : "red",
                          }}
                        >
                          XL
                        </button>
                        <button
                          className="BtnProd"
                          onClick={() => setSize("XXL")}
                          style={{
                            marginLeft: "20px",
                            backgroundColor: size === "XXL" ? "orange" : "red",
                          }}
                        >
                          XXL
                        </button>
                      </div>
                      <div style={{ marginTop: "20px" }}>
                        <AddToCart item={item} />
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card
                    key={cardIndex}
                    className="slideCards"
                    style={{ width: "300px", border: "none" }}
                    onMouseEnter={() => handleMouseEnter(cardIndex)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className="slideIconsMainI"
                      style={{ position: "relative" }}
                    >
                      <Link to={`/ProductDisplay/${item._id}`}>
                        <Card.Img
                          variant="top"
                          src={item.image}
                          style={{
                            width: "300px",
                            height: "410px",
                            objectFit: "cover",
                          }}
                          // onClick={() => displayProduct(item._id)}
                        />
                      </Link>
                      {hoveredIndex === cardIndex && (
                        <div
                          style={{ position: "absolute", bottom: 10, left: 10 }}
                        >
                          <div className="slideIconsI">
                            <Link>
                              <FaRegHeart
                                style={{
                                  color: wishlist.some(
                                    (items) => items.id === item._id
                                  )
                                    ? "red"
                                    : "white",
                                }}
                                onClick={() => addToWishlist(item, item._id)}
                                className="iconsI"
                              />
                            </Link>
                          </div>
                          <div className="slideIconsI">
                            <Link>
                              <AiOutlineShoppingCart
                                // style={{color: cart.some(items => items.id === item._id) ? 'red' : 'white' }}
                                onClick={() => changeDiv(item, item._id)}
                                className="iconsI"
                              />
                            </Link>
                          </div>
                          <div className="slideIconsI">
                            <Link>
                              <FaSearchPlus
                                onClick={() => openModal(item)}
                                className="iconsI"
                              />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="homeCards1">{item.name}</p>
                    </div>
                    <div>
                      <p className="homeCardsPrice1">Rs. {item.price}.00</p>
                    </div>
                    {/* <button style={{backgroundColor:"blue",color:"white"}} onClick={() => displayProduct(item._id)}>view</button> */}
                  </Card>
                )}
                {/* // <Link to={`/product/${item._id}`}> */}
              </div>

              // </Link>
            ))}
          </div>
        </Carousel.Item>
      ))}
      {showModal && (
        <div className="modal1">
          <div className="modal-content1">
            {/* <span className="close" onClick={closeModal}>
              &times;
            </span> */}
            <div className="maindiv">
              <div className="leftdiv">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <img
                    style={{ margin: "10px" }}
                    src={selectedProduct.image}
                    height={340}
                    width={310}
                    alt=""
                  />
                  <Button
                    variant="danger"
                    onClick={() =>
                      nav(`/ProductDisplay/${selectedProduct._id}`)
                    }
                    style={{
                      width: "310px",
                      height: "30px",
                      marginBottom: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "none",
                    }}
                  >
                    View Product Details
                  </Button>
                </div>
              </div>
              <div className="rightdiv">
                <div>
                  <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {selectedProduct.name}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Rs. {selectedProduct.price}.00
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "14px" }}>
                    {selectedProduct.description}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "left",
                    alignItems: "left",
                  }}
                >
                  <p style={{ fontSize: "14px" }}>SIZE : </p>{" "}
                  <p
                    style={{
                      fontSize: "14px",
                      marginTop: "0px",
                      marginLeft: "5px",
                    }}
                  >
                    {" "}
                    {size}
                  </p>
                </div>
                <div>
                  <button
                    className="BtnProd"
                    onClick={() => setSize("S")}
                    style={{ backgroundColor: size === "S" ? "orange" : "red" }}
                  >
                    S
                  </button>
                  <button
                    className="BtnProd"
                    onClick={() => setSize("M")}
                    style={{
                      marginLeft: "20px",
                      backgroundColor: size === "M" ? "orange" : "red",
                    }}
                  >
                    M
                  </button>
                  <button
                    className="BtnProd"
                    onClick={() => setSize("X")}
                    style={{
                      marginLeft: "20px",
                      backgroundColor: size === "X" ? "orange" : "red",
                    }}
                  >
                    X
                  </button>
                  <button
                    className="BtnProd"
                    onClick={() => setSize("XL")}
                    style={{
                      marginLeft: "20px",
                      backgroundColor: size === "XL" ? "orange" : "red",
                    }}
                  >
                    XL
                  </button>
                  <button
                    className="BtnProd"
                    onClick={() => setSize("XXL")}
                    style={{
                      marginLeft: "20px",
                      backgroundColor: size === "XXL" ? "orange" : "red",
                    }}
                  >
                    XXL
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={{
                      height: "40px",
                      width: "90px",
                      border: "1px solid",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "30px",
                    }}
                  >
                    <button
                      style={{
                        height: "34px",
                        width: "30px",
                        background: "white",
                        borderColor: "white",
                        fontSize: "20px",
                        border: "white",
                      }}
                      onClick={() =>
                        selectedProduct.qty > 1
                          ? decreementQty(selectedProduct._id)
                          : selectedProduct
                      }
                    >
                      -
                    </button>
                    <div
                      style={{
                        height: "35px",
                        width: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {selectedProduct.qty}
                    </div>
                    <button
                      style={{
                        height: "34px",
                        width: "30px",
                        background: "white",
                        borderColor: "white",
                        fontSize: "20px",
                        border: "white",
                      }}
                      onClick={() =>
                        selectedProduct.qty < 8
                          ? increementQty(selectedProduct._id)
                          : selectedProduct
                      }
                    >
                      +
                    </button>
                  </div>
                  <Button
                    onClick={() =>
                      addToCart(
                        selectedProduct,
                        selectedProduct._id,
                        selectedProduct.size
                      )
                    }
                    style={{
                      marginLeft: "10px",
                      marginTop: "30px",
                      //  backgroundColor: cart.find(item => item.id === selectedProduct._id && item.size === selectedProduct.size) ? 'green' : 'black'
                    }}
                    variant="dark"
                    className="acard-button1"
                  >
                    {/* {cart.find(item => item.id === selectedProduct._id) ? "ADDED" : "ADD TO CART"} */}
                    ADD TO CART
                  </Button>
                </div>

                <div
                  style={{
                    marginTop: "30px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Link
                    style={{
                      color: "black",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <FaRegHeart
                      onClick={() =>
                        addToWishlist(selectedProduct, selectedProduct._id)
                      }
                      style={{
                        marginTop: "2px",
                        color: wishlist.some(
                          (item) => item.id === selectedProduct._id
                        )
                          ? "red"
                          : "black",
                      }}
                      className="iconsIP"
                    />
                    <p
                      onClick={() =>
                        addToWishlist(selectedProduct, selectedProduct._id)
                      }
                      style={{ marginLeft: "5px" }}
                    >
                      Available in wishlist
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <Button
              variant="secondary"
              style={{ width: "100%" }}
              onClick={closeModal}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </Carousel>
  );
}

export default ImageSlider;
