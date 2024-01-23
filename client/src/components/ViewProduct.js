import React, {useContext} from "react";
import {useParams} from  'react-router-dom';
import { ProductsContext } from '../context/ProductsContext'
import Comment from "./Comment";
import CreateCommentForm from "./CreateCommentForm";

function ViewProduct({onHandelCreatingNewComment, onHandleUpdatingComment, onHandleDelete}) {
    const {id} = useParams()
    const {products} = useContext(ProductsContext)

    const findProduct = products.find(prod => prod.id == id)
    if (!findProduct) return <h2>Loading...</h2>
    const {image_url, comments, highest_bid, product_name, description, minimum_price} = findProduct

    const mappingComments = comments.map(comm => <Comment key={comm.id} comm={comm} onHandleUpdatingComment={onHandleUpdatingComment} onHandleDelete={onHandleDelete}/>)
    return(
        <div className="viewProduct">
            <div className="topHalf">
                <h2>{product_name}</h2>
                <img src={image_url} alt="product picture" className="productImage"/>
                <p>{description}</p>
                <p>{minimum_price}</p>
                <div>
                    {(!!highest_bid ? <h3>Current Highest Bid: {highest_bid}</h3> : <h3>place your bid now</h3>)}
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