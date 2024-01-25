import React, {useState} from "react";

function SignupForm({handleUserSignupFetch}) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword]  = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    function handleSignupSubmit(e) {
        e.preventDefault()
        const newUserObj = {
            username,
            email,
            password,
            password_confirmation: passwordConfirmation
        }

        handleUserSignupFetch(newUserObj)
    }

    return (
        <div className='SignupForm'>
            <h1>Signup</h1>
            <form onSubmit={e => handleSignupSubmit(e)}>
                <label> Username:
                    <input
                    type='text'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    >
                    </input>
                </label>
                <label> Password:
                    <input
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    >
                    </input>
                </label>
                <label> Password Confirmation:
                    <input
                    type='password'
                    value={passwordConfirmation}
                    onChange={e => setPasswordConfirmation(e.target.value)}
                    >
                    </input>
                </label>
                <label> Email:
                    <input
                    type='text'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    >
                    </input>
                </label>
                <input type='submit'></input>
                
            </form>
        </div>
    )
}

export default SignupForm;