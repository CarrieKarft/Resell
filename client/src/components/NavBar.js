import React from "react";
import {NavLink} from "react-router-dom"

function NavBar({username}) {
    return(
        <div className="navBar">
            <NavLink to='/profile'>{username}'s profile</NavLink> 
            <NavLink to='/profile'>View Your bids</NavLink>
            <NavLink to='/products-page'>View Products</NavLink>
            <NavLink to='/product/new'>Upload A New Product</NavLink>
        </div>
    )
}

export default NavBar