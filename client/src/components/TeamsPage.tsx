import React, {useEffect, useState} from "react";
import '../styles/App.css'
import axios from 'axios';

interface Team {
    _id: string
    name: string
    members: { _id: string; name: string; surname: string; email: string }[]
}

const TeamsPage : React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const token = localStorage.getItem("token");
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

    return(
        <div className={"Page-container"}>
            <div className={"Page-panel"}>
                <h1>Teams</h1>
                <ul>
                    {teams.map((team) => (
                        <li key={team._id}>
                            <h6>{team.name}</h6>
                            <h5>{team.members.map((member) => `${member.name} ${member.surname}`).join(", ")}</h5>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TeamsPage