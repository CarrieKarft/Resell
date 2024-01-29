import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import {CurrentUserContext} from '../context/CurrentUserContext';
import {ProductsContext} from '../context/ProductsContext'
import UserProductCard from "./UserProductCard";

function UserProducts({onHandleUpdateProduct, onHandleProductDelete}) {
    const {products} = useContext(ProductsContext);
    const {currentUser} = useContext(CurrentUserContext);

    // const findUserProducts = products.filter(prod => prod.user_id === currentUser.id).map(prod => {
    //     return <UserProductCard key={prod.id} prod={prod} onHandleUpdateProduct={onHandleUpdateProduct} onHandleProductDelete={onHandleProductDelete}/>
    // })
    const findUserProducts = products.map(prod => {
            return <UserProductCard key={prod.id} prod={prod} onHandleUpdateProduct={onHandleUpdateProduct} onHandleProductDelete={onHandleProductDelete}/>
        })

    console.log(findUserProducts)
    return (
        <div className="poductsPage">
            {findUserProducts.length > 0 ? <h2>Products You've Created</h2> : <div><h3>It looks like you haven't created any products yet</h3><NavLink to='/product/new'><button>Create A Product</button></NavLink></div>}
            <div className="productCardContainer">
                {findUserProducts}
            </div>
        </div>
    )
}

export default UserProducts;

