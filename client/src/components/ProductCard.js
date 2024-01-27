import React, { useContext } from "react";
import { NavLink } from "react-router-dom";


function ProductCard({prod, userId}) {
 
    const {image_url, product_name, id, current_highest_bid, user_id} = prod

// console.log(userId)
// console.log(user_id)
// console.log(prod)
// console.log(userId !== user_id)

    return (
        <div className="productCard">
            <h2>{product_name}</h2>
            <img src={image_url} alt={product_name} className="productImage"/>
            <div>{userId !== user_id ? (current_highest_bid.bid_accepted === false ? <h4>Current Highest Bid: ${current_highest_bid.bid_amount}</h4> : <h4>You Can No Longer Bid On This Item</h4>): <h4>You are not able to bid on your own products</h4>}</div>
            <br />
            <NavLink to={`/product/${id}`}>View Details</NavLink>
        </div>
    )
}

{/* condition1 ?(condition2 ? Expression1 : Expression2) : Expression3; */}

export default ProductCard;