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
    const [userRole, setUserRole] = useState<string | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("jwtToken")
                setUserRole(localStorage.getItem("role"))

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

    const handleDelete = async (id: string) => {
        try {
            const token = localStorage.getItem("jwtToken")
            await axios.delete(`http://localhost:5000/api/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setUsers(prev => prev.filter(user => user._id !== id))
        } catch (error) {
            console.error("Error deleting user:", error)
        }
    }

    return (
        <div className="Page-container">
            <div className="Page-panel">
                <div className="Page-header">
                    <h1>Users</h1>
                </div>
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>
                            <h6>{user.name} {user.surname}</h6>
                            <h5>Team: {user.team?.name || "Jobless"}</h5>
                            {userRole === "admin" && (
                                <button onClick={() => handleDelete(user._id)}>Delete</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default UsersPage
