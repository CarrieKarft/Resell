import React, {useState} from "react";
import UpdateBidForm from "./UpdateBidForm";
import CreateBidForm from "./CreateBidForm";

function Bid({current_highest_bid, checkingForPreviousBid, onHandleUpdatingBid, product_id, onHandleCreateBid}) {
    const [updateClicked, setUpdateClicked] = useState(false)
    const [createClicked, setCreateClicked] = useState(false)
    // console.log(checkingForPreviousBid)

    console.log(current_highest_bid)
    const {bid_amount} = current_highest_bid

    return(
        <div>
            <div className="productBidDiv">
                {(bid_amount > 0.00 ? <h3>Current Highest Bid: ${bid_amount}</h3> : null)}
                {(checkingForPreviousBid ? <div className="previousBid"><h4>Your current bid: ${checkingForPreviousBid.bid_amount}</h4><button onClick={() => setUpdateClicked(!updateClicked)}>Update Your Bid</button></div> : <div className='newBid'><button onClick={() => setCreateClicked(!createClicked)}>Place A Bid</button></div>)}
            </div>
            <div style={{display: createClicked ? null : "none"}}>
                <CreateBidForm setCreateClicked={setCreateClicked} product_id={product_id} onHandleCreateBid={onHandleCreateBid}/>
            </div>
            <div style={{display: updateClicked ? null : "none"}}>
                <UpdateBidForm checkingForPreviousBid={checkingForPreviousBid} setUpdateClicked={setUpdateClicked} onHandleUpdatingBid={onHandleUpdatingBid}/>
            </div>
        </div>
    )
}


export default Bid;