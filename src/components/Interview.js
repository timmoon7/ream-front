import React from 'react'

export default function Interview(props) {

    const modify_date = new Date(props.date_time);
    const interview_date = modify_date.getFullYear()+'-'+(modify_date.getMonth()+1)+'-'+modify_date.getDate();

    return <li>
        <p>Year: {props.year}  Intake: {props.intake}</p>
        <p>Date: {interview_date}</p>
        {/* <p>Date: {props.date_time.substr(0,10)}</p> */}
        <p>{props.interviewee.email}  {props.interviewee.phone}</p>
        <p>{props.interviewee.first_name}  {props.interviewee.last_name}</p>

        <br />
        <button onClick={() => {
            props.handleDelete(props._id)
        }}>DELETE</button>
    </li>
}