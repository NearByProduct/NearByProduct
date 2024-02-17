import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import shop from "../images/shopimage.jpg";
import './styles/Home.css'
import HomeMain from './mainsection/HomeMain';
import BestSelling from './mainsection/BestSelling';
import Products from './mainsection/Products';
import Events from './mainsection/Events';
import Faqs from './mainsection/Faqs';
import { CgProfile } from "react-icons/cg";
import Footer from './Footer';
const Home = () =>{
    const[searchText,setSearchText]=useState("");
    const navigate=useNavigate();
    const handlebecomeseller=async(e)=>{
        navigate("/mainsellerpage");
    };
    const handleShopNow=async(e)=>{
        navigate('/productPage');
    }
    const[active,setActive]=useState(1);
    return<Fragment>
        <div className="navbar">
        <div className="logo">
            <img src={shop} alt="nearByStore"/>
        </div>
        <div className='secondclass'>
        <div className="searchbox">
            <input type="text" onChange={(e)=>setSearchText(e.target.value)}/>
        </div>
        <div className="becomeseller">
            <button onClick={handlebecomeseller}>Become Seller</button>
        </div>
        <div>
        </div>
        </div>
        </div>
        <div className="navbar2">
            <div className='allpages'><p>All Categories</p></div>
            <div className='allpages'><p></p></div>
            <div onClick={(e)=>setActive(1)} className='allpages'><p>Home</p></div>
            <div onClick={(e)=>setActive(2)} className='allpages'><p>Best Selling</p></div>
            <div onClick={(e)=>setActive(3)} className='allpages'><p>Products</p></div>
            <div onClick={(e)=>setActive(4)} className='allpages'><p>Events</p></div>
            <div onClick={(e)=>setActive(5)} className='allpages'><p>FAQ</p></div>
            <div className='allpages'><Link to="/login"><CgProfile/></Link></div>
            <div className='allpages'><Link to="/sign-up"><img  className="loginimg" src={shop}/></Link></div>
            <div className='allpages'><Link to="/userprofile"><img className="loginimg"  src={shop}/></Link></div>
        </div>
        {
            active===1&&<HomeMain/>
        }
        {
            active===2&&<BestSelling/>
        }
        {
            active===3&&<Products/>
        }
        {
            active===4&&<Events/>
        }
        {
            active===5&&<Faqs/>
        }
        <Footer/>
    </Fragment>
}
export default Home;