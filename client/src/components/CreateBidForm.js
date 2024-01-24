import React, {useState} from "react";

function CreateBidForm({product_id, onHandleCreateBid, setCreateClicked}) {
    console.log(product_id)
    const [bidAmount, setBidAmount] = useState("Enter bid")

    function handleSubmit(e) {
        e.preventDefault()
        const bidObj = {
            bid_amount: bidAmount,
            product_id
        }
        onHandleCreateBid(bidObj)
        setCreateClicked(false)
    }
    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <label>
                    <input
                    type='text'
                    value={bidAmount}
                    onChange={e => setBidAmount(e.target.value)}
                    >
                    </input>
                </label>
                <button type="submit">Create</button>
            </form>

        </div>
    )
}

export default CreateBidForm;