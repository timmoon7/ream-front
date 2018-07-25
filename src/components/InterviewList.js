import React, { Component } from 'react';
import api from '../api/interviewAPI'
import ReactTable from 'react-table'
import { Link } from 'react-router-dom'
import './InterviewList.css'

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
            return <div> No Interview Data...</div>
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
                        sumPerCategory[0] += parseInt(elm.score);
                        sumPerCategory[1] += 1
                    }
    
                }
                return sumPerCategory[0] / sumPerCategory[1];
            }

            return (
                <div className="expandsection">
                    <p class="name">Intake: <span class="value"> {intake}</span></p> 
                    <p class="name">Year: <span class="value"> {year}</span></p>
                    <p class="name">Email: <span class="value"> {interviewee.email}</span></p>
                    <p class="name">Phone: <span class="value"> {interviewee.phone}</span></p>
                    <p class="name">Technical Skills Average: <span class="value"> {avg(scores, "Technical Skills")}</span></p>
                    <p class="name">Soft Skills Average: <span class="value"> {avg(scores, "Soft Skills")}</span></p>
                    <p class="name">Total / 10: <span class="value"> {avg(scores, "Technical Skills") + avg(scores, "Soft Skills")}</span></p>
                    <p class="name">Interview Comments: <span class="value"> {comment}</span></p>
                    <p class="name">Interview Duration: <span class="value"> {duration} minutes</span></p>
                    <p class="name">Admission Test Result: <span class="value"> {test_score}</span></p>
                    <p class="name">JR Updated: <span class="value"> {jr_updated ? "Yes" : "No"}</span></p>
                    <p class="name">Hubspot Updated: <span class="value"> {hubspot_updated ? "Yes" : "No"}</span></p>
                    <p class="name">Enrolment Confirmed: <span class="value"> {enrolment_confirmed ? "Yes" : "No"}</span></p>
                    <p class="name">Outcome: <span class="value"> {outcome}</span></p>
                    <p class="name">Outcome Comment: <span class="value"> {outcome_comment}</span></p>
                    <p class="name">Student ID: <span class="value"> {student_id}</span></p>
                    <button>
                        <Link to={{pathname: `/interviews/${_id}/edit`}}>Start / Edit Interview</Link>
                    </button>
                </div>  
            )
        }
      
        return (
            <div>
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