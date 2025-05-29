    import React, { useEffect, useState } from "react"
    import "../styles/App.css"
    import axios from "axios"

    interface Comment {
        _id: string
        text: string
        task: { _id: string; name: string }
        author: { _id: string; name: string; surname: string }
    }

    const CommentsPage: React.FC = () => {
        const [comments, setComments] = useState<Comment[]>([])

        useEffect(() => {
            const fetchComments = async () => {
                try {
                    const token = localStorage.getItem("jwtToken")
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

        return (
            <div className="Page-container">
                <div className="Page-panel">
                    <h1>Comments</h1>
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment._id}>
                                <h6>{comment.text}</h6>
                                <h5>{comment.author?.name} {comment.author?.surname}</h5>
                                <h5>Task: {comment.task?.name}</h5>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    export default CommentsPage
