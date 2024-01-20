import React from "react";


function Product({prod}) {
    console.log(prod)
    const {description, minimum_price, image} = prod
    return (
        <div>
            <img></img>
            <h2>{description}</h2>
            <p>{minimum_price}</p>
        </div>
    )
}

export default Product;