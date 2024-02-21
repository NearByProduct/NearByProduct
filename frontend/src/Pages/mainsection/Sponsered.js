import React from 'react';
import "../styles/sellerPage/Sponsered.css"
import tanishg from "../../images/Tanishq.webp";
import iphone from "../../images/iphone.png";
import boat from "../../images/boat.webp";
import samsung from "../../images/samsung.png";
import handm from "../../images/handm.png"
const Sponsered = () => {
  return (
    <>
    <h1 className='sponseredheading'>Sponsered Brand</h1>
    <div className="image-gallery1">
      <div className="image-gallery2">
        <div><img className='image-gallery2img' src={handm} alt="Brand 1" /></div>
        <div><img className='image-gallery2img' src={samsung} alt="Brand 2" /></div>
        <div><img className='image-gallery2img' src={boat} alt="Brand 3" /></div>
        <div><img className='image-gallery2img' src={iphone} alt="Brand 4" /></div>
        <div><img className='image-gallery2img' src={tanishg} alt="Brand 5" /></div>
      </div>
    </div>
    </>
  );
};

export default Sponsered;
