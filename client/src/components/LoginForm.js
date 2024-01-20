import React, {useState, useContext} from "react";
import {CurrentUserContext} from '../context/CurrentUserContext'

function LoginForm({onHandleLoginFetch}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {currentUser, setCurrentUser} = useContext(CurrentUserContext)
//  raise this up to app when have more time
    function handleLoginSubmit(e) {
        e.preventDefault()
        const loginObj = {
            username,
            password
        }
        onHandleLoginFetch(loginObj)
        // fetch('/login', {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ username, password }),
        // }).then(r => {
        //   if(r.ok) {
        //       r.json().then(userData => setCurrentUser(userData))
        //   } else {
        //       r.json().then(errorData => alert(errorData.errors))
        //   }
        // })
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={e => handleLoginSubmit(e)}>
                <label> Username
                    <input 
                    type='text'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    ></input>
                </label>
                <label> Password
                    <input 
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    ></input>
                </label>
                <input type='submit'></input>
            </form>
        </div>
    )
}

export default LoginForm;