import React, {useContext} from "react";
import { CurrentUserContext } from '../context/CurrentUserContext'
import ProductCard from "./ProductCard";

function UserProfile({onHandleLogout}) {
    const {currentUser} = useContext(CurrentUserContext)
    const {products, username} = currentUser
    console.log(currentUser)
    console.log(products)

    // const mappingUserBids = products.map((prod) => {
    //     return <ProductCard prod={prod} key={prod.id}/>
    // })
    return (
        <div>
            <h1>User Profile</h1>
            <button onClick={() => onHandleLogout()}>Logout</button>
            <h2>Hello, {username}</h2>
            {/* <div>{mappingUserBids}</div> */}
        </div>
    )
}

export default UserProfile;