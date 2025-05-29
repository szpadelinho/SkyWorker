import React, { useEffect, useState } from "react"
import "../styles/App.css"
import axios from "axios"

interface User {
    _id: string
    name: string
    surname: string
    email: string
    team: { _id: string; name: string }
    role: "Admin" | "User"
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("jwtToken")
                const response = await axios.get("http://localhost:5000/api/users", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setUsers(response.data)
            } catch (error) {
                console.error("Error fetching users:", error)
            }
        }

        fetchUsers()
    }, [])

    return (
        <div className="Page-container">
            <div className="Page-panel">
                <h1>Users</h1>
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>
                            <h6>{user.name} {user.surname}</h6>
                            <h5>Team: {user.team?.name || "Jobless"}</h5>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default UsersPage
