import React, {useState, useContext} from "react";
import EditCommentForm from './EditCommentForm'
import {CurrentUserContext} from '../context/CurrentUserContext'

function Comment({comm, onHandleUpdatingComment, onHandleDelete}) {
    const {currentUser} = useContext(CurrentUserContext)
    const [clicked, setClicked] = useState(false)

    const {comment, comment_username, user_id} = comm

    return (
        <div className="comment">
            <p><b>{comment_username}:</b> {comment}</p>
            <div style={{ display: currentUser.id === user_id ? (clicked ? "none" : null) : "none"}}>
                <button onClick={() => setClicked(true)}>Edit Comment</button>
            </div>
            <div style={{display: clicked ? null : "none"}}>
                <EditCommentForm comm={comm} onHandleUpdatingComment={onHandleUpdatingComment} onHandleDelete={onHandleDelete} setClicked={setClicked}/>
            </div>
        </div>
    )
}

export default Comment;