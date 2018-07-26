import React, { Component } from 'react';
import interviewAPI from '../../api/interviewAPI'
import userAPI from '../../api/userAPI'
import {withRouter} from 'react-router-dom';
import '../Forms.css'

class InterviewUpdateForm extends Component {

    state = {
        interview: null,
        userNames: null
    }

    async componentDidMount() {
        const interview = await interviewAPI.getInterview(this.props.interviewId)
        const users = await userAPI.getUsers()
        const userNames = []
        users.map(user => {           
            if(interview.campus === user.campus) {
                 userNames.push(user.first_name + ' ' + user.last_name)
            }
            return user
        })
        if (!userNames){ 
            userNames.push("")
        }
        this.setState({interview, userNames})
    }

    updateInterview(payload) {
        const interviewId = this.state.interview._id
        interviewAPI.updateInterview(interviewId, payload)
        .then((interview) => {
            this.props.history.push('/interviews')
        })
        .catch((err) => console.error(err))
    }

    deleteInterview(id) {
        interviewAPI.deleteInterview(id)
        .then(() => {
            this.props.history.push('/interviews')
        })
        .catch((err) => console.error(err))
    }

    renderQuestions = (scores = []) => {
        return (
            <div>
                {
                    this.props.questions.map(question => {
                        const answer = scores.find((score) => score.title === question.title);
                        return (
                            <div key={question._id}>
                                <fieldset id={question._id} title={question.title} category={question.category} style={{margin: 30, textAlign: 'left'}}>
                                    <legend>{question.category}/{question.title}</legend>
                                    <h2>{question.description}</h2>
                                    { question.criteria.map( (criteria, i) => 
                                        <div key={i}>
                                            <input type="radio" defaultChecked={answer && (answer.score - 1) === i} name={question.title} id={question.category} value={criteria.value} /> {criteria.value}: {criteria.item}
                                        </div>)}
                                </fieldset>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
    
    onSubmit = (e) => {
        e.preventDefault()
        const elements = [...e.target]
        const scores = []
        elements.map(elm => {
            if(elm.type === 'fieldset') {
                const [input] = [...elm.elements].filter(elm => {
                    return elm.checked
                })
                scores.push({title: input.name, category: input.id, score: input.value })
            }
            return elm
        })

        const payload = {
            interviewer: e.target.interviewer.value,
            interviewee: {
                first_name: e.target.first_name.value,
                last_name: e.target.last_name.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
            },
            duration: e.target.duration.value,
            test_score: e.target.test_score.value,
            outcome: e.target.outcome.value,
            outcome_comment: e.target.outcome_comment.value,
            student_id: e.target.student_id.value,
            jr_updated: e.target.jr_updated.checked,
            hubspot_updated: e.target.hubspot_updated.checked,
            enrolment_confirmed: e.target.enrolment_confirmed.checked,
            comment: e.target.comment.value,
            scores: scores
        }
        e.target.reset()
        this.updateInterview(payload)
    }

    render() {
        const {interview} = this.state
        if (!interview) return null;
        const {interviewee} = interview;

        return ( 
            <div className="interviewform">
                    
                    <form onSubmit={this.onSubmit}>

                        <div className="interviewheader">
                        <h3><label htmlFor="interviewer">Interviewer: </label></h3>
                        <select name="interviewer" id="interviewer" defaultValue={interview.interviewer ? interview.interviewer : this.state.userNames[0]}>
                            {this.state.userNames.map((name, i) => {
                                return  <option key={i} value={name}>{name}</option>
                            })}
                        </select></div>
                    
                
                    <div className="interviewee">
                        <h3>Interviewee: </h3>
                        <label htmlFor="first_name">First Name: </label>
                        <input type="text" name="first_name" defaultValue={interviewee.first_name} required="required" /><br/><br/> 
                        <label htmlFor="last_name">Last Name: </label>
                        <input type="text" name="last_name" defaultValue={interviewee.last_name} required="required" /><br/><br/> 
                    
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" defaultValue={interviewee.email} required="required" /><br/><br/>
                        <label htmlFor="phone">Phone: </label>
                        <input type="text" name="phone" defaultValue={interviewee.phone} /> 
                    </div>

                    {this.renderQuestions(interview.scores)}

                    <div className="interviewinputs">
                        <p>
                            <label htmlFor="duration">Duration: </label>
                            <input type="number" name="duration" defaultValue={interview.duration}/> minutes 
                        </p>

                        <p>
                            <label htmlFor="test_score">Admissions Test Score: </label>
                            <input type="number" name="test_score" defaultValue={interview.test_score} /> 
                        </p>

                        <p>
                            <label htmlFor="outcome">Outcome: </label>
                            <select name="outcome" id="outcome" defaultValue={interview.outcome}>
                                <option value="Pending">Pending</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Withdrawn">Withdrawn</option>
                                <option value="Other">Other</option>
                            </select>
                        </p>

                        <p>
                            <label htmlFor="outcome_comment">Outcome Comments: </label><br/>
                            <textarea name="outcome_comment" className="interviewComment" defaultValue={interview.outcome_comment} rows="4" cols="50" /> 
                        </p>

                        <p>
                            <label htmlFor="student_id">Student ID: </label>
                            <input type="text" name="student_id"  defaultValue={interview.student_id} /> 
                        </p>

                        <p>
                            <label htmlFor="jr_updated">JR Updated: </label>
                            <input type="checkbox" name="jr_updated" value="jr_updated" defaultChecked={interview.jr_updated}/>
                        </p>

                        <p>
                            <label htmlFor="hubspot_updated">Hubspot Updated: </label>
                            <input type="checkbox" name="hubspot_updated" value="hubspot_updated" defaultChecked={interview.hubspot_updated} />
                        </p>

                        <p>
                            <label htmlFor="enrolment_confirmed">Enronment Confirmed: </label>
                            <input type="checkbox" name="enrolment_confirmed" value="enrolment_confirmed" defaultChecked={interview.enrolment_confirmed} />
                        </p>

                        <p>
                            <label htmlFor="comment">Comments: </label><br/>
                            <textarea name="comment" className="interviewComment" defaultValue={interview.comment} rows="4" cols="50" /> 
                        </p>
                        
                        <p>
                            <input value="Submit" type="submit" />
                        </p>
                        <br/><br/>
                        <p>
                            <button onClick={() => {
                                this.deleteInterview(interview._id)}}>Delete This Interview
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(InterviewUpdateForm)