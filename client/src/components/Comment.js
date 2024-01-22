import React from "react";

function Comment({comm}) {
    console.log(comm)
    const {comment, product_id} = comm
    return (
        <div>
            <p>{comment}</p>
        </div>
    )
}

export default Comment;