import React from 'react'
import { Link } from 'react-router-dom'

export default function Interview({interview, handleDelete}) {
    const { _id, year, intake, duration, interviewee} = interview;
    const { email, phone, first_name, last_name} = interviewee;
    const modify_date = new Date(interview.date_time);
    const interview_date = modify_date.getFullYear()+'-'+(modify_date.getMonth()+1)+'-'+modify_date.getDate();

    return <li>
        <p>Duration: {duration}</p>
        <p>Year: {year}  Intake: {intake}</p>
        <p>Date: {interview_date}</p>
        {/* <p>Date: {props.date_time.substr(0,10)}</p> */}
        <p>{email}  {phone}</p>
        <p>{first_name}  {last_name}</p>

        <br />
        <button onClick={() => {
            handleDelete(_id)
        }}>DELETE</button>
        <Link to={{pathname: `/interviews/${_id}/edit`}}>Edit</Link>
    </li>
}