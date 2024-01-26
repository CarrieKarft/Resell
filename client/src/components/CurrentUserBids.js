import React, {useContext} from "react";
import {CurrentUserContext} from '../context/CurrentUserContext'
import ProductCard from "./ProductCard";
import { NavLink } from "react-router-dom";

function CurrentUserBids() {
    const {currentUser} = useContext(CurrentUserContext);

    const {products} = currentUser

    if (!products) return <h2>Loading...</h2>

    const mappingUserProducts = currentUser.products.map(prod => <ProductCard key={prod.id} prod={prod}/>)

    console.log(mappingUserProducts)

    return(
        <div className="userProducts">
            {mappingUserProducts.length > 0 ? <h2>Products You've Bid On</h2> : <div><h2>Looks Like You Havent Bid On Any Products</h2><NavLink to='/products-page'><button>View Products</button></NavLink></div>}
            <div className="productCardContainer">
                {mappingUserProducts}
            </div>
        </div>
    )
}

export default CurrentUserBids;