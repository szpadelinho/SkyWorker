import './styles/App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from "./components/Layout.tsx";
import React from "react";
import LoginPage from "./components/LoginPage.tsx";
import RegisterPage from "./components/RegisterPage.tsx";
import HomePage from "./components/HomePage.tsx";
import TeamsPage from "./components/TeamsPage.tsx";
import ProjectsPage from "./components/ProjectsPage.tsx";
import UsersPage from "./components/UsersPage.tsx";
import TasksPage from "./components/TasksPage.tsx";
import CommentsPage from "./components/CommentsPage.tsx";
import DashboardPage from "./components/DashboardPage.tsx";

const App: React.FC = () => {

  return (
    <Router>
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/" element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="dashboard" element={<DashboardPage/>}/>
                <Route path="teams" element={<TeamsPage/>}/>
                <Route path="projects" element={<ProjectsPage/>}/>
                <Route path="users" element={<UsersPage/>}/>
                <Route path="tasks" element={<TasksPage/>}/>
                <Route path="comments" element={<CommentsPage/>}/>
            </Route>
        </Routes>
    </Router>
  )
}

export default App