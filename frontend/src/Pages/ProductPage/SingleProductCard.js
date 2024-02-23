import React, { useState } from "react";
import tv from "../../images/Ecommerce.jpg";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import axios from "axios";
import { server } from "../../FixedUrl";
import ProductPopup from "./ProductPopup";
import { RxEyeOpen } from "react-icons/rx";
const SingleProductCard = ({ product }) => {
  const [addedToCart, setaddedToCart] = useState(false);
  const [wishlist, setwishlist] = useState(false);
  const[eyeopen,setEyeOpen]=useState(false);
  const addToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    const productId = product._id;

    try {
      const { data } = await axios.post(
        `${server}/user/cart/${userId}/${productId}`
      );
      console.log(data);
      if (data.success) {
        setaddedToCart(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleOpen=()=>{
     setEyeOpen(!eyeopen)
  }
  const wishList = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    const productId = product._id;

    try {
      const { data } = await axios.post(
        `${server}/user/wishlist/${userId}/${productId}`
      );
      console.log(data);
      if (data.success) {
        setwishlist(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const openDetailsPage = () => {
    navigate("/product");
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={tv} alt={product.name} onClick={openDetailsPage} />
      </div>
      <div className="product-details">
        <div className="desc-container">
          <h2>{product.name}</h2>
          <p>
            <i>
              {product.description.length < 100
                ? product.description
                : product.description.slice(0, 100) + "..."}
            </i>
          </p>
        </div>

        <div className="bottom-container">
          <div className="product-footer">
            <span>
              <b>Price: </b>
              <strike>Rs.{product.actualPrice}</strike>
              <b>Rs.{product.discountPrice}</b>
            </span>
            <span>Rating: {product.singleRating}</span>
          </div>
          <div className="cart-wishlist-btns">
            <div>
              <button onClick={addToCart}>
                {addedToCart ? "Added" : "Add to cart"} <FaShoppingCart />
              </button>
            </div>
            <div>
              <button onClick={wishList}>
                {wishlist ? "Wishlisted" : "Add to wishlist"} <FaHeart />
              </button>
            </div>
            <div>
              <button onClick={handleOpen}>
                EyeOpen <RxEyeOpen />
              </button>
            </div>
            {eyeopen&&<ProductPopup product={product} handleOpen={handleOpen} addToCart={addToCart}/>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleProductCard;
