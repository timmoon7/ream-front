import React from 'react'


export default function InterviewForm(props) {

    const today = new Date();
    const this_year = today.getFullYear()
    const next_year = today.getFullYear() + 1
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    return <form onSubmit={
        (e) => {
            e.preventDefault()
            const payload = {
                year: e.target.year.value,
                intake: e.target.intake.value,
                campus: e.target.campus.value,
                date_time: e.target.date_time.value,
                interviewee: {
                    email: e.target.email.value,
                    phone: e.target.email.value,
                    first_name: e.target.first_name.value,
                    last_name: e.target.last_name.value
                }
            }
            e.target.reset()
            props.handleSubmit(payload)
        }
    }>
    
    <p>
        <label htmlFor="year">Year: </label>
        <select name="year" id="year">
            <option value={this_year}>{this_year}</option>
            <option value={next_year}>{next_year}</option>
        </select>
    </p>

    
    <p>
        <label htmlFor="intake">Intake: </label>
        <select name="intake" id="intake">
            <option value="1">1</option>
            <option value="2">2</option>
        </select>
    </p>

    <p>
        <label htmlFor="campus">Campus: </label>
        <select name="campus" id="campus">
            <option value="Melbourne">Melbourne</option>
            <option value="Sydney">Sydney</option>
            <option value="Brisbane">Brisbane</option>
        </select>
    </p>
    <p>
        <label htmlFor="date_time">Interview Date: </label>
        <input type="text" name="date_time" defaultValue={date}  /> 
    </p>

    <p>
        <label htmlFor="email">Email: </label>
        <input type="text" name="email" defaultValue={props.email} />
    </p>

    <p>
        <label htmlFor="phone">Phone: </label>
        <input type="text" name="phone" defaultValue={props.phone} />
    </p>

    <p>
        <label htmlFor="first_name">First_name: </label>
        <input type="text" name="first_name" defaultValue={props.first_name} />
    </p>

    <p>
        <label htmlFor="last_name">Last_name: </label>
        <input type="text" name="last_name" defaultValue={props.last_name} />
    </p>


    <input type="submit" value="Add Candidate"/>
    <hr />
    </form>
}