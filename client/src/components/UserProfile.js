import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from '../context/CurrentUserContext'
import ProductCard from "./ProductCard";

function UserProfile({onHandleLogout}) {
    const {currentUser} = useContext(CurrentUserContext)
    const {products, username} = currentUser
    if (!currentUser.bids) return <h2>Loading...</h2>
    const winningBids = currentUser.bids.filter(bid => bid.bid_accepted === true).map(bid => bid.product_id)
    console.log(winningBids)
    const gettingProducts = products.filter(prod => winningBids.includes(prod.id)).map(prod => {
        return (
            <div key={prod.id}>
                <h3>Congrats! You've won a bid</h3>
                <div className="productCardContainer">
                    <ProductCard prod={prod} key={prod.id}/>
                </div>
            </div>
        )
    
})

    return (
        <div className="profile">
            <h1>User Profile</h1>
            <div className="buttons">
                <NavLink to='/user-products'><button>View Products You've Created</button></NavLink>
            <button onClick={() => onHandleLogout()}>Logout</button>
            </div>
            <h2>Hello, {username}</h2>
            {gettingProducts}
        </div>
    )
}

export default UserProfile;