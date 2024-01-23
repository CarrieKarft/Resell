import React, {useState} from "react";

function CreateCommentForm({product_id, onHandelCreatingNewComment}) {
    const [comment, setComment] = useState('')
    function handleSubmit(e) {
        e.preventDefault()
        const newCommentObj = {
            comment,
            product_id
        }
        onHandelCreatingNewComment(newCommentObj)
        setComment('')
    }
    return (
        <div>
            <h3><em>Leave A Comment</em></h3>
            <form onSubmit={e => handleSubmit(e)}>
                <label>
                    <textarea
                    type='text'
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    >
                    </textarea>
                </label>
                <br />
                <input type='submit'></input>
            </form>

        </div>
    )
}

export default CreateCommentForm;