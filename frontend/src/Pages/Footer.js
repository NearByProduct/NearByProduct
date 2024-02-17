import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
// import {
//   footercompanyLinks,
//   footerProductLinks,
//   footerSupportLinks,
// } from "../../static/data";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-top-section">
        <h1 className="footer-heading">
          <span className="footer-subscribe">Subscribe</span> us for get news
          <br />
          events and offers
        </h1>
        <div className="footer-input-container">
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="footer-input"
          />
          <button className="footer-submit-button">Submit</button>
        </div>
      </div>
      <div className="footer-links-section">
        <ul className="footer-links">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
            className="footer-logo"
          />
          <br />
          <p>The home and elements needed to create beautiful products.</p>
          <div className="footer-social-icons">
            <AiFillFacebook size={25} className="footer-social-icon" />
            <AiOutlineTwitter size={25} className="footer-social-icon" />
            <AiFillInstagram size={25} className="footer-social-icon" />
            <AiFillYoutube size={25} className="footer-social-icon" />
          </div>
        </ul>

        <ul className="footer-links">
          <h1 className="footer-heading">Company</h1>
          {/* {footerProductLinks.map((link, index) => (
            <li key={index}>
              <Link className="footer-link" to={link.link}>
                {link.name}
              </Link>
            </li>
          ))} */}
        </ul>

        <ul className="footer-links">
          <h1 className="footer-heading">Shop</h1>
          {/* {footercompanyLinks.map((link, index) => (
            <li key={index}>
              <Link className="footer-link" to={link.link}>
                {link.name}
              </Link>
            </li>
          ))} */}
        </ul>

        <ul className="footer-links">
          <h1 className="footer-heading">Support</h1>
          {/* {footerSupportLinks.map((link, index) => (
            <li key={index}>
              <Link className="footer-link" to={link.link}>
                {link.name}
              </Link>
            </li>
          ))} */}
        </ul>
      </div>

      <div className="footer-bottom-section">
        <span>© 2020 Ecommerce. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="footer-payment-icons">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
