import React from 'react'
import { Link } from 'react-router-dom'

export default function Interview({user, handleDelete}) {
    const { _id, email, campus, first_name, last_name, role} = user;
   
    return <li>
        <p>Name: {first_name + last_name}</p>
        <p>Email: {email}</p>
        <p>Campus: {campus}</p>
        <p>Role {role}</p>

        <br />
        <button onClick={() => {
            handleDelete(_id)
        }}>Delete</button>
        <button>
         <Link to={{pathname: `/users/${_id}/edit`}}>Edit</Link>
        </button>
    </li>
}