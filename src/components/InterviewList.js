import React, { Component } from 'react';
import api from '../api/interviewAPI'
import ReactTable from 'react-table'
import { Link } from 'react-router-dom'

class InterviewList extends Component {

    state = {
        interviews: null
    }

    async componentDidMount() {
        const interviews = await api.getInterviews()
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
    
        function Expand({_id, intake, year, interviewee, test_score, student_id, scores, outcome, outcome_comment, duration, comment, jr_updated, hubspot_updated}) {
            return <div>
                <p>Intake: {intake}</p> 
                <p>Year: {year}</p>
                <p>Email: {interviewee.email}</p>
                <p>Phone: {interviewee.phone}</p>
                <p>Technical Skills Average: {}</p>
                <p>Soft Skills Average: {}</p>
                <p>Interview Comments: {comment}</p>
                <p>Interview Duration: {duration}</p>
                <p>Admission Test Result: {test_score}</p>
                <p>JR Updated: {jr_updated}</p>
                <p>Hubspot Updated: {hubspot_updated}</p>
                <p>Enrolment Confirmed: {outcome}</p>
                <p>Enrolment Comment: {outcome_comment}</p>
                <p>Student ID: {student_id}</p>
                <button onClick={(_id) => {
                    this.deleteInterview}}>Delete</button>
                <Link to={{pathname: `/interviews/${_id}/edit`}}>Edit</Link>
                </div>
                
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
                        Header: "Status",
                        accessor: "outcome"
                    }
                ]}
                SubComponent={row => {

                    return (
                      <div style={{ padding: "20px" }}>
                       
                          <Expand {...row.original} />

                        </div>
                           
                   )}} 
        
                /></div>
        );
    }
}

export default InterviewList