import React, {useState, useContext} from "react";

function LoginForm({onHandleLoginFetch}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    function handleLoginSubmit(e) {
        e.preventDefault()
        const loginObj = {
            username,
            password
        }
        onHandleLoginFetch(loginObj)
    }

    return (
        <div className='SignupForm'>
            <h1>Login</h1>
            <form onSubmit={e => handleLoginSubmit(e)}>
                <label> Username:
                    <input 
                    type='text'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    ></input>
                </label>
                <label> Password:
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