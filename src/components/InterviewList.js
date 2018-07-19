import React, { Component } from 'react';
import api from '../api/interviewAPI'
import Interview from './Interview'

class InterviewList extends Component {

    state = {
        interviews: null
    }

    async componentDidMount() {
        const interviews = await api.getInterviews()
        this.setState({interviews})
        console.log(this.state.interviews)
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
        const {interviews} = this.state


    if(!interviews) {
      return <div> No Interview Data...</div>
    }

    const interviewElements = interviews.map((interview, i) => {
        return <div key={i} >
                <Interview 
                  key={interview._id} 
                  {...interview}
                  handleDelete={this.deleteInterview}
                />
                {/* <CharacterUpdateForm 
                  // key={i} 
                    {...character}
                  handleUpdate={this.updateCharacter}
                /> */}
              </div>
      })

        return (
        <div>
            Test
            {interviewElements}
        </div>
        );
    }
}

export default InterviewList