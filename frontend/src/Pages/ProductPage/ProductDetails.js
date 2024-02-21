import React, { useEffect, useState } from "react";
import "../styles/Product.css";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import CategoryHeader from "../CategoryHeader";
import { useSelector } from "react-redux";
import { server } from "../../FixedUrl";

const ProductDetails = () => {
  useSelector((state) => console.log(state));
 
  const [mainImage, setMainImage] = useState(
    "https://www.parivarceremony.com/media/catalog/product/cache/62408a38a401bb86dbe3ed2f017b539f/p/2/p2167sr06.jpg"
  );

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setaddedToCart] = useState(false);
  const [wishlist, setwishlist] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    actualPrice: "",
    discountPrice: "",
  });

  const colorImages = [
    "https://www.parivarceremony.com/media/catalog/product/cache/62408a38a401bb86dbe3ed2f017b539f/p/2/p2167sr06.jpg",
    "https://assets.shopkund.com/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/a/c/acu8056-1-printed-weaving-silk-saree-in-pink-sr23494.jpg",
    "https://assets.shopkund.com/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/a/c/acu8057-1-silk-saree-with-printed-weaving-in-green-sr23495.jpg",
  ];

  const changeMainImage = (newImage) => {
    setMainImage(newImage);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/get/65c8a214920eee101c3f2cd3`
      );

      const productDetails = data.product;
      setProduct({
        name: productDetails.name,
        description: productDetails.description,
        actualPrice: productDetails.actualPrice,
        discountPrice: productDetails.discountPrice,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
      else{
        alert("Item already in cart");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addToWishList = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    const productId = product._id;

    try {
      const { data } = await axios.post(
        `${server}/user/wishlist/${userId}/${productId}`
      );
      console.log("data is ", data);
      if (data.success) {
        setwishlist(true);
      } else {
        alert("Item already is in wishlist");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="header">
        <CategoryHeader />
        <h1>Header</h1>
      </div>

      <div className="container">
        <div className="images">
          <div className="images-container">
            <img src={mainImage} alt="Product Image" />
          </div>

          <div className="color-options-container">
            {colorImages.map((color, index) => (
              <div className="color-images">
                <img
                  key={index}
                  src={color}
                  alt={`Color Option ${index + 1}`}
                  onClick={() => changeMainImage(color)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="details-container">
          <div className="product-title">{product.name}</div>
          <div className="product-description">{product.description}</div>
          <div className="price">
            <strike className="actualPrice">Rs. {product.actualPrice}</strike>
            <span className="discountPrice">Rs. {product.discountPrice}</span>
          </div>

          <div className="quantity-button">
            <button className="quantity-btn" onClick={handleDecrease}>
              -
            </button>
            <span className="quantity-display">{quantity}</span>
            <button className="quantity-btn" onClick={handleIncrease}>
              +
            </button>
          </div>

          <div className="add-to-btns">
            <div>
              <button className="add-to-cart-btn" onClick={addToCart}>
                <span>Add to Cart</span> <FaShoppingCart />
              </button>
            </div>
            <div>
              <button className="add-to-wishlist-btn" onClick={addToWishList}>
                <span> Add to wishlist</span>
                <FaHeart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
