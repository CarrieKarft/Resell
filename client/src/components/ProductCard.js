import React from "react";
import Bid from "./Bid";
import Comment from "./Comment";
import CreateCommentForm from "./CreateCommentForm";


function ProductCard({prod}) {
    console.log(prod)
    const {description, minimum_price, image_url, bids, highest_bid, comments, product_name} = prod

    const mappingComments = comments.map(comm => <Comment key={comm.id} comm={comm}/>)

    
    return (
        <div>
            <img src={image_url} alt="product picture" className="productImage"/>
            <h2>{product_name}</h2>
            <p>{description}</p>
            <p>{minimum_price}</p>
            <div>
                {(!!highest_bid ? <h3>Current Highest Bid: {highest_bid}</h3> : <h3>place your bid now</h3>)}
            </div>
            <div>
                <h3>comments</h3>
                {mappingComments}
            </div>
        </div>
    )
}

export default ProductCard;