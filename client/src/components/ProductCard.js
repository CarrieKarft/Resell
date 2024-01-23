import React from "react";
import { NavLink } from "react-router-dom";
import Bid from "./Bid";
import Comment from "./Comment";
import CreateCommentForm from "./CreateCommentForm";


function ProductCard({prod}) {
    console.log(prod)
    const {image_url, product_name, id} = prod

    return (
        <div className="productCard">
            <h2>{product_name}</h2>
            <img src={image_url} alt="product picture" className="productImage"/>
            <br />
            <NavLink to={`/product/${id}`}>View Details</NavLink>
        </div>
    )
}

export default ProductCard;