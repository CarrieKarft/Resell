import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function SignupPage({onHandleLoginFetch}) {
    return(
        <div>
            <h1>SignupPage</h1>
            <LoginForm onHandleLoginFetch={onHandleLoginFetch}/>
            <SignupForm />
        </div>
    )
}

export default SignupPage