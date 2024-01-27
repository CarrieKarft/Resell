import React, {useContext} from "react";
import {ProductsContext} from '../context/ProductsContext'
import { CurrentUserContext } from "../context/CurrentUserContext";
import ProductCard from "./ProductCard";


function ProductsPage(){
    const {products} = useContext(ProductsContext);
    const {currentUser} = useContext(CurrentUserContext)
    const {id} = currentUser

    const mappingProducts = products.map(prod => <ProductCard key={prod.id} prod={prod} userId={id}/>)
    return (
        <div className="poductsPage">
            <h1>Products Page</h1>
            <div className="productCardContainer">
                {mappingProducts}
            </div>
        </div>
    )
}

export default ProductsPage;
