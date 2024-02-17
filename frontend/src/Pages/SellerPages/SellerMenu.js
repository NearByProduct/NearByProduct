import React, { Fragment } from 'react'
import {
  FaCamera,
  FaUser,
  FaShoppingCart,
  FaMoneyCheck,
  FaInbox,
  FaTruck,
  FaCreditCard,
  FaMapMarkerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
const SellerMenu = ({active,setActive}) => {
  return (
    <Fragment>
        <div className='sell'>
        <div onClick={(e)=>setActive(1)}className='sellerpagemenu'><FaUser/>DashBoard</div>
        <div onClick={(e)=>setActive(2)}className='sellerpagemenu'><FaUser/>Profile</div>
        <div onClick={(e)=>setActive(3)}className='sellerpagemenu'><FaMapMarkerAlt/>Create Product</div>
        <div onClick={(e)=>setActive(4)}className='sellerpagemenu'><FaShoppingCart/>Orders</div>
        <div onClick={(e)=>setActive(5)}className='sellerpagemenu'><FaTruck/>Track Order</div>
        <div onClick={(e)=>setActive(6)}className='sellerpagemenu'><FaCreditCard/>Shop Feeddback</div>
        <div onClick={(e)=>setActive(7)}className='sellerpagemenu'><FaInbox/>Inbox</div>
        <div onClick={(e)=>setActive(7)}className='sellerpagemenu'><FaSignOutAlt/>Logout</div>
        </div>
    </Fragment>
  )
}

export default SellerMenu