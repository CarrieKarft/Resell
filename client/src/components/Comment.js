import React from "react";

function Comment({comm}) {
    console.log(comm)
    const {comment, product_id, comment_username} = comm
    return (
        <div>
            <h4>{comment_username}:</h4>
            <p>{comment}</p>
        </div>
    )
}

export default Comment;