import React from 'react'
import { Link } from 'react-router-dom'

import './MainMenu.css'

export default function MainMenu({logout}) {
    return <div className="main-menu">
         
        <Link className="btn btn-default" to="/interview/create">New Candidate</Link>
        <Link className="btn btn-default" to="/interviews">View all candidates</Link>
        <Link className="btn btn-default" to="/users">Register/View System Users</Link>

        <button className="btn btn-primary" onClick={logout}>Logout</button>

    </div>
}