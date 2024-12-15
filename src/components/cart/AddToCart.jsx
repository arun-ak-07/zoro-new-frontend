import React, { useContext } from "react";
import toast from "react-hot-toast";
import { backendUrl } from "../../utils/utils";
import axios from "axios";
import { Button } from "react-bootstrap";
import { myContext } from "../context/Context";
import { useNavigate } from "react-router-dom";

const AddToCart = ({ item }) => {
  console.log("data: " + item);
  const { size, cart, setCart } = useContext(myContext);
  const userID = localStorage.getItem("UserId");
  console.log("UserId", userID);
  // console.log("Naruto", naruto)
  const token = localStorage.getItem("AuthToken");
  console.log("AuthToken", token);
  const nav = useNavigate();

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

  return (
    <>
      <Button
        variant="danger"
        className="addtocartNAruto"
        onClick={() => addToCart(item, item._id, item.size)}
      >
        ADD TO CART
      </Button>
    </>
  );
};

export default AddToCart;
