import React from 'react'
import api from '../../api/questionAPI'


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
            
            // priority will be used to sort quetions when do an interview
            let priority = 6;
            if (e.target.category.value === "Soft Skills") {
                priority = "26"
            } 

            const payload = {
                category: e.target.category.value,
                title: e.target.title.value,
                description: e.target.description.value,
                criteria: [
                    { item: e.target.item1.value, value: e.target.point1.value},
                    { item: e.target.item2.value, value: e.target.point2.value},
                    { item: e.target.item3.value, value: e.target.point3.value},
                    { item: e.target.item4.value, value: e.target.point4.value},
                    { item: e.target.item5.value, value: e.target.point5.value}
                ],
                priority: priority
            }
            e.target.reset()
            createQuestion(payload)
        }
    }>
    
    <p>
        <label htmlFor="category">Category: </label>
        <select name="category" id="category">
            <option value="Technical Skills">Technical Skills</option>
            <option value="Soft Skills">Soft Skills</option>
        </select>&nbsp;&nbsp;
        <br/> <br/>
        <label htmlFor="title">Title: </label><br/>
        <input type="text" name="title" required="required" /> 
    </p>

    <p>
        <label htmlFor="description">Description</label>
        <input type="text" name="description" size="100" /> 
    </p>

    <p>
        <label htmlFor="item1">Point 1: </label>
        <input type="text" name="item1" size="50" required="required" />
        <input type="hidden" name="point1" value="1" />
    </p>

    <p>
        <label htmlFor="item2">Point 2: </label>
        <input type="text" name="item2" size="50" required="required" />
        <input type="hidden" name="point2" value="2" />
    </p>

    <p>
        <label htmlFor="item3">Point 3: </label>
        <input type="text" name="item3" size="50" required="required" />
        <input type="hidden" name="point3" value="3" />
    </p>

    <p>
        <label htmlFor="item4">Point 4: </label>
        <input type="text" name="item4" size="50" required="required" />
        <input type="hidden" name="point4" value="4" />
    </p>

    <p>
        <label htmlFor="item5">Point 5: </label>
        <input type="text" name="item5" size="50" required="required" />
        <input type="hidden" name="point5" value="5" />
    </p>

    <input type="submit" value="Add Question" />

    </form>
}