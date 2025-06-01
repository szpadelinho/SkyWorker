    import React, { useEffect, useState } from "react"
    import "../styles/App.css"
    import axios from "axios"
    import {Link} from "react-router-dom";

    interface Comment {
        _id: string
        text: string
        task: { _id: string; name: string }
        author: { _id: string; name: string; surname: string }
    }

    const CommentsPage: React.FC = () => {
        const [comments, setComments] = useState<Comment[]>([])
        const [userRole, setUserRole] = useState<string | null>(null)

        useEffect(() => {
            const fetchComments = async () => {
                try {
                    const token = localStorage.getItem("jwtToken")
                    setUserRole(localStorage.getItem("role"))

                    const response = await axios.get("http://localhost:5000/api/comments", {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    setComments(response.data)
                } catch (error) {
                    console.error("Error fetching comments:", error)
                }
            }

            fetchComments()
        }, [])

        const handleDelete = async (id: string) => {
            try {
                const token = localStorage.getItem("jwtToken")
                await axios.delete(`http://localhost:5000/api/comments/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setComments(prev => prev.filter(comment => comment._id !== id))
            } catch (error) {
                console.error("Error deleting comment:", error)
            }
        }

        return (
            <div className="Page-container">
                <div className="Page-panel">
                    <div className="Page-header">
                        <h1>Comments</h1>
                        <Link to={"/comments/new"}>
                            <button className={"add-button"}>Add new</button>
                        </Link>
                    </div>
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment._id}>
                                <h6>{comment.text}</h6>
                                <h5>{comment.author?.name} {comment.author?.surname}</h5>
                                <h5>Task: {comment.task?.name}</h5>
                                {userRole === "admin" && (
                                    <button onClick={() => handleDelete(comment._id)}>Delete</button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    export default CommentsPage
