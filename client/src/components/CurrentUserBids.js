import React, {useContext} from "react";
import {CurrentUserContext} from '../context/CurrentUserContext'
import ProductCard from "./ProductCard";

function CurrentUserBids() {
    const {currentUser} = useContext(CurrentUserContext);

    const {products} = currentUser

    if (!products) return <h2>Loading...</h2>

    const mappingUserProducts = currentUser.products.map(prod => <ProductCard key={prod.id} prod={prod}/>)

    return(
        <div>
            <h2>Products You've Bid On</h2>
            <div className="productCardContainer">
                {mappingUserProducts}
            </div>
        </div>
    )
}

export default CurrentUserBids;