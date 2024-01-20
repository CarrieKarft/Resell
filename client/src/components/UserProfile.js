import React from "react";

function UserProfile({onHandleLogout}) {
    return (
        <div>
            <h1>User Profile</h1>
            <button onClick={() => onHandleLogout()}>Logout</button>

        </div>
    )
}

export default UserProfile;