import React from 'react'
import api from '../../api/interviewAPI'
import { Link } from 'react-router-dom'
import '../Forms.css'

export default function InterviewForm(props) {

    const today = new Date();
    const this_year = today.getFullYear()
    const next_year = today.getFullYear() + 1
    const default_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    const createInterview = (payload) => {
        api.createInterview(payload)
        .then((interview) => {
            return interview
        })
      }

    return  <div className="login"> 
        <form onSubmit={
            (e) => {
                e.preventDefault()
                const payload = {
                    year: e.target.year.value,
                    intake: e.target.intake.value,
                    campus: e.target.campus.value,
                    date_time: e.target.date_time.value,
                    interviewee: {
                        email: e.target.email.value,
                        phone: e.target.phone.value,
                        first_name: e.target.first_name.value,
                        last_name: e.target.last_name.value
                    }
                }
                e.target.reset()
                createInterview(payload)
            }
        }>

        <h1>New Candidate</h1>
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
            <input type="text" name="date_time" defaultValue={default_date} required="required" /> 
        </p>

        <p>
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" required="required" />
        </p>

        <p>
            <label htmlFor="phone">Phone: </label>
            <input type="text" name="phone" />
        </p>

        <p>
            <label htmlFor="first_name">First Name: </label>
            <input type="text" name="first_name" required="required" />
        </p>

        <p>
            <label htmlFor="last_name">Last Name: </label>
            <input type="text" name="last_name" required="required" />
        </p>

        <p>
            <input type="submit" value="Add Candidate"/><br/><br/> 
            <button className="startinterview">
                <Link to={{pathname: `/interviews`}}>Start Interview</Link>
            </button>
        </p>

    </form>

    </div>
}