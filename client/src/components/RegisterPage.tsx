import React from "react";
import '../styles/App.css'
import {Link} from "react-router-dom";

const RegisterPage : React.FC = () => {
    return(
        <div className={"Auth-container"}>
            <h1>SkyWorker</h1>
            <input id={"registerPage-name"} type={"text"} placeholder={"Name"}/>
            <input type={"registerPage-surname"} placeholder={"Surname"}/>
            <input id={"registerPage-email"} type={"text"} placeholder={"Email"}/>
            <input type={"registerPage-password"} placeholder={"Password"}/>
            <button id={"registerPage-submit"} type={"submit"}>Create</button>
            <p>Already have an account? Go <Link to={"/login"}>here</Link></p>
        </div>
    )
}

export default RegisterPage