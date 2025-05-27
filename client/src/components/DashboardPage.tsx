import React, {useEffect, useState} from "react";
import '../styles/App.css'

interface User {
    name: string
    surname: string
}

const DashboardPage : React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    return(
        <div className={"Page-container"}>
            <div className={"Page-panel"}>
                <h1>
                    {user ? `Welcome, ${user.name} ${user.surname}` : "Hello, Akiyama"}
                </h1>
            </div>
        </div>
    )
}

export default DashboardPage