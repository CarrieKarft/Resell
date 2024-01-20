import React, {useContext} from "react";
import {ProductsContext} from '../context/ProductsContext'
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";


function ProductsPage({}){
    const {products} = useContext(ProductsContext);
    console.log(products)

    const mappingProducts = products.map(prod => <ProductCard key={prod.id} prod={prod}/>)
    return (
        <div>
            <h1>Products Page</h1>
            {mappingProducts}
        </div>
    )
}

export default ProductsPage;
