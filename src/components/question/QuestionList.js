import React, { Component } from 'react';
import api from '../../api/questionAPI'
import ReactTable from 'react-table'
import { Link } from 'react-router-dom'
import QuestionForm from './QuestionForm'
import '../Forms.css'
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
                <p className="qtitle">Category: <span className="qvalue"> {category}</span></p>
                <p className="qtitle">Title: <span className="qvalue"> {title}</span></p>
                <p className="qtitle">Description: <span className="qvalue"> {description}</span></p>
                <p className="qtitle">Priority: <span className="qvalue"> {priority}</span></p>
                <div><p className="qtitle">Criteria:</p>
                    <ul>
                        <li className="qtitle">{criteria[0].value}: <span className="qvalue">{criteria[0].item}</span></li>
                        <li className="qtitle">{criteria[1].value}: <span className="qvalue">{criteria[1].item}</span></li>
                        <li className="qtitle">{criteria[2].value}: <span className="qvalue">{criteria[2].item}</span></li>
                        <li className="qtitle">{criteria[3].value}: <span className="qvalue">{criteria[3].item}</span></li>
                        <li className="qtitle">{criteria[4].value}: <span className="qvalue">{criteria[4].item}</span></li>
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