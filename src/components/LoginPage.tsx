import React from "react";
import '../styles/App.css'
import {Link} from "react-router-dom";

const LoginPage : React.FC = () => {
    return (
        <div className={"Auth-container"}>
            <h1>SkyWorker</h1>
            <input id={"loginPage-email"} type={"email"} placeholder={"Email"}/>
            <input type={"loginPage-password"} placeholder={"Password"}/>
            <button id={"registerPage-submit"} type={"submit"}>Login</button>
            <p>No account? No problem! Register <Link to={"/register"}>here</Link></p>
        </div>
    )
}

export default LoginPage