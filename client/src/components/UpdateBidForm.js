import React, {useState} from "react";

function UpdateBidForm({checkingForPreviousBid, onHandleUpdatingBid, setUpdateClicked}) {
    // console.log(checkingForPreviousBid)
    const [bidAmount, setBidAmount] = useState("Enter amount")

    function handelSubmit(e) {
        e.preventDefault()
        const bidObj = {
            product_id: checkingForPreviousBid.product_id,
            bid_amount: bidAmount
        }
        const {id} = checkingForPreviousBid
        onHandleUpdatingBid(id, bidObj)
        setUpdateClicked(false)
        setBidAmount("Enter amount")
    }
    return (
        <div>
            <form onSubmit={e => handelSubmit(e)}>
                <label>
                    <input
                    type='text'
                    value={bidAmount}
                    onChange={e => setBidAmount(e.target.value)}
                    >
                    </input>
                </label>
                <button type="submit">Update</button>
            </form>

        </div>
    )
}

export default UpdateBidForm;