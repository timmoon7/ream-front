import React, { Component } from 'react';
import api from '../api/questionAPI'
import ReactTable from 'react-table'
import { Link } from 'react-router-dom'
import QuestionForm from './QuestionForm'
import Css from './LoginForm.css'

class QuestionList extends Component {

    state = {
        questions: null
    }

    async componentDidMount() {
        const questions = await api.getQuestions()
        this.setState({questions})
    }

    render() {
        const {questions} = this.state

        if(!questions) {
            return <div> Loading...</div>
        }
        
        function Expand({_id, category, title, description, criteria, priority, comment}) {
            return <div>
                <p>Category: {category}</p>
                <p>Title: {title}</p>
                <p>Description: {description}</p>
                <p>Priority: {priority}</p>
                <div>Criteria:
                    <ul>
                        <li>{criteria[0].value}: {criteria[0].item}</li>
                        <li>{criteria[1].value}: {criteria[1].item}</li>
                        <li>{criteria[2].value}: {criteria[2].item}</li>
                        <li>{criteria[3].value}: {criteria[3].item}</li>
                        <li>{criteria[4].value}: {criteria[4].item}</li>
                    </ul>
                </div>
                <Link to={{pathname: `/questions/${_id}/edit`}}>Edit</Link>
                </div>     
        }
        
        return (
            <div>
                <div className="login">
                <h1> Add New Question </h1>
                <QuestionForm />
                </div>
                <h1> Current Questions </h1>
                <ReactTable
                    data={questions}
                    className="-striped -highlight"
                    columns={[
                        {
                            Header: "Category",
                            accessor: "category"
                        },
                        {
                            Header: "Title",
                            accessor:"title"      
                        },
                        {
                            Header: "Priority",
                            accessor:"priority"
                        }
                    ]}
                    SubComponent={row => {
                        return (
                        <div style={{ padding: "20px" }}>
                            <Expand {...row.original} />
                        </div>            
                    )}} 
                />
            </div>
        );
    }
}

export default QuestionList