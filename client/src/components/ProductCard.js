import React from "react";
import Bid from "./Bid";
import Comment from "./Comment";
import CreateCommentForm from "./CreateCommentForm";


function ProductCard({prod}) {
    console.log(prod.bids)
    const {description, minimum_price, image} = prod
    return (
        <div>
            <img></img>
            <h2>{description}</h2>
            <p>{minimum_price}</p>
        </div>
    )
}

export default ProductCard;