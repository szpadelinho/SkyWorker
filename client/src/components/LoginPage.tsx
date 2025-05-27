import React, { useState } from "react"
import '../styles/App.css'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            })

            const { token, user } = response.data
            
            localStorage.setItem('jwtToken', token)
            localStorage.setItem('user', JSON.stringify(user))
            
            navigate('/dashboard')
        } catch (err: any) {
            console.error('Logging error', err.response?.data || err.message)
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message)
            } else {
                setError('Error while logging in')
            }
        }
    }

    return (
        <div className={"Auth-container"}>
            <h1>SkyWorker</h1>
            <form onSubmit={handleSubmit}>
                <input
                    id={"loginPage-email"}
                    type={"email"}
                    placeholder={"Email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    id={"loginPage-password"}
                    type={"password"}
                    placeholder={"Password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button id={"loginPage-submit"} type={"submit"}>Login</button>
            </form>
            {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
            <p>No account? No problem! Register <Link to={"/register"}>here</Link></p>
        </div>
    )
}

export default LoginPage