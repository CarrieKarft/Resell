import React, {useContext} from "react";
import {useParams} from  'react-router-dom';
import { ProductsContext } from '../context/ProductsContext'
import { CurrentUserContext } from "../context/CurrentUserContext";
import Comment from "./Comment";
import CreateCommentForm from "./CreateCommentForm";
import Bid from "./Bid";

function ViewProduct({onHandelCreatingNewComment, onHandleUpdatingComment, onHandleDelete, onHandleUpdatingBid, onHandleCreateBid}) {
    const {id} = useParams()
    const {products} = useContext(ProductsContext)
    const {currentUser} = useContext(CurrentUserContext)
    // console.log(currentUser.bids)

    const findProduct = products.find(prod => prod.id == id)
    if (!findProduct) return <h2>Loading...</h2>
    const {image_url, comments, highest_bid, product_name, description, minimum_price} = findProduct

    const checkingForPreviousBid = currentUser.bids.find(bid => bid.product_id === findProduct.id)
    // console.log(checkingForPreviousBid)

    const mappingComments = comments.map(comm => <Comment key={comm.id} comm={comm} onHandleUpdatingComment={onHandleUpdatingComment} onHandleDelete={onHandleDelete}/>)
    return(
        <div className="viewProduct">
            <div className="topHalf">
                <h2>{product_name}</h2>
                <img src={image_url} alt="product picture" className="productImage"/>
                <p>{description}</p>
                <p>{minimum_price}</p>
                <div>
                <Bid checkingForPreviousBid={checkingForPreviousBid} highest_bid={highest_bid} onHandleUpdatingBid={onHandleUpdatingBid} product_id={id} onHandleCreateBid={onHandleCreateBid}/>
                </div>
                {/* <div className="productBidDiv">
                    {(!!highest_bid ? <h3>Current Highest Bid: {highest_bid}</h3> : null)}
                    {(checkingForPreviousBid ? <button onClick={() => handleBidUpdate()}>Update Your Bid</button> : <button>Place A Bid</button>)}
                </div> */}
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