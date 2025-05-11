import React from "react";
import {Link} from "react-router-dom";
import '../styles/App.css'

const NavBar : React.FC = () => {
    return(
        <nav className={"NavBar-container"}>
            <nav className={"NavBar-panel"}>
                <h1>SkyWorker</h1>
                <Link to='/dashboard'>My dashboard</Link>
                <Link to='/teams'>Teams</Link>
                <Link to='/projects'>Projects</Link>
                <Link to='/users'>Users</Link>
                <Link to='/tasks'>Tasks</Link>
                <Link to='/comments'>Comments</Link>
                <Link style={{margin: "50px"}} to='/login'>Log me out</Link>
                <p><Link to={"https://github.com/szpadelinho"}>by szpadelinho</Link></p>
            </nav>
        </nav>
    )
}

export default NavBar;