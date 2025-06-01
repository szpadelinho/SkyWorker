import React, {useEffect, useState} from "react";
import '../styles/App.css'
import axios from 'axios';
import {Link} from "react-router-dom";

interface Team {
    _id: string
    name: string
    members: { _id: string; name: string; surname: string; email: string }[]
}

const TeamsPage : React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [userRole, setUserRole] = useState<string | null>(null)

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const token = localStorage.getItem("jwtToken");
                setUserRole(localStorage.getItem("role"))
                const response = await axios.get("http://localhost:5000/api/teams", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTeams(response.data);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };

        fetchTeams();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const token = localStorage.getItem("jwtToken")
            await axios.delete(`http://localhost:5000/api/teams/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setTeams(prev => prev.filter(team => team._id !== id))
        } catch (error) {
            console.error("Error deleting team:", error)
        }
    }

    return(
        <div className={"Page-container"}>
            <div className={"Page-panel"}>
                <div className="Page-header">
                    <h1>Teams</h1>
                    <Link to={"/teams/new"}>
                        <button className={"add-button"}>Add new</button>
                    </Link>
                </div>
                <ul>
                    {teams.map((team) => (
                        <li key={team._id}>
                            <h6>{team.name}</h6>
                            <h5>{team.members.map((member) => `${member.name} ${member.surname}`).join(", ")}</h5>
                            {userRole === "admin" && (
                                <button onClick={() => handleDelete(team._id)}>Delete</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TeamsPage