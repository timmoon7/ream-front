import React from 'react'
import api from '../api/questionAPI'


export default function QuestionForm(props) {

    const createQuestion = (payload) => {
        api.createQuestion(payload)
        .then((question) => {
            return question
        })
      }

    return <form onSubmit={
        (e) => {
            e.preventDefault()
            const payload = {
                year: e.target.year.value,
                category: e.target.category.value,
                title: e.target.title.value,
                description: e.target.description.value,
                criteria: {
                    item: e.target.item.value,
                    value: e.target.value.value
                }
            }
            e.target.reset()
            createQuestion(payload)
        }
    }>
    
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
        <input type="text" name="date_time" defaultValue={default_date}  /> 
    </p>

    <p>
        <label htmlFor="email">Email: </label>
        <input type="text" name="email" />
    </p>

    <p>
        <label htmlFor="phone">Phone: </label>
        <input type="text" name="phone" />
    </p>

    <p>
        <label htmlFor="first_name">First_name: </label>
        <input type="text" name="first_name" />
    </p>

    <p>
        <label htmlFor="last_name">Last_name: </label>
        <input type="text" name="last_name" />
    </p>


    <input type="submit" value="Add Candidate"/>
    <hr />
    </form>
}