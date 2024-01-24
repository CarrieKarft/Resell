import React from "react";
import {NavLink} from "react-router-dom"

function NavBar({username}) {
    return(
        <div className="nav">
            <h1>RESELL</h1>
        <div className="navBar">
            <NavLink to='/profile'>{username}'s profile</NavLink> 
            <NavLink to='/bids'>View Your bids</NavLink>
            <NavLink to='/products-page'>View Products</NavLink>
            <NavLink to='/product/new'>Upload A New Product</NavLink>
        </div>
        </div>
    )
}

export default NavBar