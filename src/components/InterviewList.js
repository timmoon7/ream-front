import React, { Component } from 'react';
import api from '../api/interviewAPI'
import ReactTable from 'react-table'
import { Link } from 'react-router-dom'
import './ReactTables.css'

class InterviewList extends Component {

    state = {
        interviews: null
    }

    async componentDidMount() {
        const interviews = await api.getInterviews()
        
        interviews.map(interview => {
            const modify_date = new Date(interview.date_time);
            const interview_date = modify_date.getDate()+'-'+(modify_date.getMonth()+1)+'-'+modify_date.getFullYear();
            interview.date_time = interview_date
            return interview
        })
        this.setState({interviews})
    }

    deleteInterview = (id) => {
        api.deleteInterview(id)
        .then(() => {
           this.setState((prevState) => {
             const interviews = prevState.interviews.filter(interview => interview._id !== id)               
             return {interviews}
           })
        })
        .catch((err) => console.error(err))
    }

    render() {
        const {interviews} = this.state

        if(!interviews) {
            return <div> Loading...</div>
        }
    
        function Expand({_id, intake, year, interviewee, test_score, student_id, 
            scores, outcome, outcome_comment, duration, comment, jr_updated, 
            hubspot_updated, enrolment_confirmed}) {

            function avg(scores, category) {
                if (!scores) {
                    return 0;
                }

                const sumPerCategory = [0, 0]
                for (let elm of scores) {
                    if (elm.category === category) {
                        sumPerCategory[0] += parseInt(elm.score, 10);
                        sumPerCategory[1] += 1
                    }
    
                }
                return sumPerCategory[0] / sumPerCategory[1];
            }

            return (
                <div className="expandsection">
                    <p className="name">Intake: <span className="value"> {intake}</span></p> 
                    <p className="name">Year: <span className="value"> {year}</span></p>
                    <p className="name">Email: <span className="value"> {interviewee.email}</span></p>
                    <p className="name">Phone: <span className="value"> {interviewee.phone}</span></p>
                    <p className="name">Technical Skills Average: <span className="value"> {avg(scores, "Technical Skills")}</span></p>
                    <p className="name">Soft Skills Average: <span className="value"> {avg(scores, "Soft Skills")}</span></p>
                    <p className="name">Total / 10: <span className="value"> {avg(scores, "Technical Skills") + avg(scores, "Soft Skills")}</span></p>
                    <p className="name">Interview Comments: <span className="value"> {comment}</span></p>
                    <p className="name">Interview Duration: <span className="value"> {duration} minutes</span></p>
                    <p className="name">Admission Test Result: <span className="value"> {test_score}</span></p>
                    <p className="name">JR Updated: <span className="value"> {jr_updated ? "Yes" : "No"}</span></p>
                    <p className="name">Hubspot Updated: <span className="value"> {hubspot_updated ? "Yes" : "No"}</span></p>
                    <p className="name">Enrolment Confirmed: <span className="value"> {enrolment_confirmed ? "Yes" : "No"}</span></p>
                    <p className="name">Outcome: <span className="value"> {outcome}</span></p>
                    <p className="name">Outcome Comment: <span className="value"> {outcome_comment}</span></p>
                    <p className="name">Student ID: <span className="value"> {student_id}</span></p>
                    <button>
                        <Link to={{pathname: `/interviews/${_id}/edit`}}>Start / Edit Interview</Link>
                    </button>
                </div>  
            )
        }
      
        return (
            <div>
                <h1>Current Interviews</h1>
                <ReactTable
                    data={interviews}
                    className="-striped -highlight"
                    columns={[
                        {
                            Header: "Date",
                            accessor: "date_time"
                        },
                        {
                            Header: "First Name",
                            accessor:"interviewee.first_name"      
                        },
                        {
                            Header: "Last Name",
                            accessor:"interviewee.last_name"
                        },
                        {
                            Header: "Campus",
                            accessor: "campus"
                        },
                        {
                            Header: "Interviewer",
                            accessor: "interviewer"
                        },
                        {
                            Header: "Outcome",
                            accessor: "outcome"
                        },
                        {
                            Header: "Student_ID",
                            accessor: "student_id"
                        }
                    ]}
                    
                    sorted={[{
                        id: 'date_time',
                        desc: true
                      }]}

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

export default InterviewList