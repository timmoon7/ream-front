import React, { Component } from 'react';
import api from '../api/questionAPI'
import ReactTable from 'react-table'
import { Link } from 'react-router-dom'
import QuestionForm from './QuestionForm'
import './LoginForm.css'
import './ReactTables.css'

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
            return <div className="expandsection">
                <p class="qtitle">Category: <span class="qvalue"> {category}</span></p>
                <p class="qtitle">Title: <span class="qvalue"> {title}</span></p>
                <p class="qtitle">Description: <span class="qvalue"> {description}</span></p>
                <p class="qtitle">Priority: <span class="qvalue"> {priority}</span></p>
                <div><p class="qtitle">Criteria:</p>
                    <ul>
                        <li class="qtitle">{criteria[0].value}: <span class="qvalue">{criteria[0].item}</span></li>
                        <li class="qtitle">{criteria[1].value}: <span class="qvalue">{criteria[1].item}</span></li>
                        <li class="qtitle">{criteria[2].value}: <span class="qvalue">{criteria[2].item}</span></li>
                        <li class="qtitle">{criteria[3].value}: <span class="qvalue">{criteria[3].item}</span></li>
                        <li class="qtitle">{criteria[4].value}: <span class="qvalue">{criteria[4].item}</span></li>
                    </ul>
                </div>
                <button>
                <Link to={{pathname: `/questions/${_id}/edit`}}>Edit</Link>
                </button>
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