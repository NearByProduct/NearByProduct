import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../styles/sellerPage/ProDuctPopUp.css";
import tv from "../../images/Ecommerce.jpg";
import { TiArrowUpThick } from "react-icons/ti";
import { FaArrowDown } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
const ProductPopUp = ({ product, handleOpen }) => {
  const shop = {
    name: "Galaxy Shop",
    city: "delhi",
    onwer: "ramsingh",
  };
  console.log("product", product);
  const [amount, setAmount] = useState(1);
  const handleIncrease = () => {
    if (amount <= product.stock) {
      setAmount(amount + 1);
    }
  };
  const handleDecrease = () => {
    if (amount == 1) {
      return;
    }
    setAmount(amount - 1);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling when modal is open
    return () => {
      document.body.style.overflow = "scroll"; // Re-enable scrolling when component is unmounted
    };
  }, []);
  const addToCart = () => {};
  return ReactDOM.createPortal(
    <Fragment>
      <div className="modalWrapper" onClick={handleOpen}></div>
      <div className="modalContainer">
        <div className="popupcontainer">
          <div>
            <div className="croosicon" onClick={handleOpen}><GiCancel /></div>
            <div>
              <img className="popupimage" src={tv} alt="productimage" />
            </div>
            <div className="ShopInfo">
              <div><span>Shop Name  </span><span>{shop.name}</span></div>
              <div><span>Shop City  </span><span>{shop.city}</span></div>
              <div><span>Shop Onwer  </span><span>{shop.onwer}</span></div>
            </div>
          </div>
          <div className="footerpop">
            <p>Description<br/>{product.description}</p>
            <div>
              <span>
                <b>Price: </b>
                <strike>Rs.{product.actualPrice}</strike> Rs.
                {product.discountPrice}
              </span>
              <span>Rating: {product.singleRating}</span>
            </div>
            <div>
              <button className="addToCartPop" onClick={addToCart}>
                Add to cart
              </button>
            </div>
            <div className="updownicon">
              <span onClick={handleIncrease}><TiArrowUpThick /></span>
              <span>{amount}</span>
              <span onClick={handleDecrease}><FaArrowDown /></span>
            </div>
          </div>
        </div>
        <p>
          LoremThe Software Development Kit Manager Meet SDKMAN! – your reliable
          companion for effortlessly managing multiple Software Development Kits
          on Unix systems. Imagine having different versions of SDKs and needing
          a stress-free way to switch between them. SDKMAN! steps in with its
          easy-to-use Command Line Interface (CLI) and API. Formerly known as
          GVM, the Groovy enVironment Manager, SDKMAN! draws inspiration from
          familiar tools like apt, pip, RVM, and rbenv and even Git. Think of it
          as your helpful toolkit friend, ready to streamline SDK management for
          you. 🛠️ Get Started Now! Go on then, paste and run the following in a
          terminal: curl -s "https://get.sdkman.io" | bash
        </p>
      </div>
    </Fragment>,
    document.getElementById("popuproot") // Target root element
  );
};

export default ProductPopUp;
