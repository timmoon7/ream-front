import React, { Component } from 'react';
import api from '../../api/questionAPI'
import {withRouter} from 'react-router-dom';

class QuestionUpdateForm extends Component {
    
    state = {
        question: null,
    }

    async componentDidMount() {
        const question = await api.getQuestion(this.props.questionId)
        this.setState({question})
    }

    updateQuestion(payload) {
        const questionId = this.state.question._id
        api.updateQuestion(questionId, payload)
        .then((question) => {
            this.props.history.push('/questions')
        })
        .catch((err) => console.error(err))
    }

    deleteQuestion(id) {
        api.deleteQuestion(id)
        .then(() => {
            this.props.history.push('/questions')
        })
        .catch((err) => console.error(err))
    }
   
    onSubmit = (e) => {
        e.preventDefault()

        const input = e.target
        const newCriteria = []
        newCriteria.push({item: input.item1.value, value: "1"})
        newCriteria.push({item: input.item2.value, value: "2"})
        newCriteria.push({item: input.item3.value, value: "3"})
        newCriteria.push({item: input.item4.value, value: "4"})
        newCriteria.push({item: input.item5.value, value: "5"})

        const payload = {
            category: e.target.category.value,
            title: e.target.title.value,
            description: e.target.description.value,
            criteria: newCriteria,
            priority: e.target.priority.value
        }

        e.target.reset()
        this.updateQuestion(payload)
    }

    render() {
        const {question} = this.state
        if (!question) return null;
        const {_id, category, title, description, criteria, priority} = question;
        
        return (
            <div>                
                <button onClick={() => {
                    this.deleteQuestion(_id)}}>Delete This Question
                </button>
                <div className="update"> 
                    <h3>Current Questions</h3>
                    <form onSubmit={this.onSubmit}>
                        <p>
                            <label htmlFor="category">Category: </label>
                            <select name="category" id="category" defaultValue={category}>
                                <option value="Technical Skills">Technical Skills</option>
                                <option value="Soft Skills">Soft Skills</option>
                            </select>
                        </p>

                        <p>
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" defaultValue={title} required="required" /> 
                        </p>

                        <p>
                            <label htmlFor="description">Description</label>
                            <input type="text" name="description" defaultValue={description} size="70" /> 
                        </p>

                        <p>
                            <label htmlFor="priority">Priority</label>
                            <input type="number" name="priority" defaultValue={priority} required="required" /> 
                        </p>

                        <p>
                            <label htmlFor="item1">Point 1: </label>
                            <input type="text" name="item1" defaultValue={criteria[0].item} size="50" required="required" />
                        </p>

                        <p>
                            <label htmlFor="item2">Point 2: </label>
                            <input type="text" name="item2" defaultValue={criteria[1].item} size="50" required="required" />
                        </p>

                        <p>
                            <label htmlFor="item3">Point 3: </label>
                            <input type="text" name="item3" defaultValue={criteria[2].item} size="50" required="required" />
                        </p>

                        <p>
                            <label htmlFor="item4">Point 4: </label>
                            <input type="text" name="item4" defaultValue={criteria[3].item} size="50" required="required" />
                        </p>

                        <p>
                            <label htmlFor="item5">Point 5: </label>
                            <input type="text" name="item5" defaultValue={criteria[4].item} size="50" required="required" />
                        </p>

                        <input type="submit" value="Edit Question" />
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(QuestionUpdateForm)