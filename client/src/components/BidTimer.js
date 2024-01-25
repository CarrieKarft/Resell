import React, {useEffect} from "react";

function BidTimer({ current_highest_bid, findProduct, onHandleUpdatingWinningBid, onHandleUpdatingNonWinner}) {
    console.log(findProduct) 

useEffect(() => {
    const timeoutId = setTimeout(() => {
        if(current_highest_bid.bid_amount > 0.00 && current_highest_bid.bid_accepted === false) {
            fetch(`/accept_bid/${current_highest_bid.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({id: current_highest_bid.id})
            })
            .then(r => {
                if(r.ok) {
                  r.json().then((winningBid) => onHandleUpdatingWinningBid(winningBid))
                } else {
                  r.json().then(errorData => alert(errorData.error))
                }
              })
        } else if(current_highest_bid.bid_amount <= 0.00) {
            onHandleUpdatingNonWinner(findProduct)
        }
    }, 120000);

    return () => clearTimeout(timeoutId);
  }, [])

    return (
        <div>
            {/* {findProduct} */}
        </div>
    )
}

export default BidTimer;