import React from 'react';

const SingleProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={product.thumbnail} alt={product.title} />
            </div>
            <div className="product-details">
                <div className='desc-container'>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                </div>
                <div className="product-footer">
                    <span>Price: ${product.price}</span>
                    <span>Rating: {product.rating}</span>
                    <span>Stock: {product.stock}</span>
                </div>
            </div>
        </div>
    );
};

export default SingleProductCard;
