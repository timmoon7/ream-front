import React from 'react'
import {
    Link
} from 'react-router-dom'

import './MainMenu.css'

export default function MainMenu({logout}) {
    return <div className="main-menu">
         
        <Link className="btn btn-default" to="/createInterview">New Candidate</Link>

        <Link className="btn btn-default" to="/getInterviews">View all candidates</Link>

        <Link className="btn btn-default" to="/interview">Register New Interviewer/Admin (Admin Only)</Link>

        <button className="btn btn-primary" onClick={logout}>
        Logout
        </button>

    </div>
}