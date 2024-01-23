import React, {useState} from "react";

function EditCommentForm({comm, onHandleUpdatingComment, onHandleDelete, setClicked}) {
    const {id, product_id} = comm
    const [comment, setComment] = useState(comm.comment)
    console.log(comm)

    function handleSubmit(e) {
        e.preventDefault() 
        onHandleUpdatingComment(comment, id)
        setClicked(false)
    }
    return(
        <div>
            <div>
                <button onClick={() => setClicked(false)}>Minimize</button>
                <button onClick={() => onHandleDelete(id, product_id)}>Delete Comment</button>
            </div>
            <div>
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
        </div>
    )
}


export default EditCommentForm;