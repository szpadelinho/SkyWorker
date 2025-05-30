import React from "react";
import '../styles/App.css'

const HomePage : React.FC = () => {
    return(
        <div className={"Page-container"}>
            <div className={"Page-panel"}>
                <img src="../../public/osaka.gif" alt="osaka" style={{height:'90%',width:'90%', borderRadius: '5%'}}/>
            </div>
        </div>
    )
}

export default HomePage