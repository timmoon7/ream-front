import React from 'react'
import { Link } from 'react-router-dom'

import './MainMenu.css'

export default function MainMenu({logout}) {
    return <div className="main-menu">
         
        <Link className="btn btn-default" to="/interview/create">New Candidate</Link>
        <Link className="btn btn-default" to="/interviews">Manage Candidates / Interviews</Link>
        <Link className="btn btn-default" to="/users">Manage System Users</Link>
        <Link className="btn btn-default" to="/questions">Manage Questions</Link>

        <button className="btn btn-primary" onClick={logout}>Logout</button>

    </div>
}