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
        // console.log(newUserObj)

        handleUserSignupFetch(newUserObj)
    }

    return (
        <div>
            <h1>SignupForm</h1>
            <form onSubmit={e => handleSignupSubmit(e)}>
                <lable> Username:
                    <input
                    type='text'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    >
                    </input>
                </lable>
                <lable> Password:
                    <input
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    >
                    </input>
                </lable>
                <lable> Password Confirmation:
                    <input
                    type='password'
                    value={passwordConfirmation}
                    onChange={e => setPasswordConfirmation(e.target.value)}
                    >
                    </input>
                </lable>
                <lable> Email:
                    <input
                    type='text'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    >
                    </input>
                </lable>
                <input type='submit'></input>
                
            </form>
        </div>
    )
}

export default SignupForm;