import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function SignupPage({onHandleLoginFetch, handleUserSignupFetch}) {
    return(
        <div>
            <h1>SignupPage</h1>
            <LoginForm onHandleLoginFetch={onHandleLoginFetch}/>
            <SignupForm handleUserSignupFetch={handleUserSignupFetch}/>
        </div>
    )
}

export default SignupPage