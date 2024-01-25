import React, {useContext} from "react";
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
                <h3>Congrats! You've won some bids</h3>
                <div className="productCardContainer">
                    <ProductCard prod={prod} key={prod.id}/>
                </div>
            </div>
        )
    
})
    // const gettingProductId = winningBids.map(bid)
    // console.log(gettingProducts)
    // console.log(gettingProductId)

    


    return (
        <div>
            <h1>User Profile</h1>
            <button onClick={() => onHandleLogout()}>Logout</button>
            <h2>Hello, {username}</h2>
            {gettingProducts}
        </div>
    )
}

export default UserProfile;