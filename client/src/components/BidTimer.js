import React, {useEffect} from "react";

function BidTimer({ current_highest_bid, findProduct, onHandleUpdatingWinningBid, onHandleUpdatingNonWinner}) {
    console.log(findProduct) 
    // Warning that I keep getting in the console

    // Line 29:6:  React Hook useEffect has missing dependencies: 'current_highest_bid.bid_accepted', 'current_highest_bid.bid_amount', 'current_highest_bid.id', 'findProduct', 'onHandleUpdatingNonWinner', and 'onHandleUpdatingWinningBid'. Either include them or remove the dependency array. If 'onHandleUpdatingWinningBid' changes too often, find the parent component that defines it and wrap that definition in useCallback  react-hooks/exhaustive-deps

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
                  r.json().then((winningBid) => {
                    onHandleUpdatingWinningBid(winningBid)
                    console.log(winningBid)
                })
                } else {
                  r.json().then(errorData => alert(errorData.error))
                }
              })
        } else if(current_highest_bid.bid_amount <= 0.00) {
            onHandleUpdatingNonWinner(findProduct)
        }
    }, 120000);

    return () => clearTimeout(timeoutId);
  }, [current_highest_bid])

    return (
        <div>
            {/* {findProduct} */}
        </div>
    )
}

export default BidTimer;