import React, { Component } from 'react';
import api from '../api/interviewAPI'
import Interview from './Interview'

class InterviewList extends Component {

    state = {
        interviews: this.props.interviews
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
        // deconstructing
        // const {interviews} = this.state
        const {interviews} = this.state;

        if(!interviews) {
        return <div> No Interview Data...</div>
        }

    // const interviewElements = interviews.map((interview, i) => {
    //     return <div key={i} >
    //             <Interview 
    //               key={interview._id} 
    //               {...interview}
    //               handleDelete={this.deleteInterview}
    //             />
    //           </div>
    //   })

        return (
            <div>
                {interviews.map((interview) => (
                    <Interview
                        key={interview._id}
                        interview={interview}
                        handleDelete={this.deleteInterview}
                    />
                ))}
            </div>
        );
    }
}

export default InterviewList