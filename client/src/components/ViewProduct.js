import React, {useContext} from "react";
import {useParams} from  'react-router-dom';
import { ProductsContext } from '../context/ProductsContext'
import { CurrentUserContext } from "../context/CurrentUserContext";
import Comment from "./Comment";
import CreateCommentForm from "./CreateCommentForm";
import Bid from "./Bid";
import BidTimer from "./BidTimer";

function ViewProduct({onHandelCreatingNewComment, onHandleUpdatingComment, onHandleDelete, onHandleUpdatingBid, onHandleCreateBid, onHandleUpdatingWinningBid, onHandleUpdatingNonWinner}) {
    const {id} = useParams()
    const {products} = useContext(ProductsContext)
    const {currentUser} = useContext(CurrentUserContext)

    const findProduct = products.find(prod => prod.id == id)
    if (!findProduct) return <h2>Loading...</h2>
    if (!currentUser.bids) return <h2>Loading...</h2>
    const {image_url, comments, current_highest_bid, product_name, description, user_id} = findProduct
    const checkingForPreviousBid = currentUser.bids.find(bid => bid.product_id === findProduct.id)

    const mappingComments = comments.map(comm => <Comment key={comm.id} comm={comm} onHandleUpdatingComment={onHandleUpdatingComment} onHandleDelete={onHandleDelete}/>)


    return(
        <div className="viewProduct">
            <div className="topHalf">
                <h2>{product_name}</h2>
                <img src={image_url} alt={product_name} className="productImage"/>
                <p>{description}</p>
                <div>
                    <BidTimer current_highest_bid={current_highest_bid} findProduct={findProduct} onHandleUpdatingWinningBid={onHandleUpdatingWinningBid} onHandleUpdatingNonWinner={onHandleUpdatingNonWinner}/>
                </div>
                <div >
                {user_id !== currentUser.id ? (current_highest_bid.bid_accepted === true ? <h3>You can no longer bid on this item</h3> : <Bid checkingForPreviousBid={checkingForPreviousBid} current_highest_bid={current_highest_bid} onHandleUpdatingBid={onHandleUpdatingBid} product_id={id} onHandleCreateBid={onHandleCreateBid}/>) : <h3>You are not able to bid on your own items</h3>}

    
                </div>
            </div>
            <div className="bottomHalf">
                <div>
                    <CreateCommentForm product_id={id} onHandelCreatingNewComment={onHandelCreatingNewComment} />
                </div>
                <div>
                    {mappingComments}
                </div>
            </div>
        </div>
    )
}

export default ViewProduct