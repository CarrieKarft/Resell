import React from "react";
import { NavLink } from "react-router-dom";


function ProductCard({prod}) {
    const {image_url, product_name, id, current_highest_bid} = prod

    return (
        <div className="productCard">
            <h2>{product_name}</h2>
            <img src={image_url} alt={product_name} className="productImage"/>
            <div>{current_highest_bid.bid_accepted === false ? <h4>Current Highest Bid: ${current_highest_bid.bid_amount}</h4> : <h4>You Can No Longer Bid On This Item</h4>}</div>
            <br />
            <NavLink to={`/product/${id}`}>View Details</NavLink>
        </div>
    )
}

export default ProductCard;