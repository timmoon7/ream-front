import React, { Component } from 'react';
import interviewApi from '../api/interviewAPI'
import './InterviewForm.css'
class InterviewUpdateForm extends Component {

    state = {
        interview: null,
    }

    async componentDidMount() {
        console.log('form did mount');
        const interview = await interviewApi.getInterview(this.props.interviewId)
        this.setState({interview})
    }

    async updateInterview(payload) {
        // console.log(payload)
        // interviewApi.updateInterview('5b52e2a109e9d22c40832c74', payload)
        const interviewId = this.state.interview._id
        interviewApi.updateInterview(interviewId, payload)
        .then((interview) => {
            return this.setState({interview})
        })
    }

    renderQuestions = (scores = []) => {
        return (
            <div>
                {
                    this.props.questions.map(question => {
                        // question needs to be in a group identified by it's id
                        // questions need to be radio
                        const answer = scores.find((score) => score.title === question.title);
                        // console.log(answer.score);
                        return (
                            <div key={question._id}>
                                <fieldset id={question._id} title={question.title} category={question.category} style={{margin: 30, textAlign: 'left'}}>
                                    <legend>{question.category}/{question.title}</legend>
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
        })

        const payload = {
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
        // const {questions, interview} = this.state
        const {interview} = this.state
        if (!interview) return null;
        const {interviewee} = interview;

        console.log(interview);
        
        return ( 

            <div className="interview"><form onSubmit={this.onSubmit}>
                <p>
                    <label htmlFor="interviewee">Interviewee: </label>
                    {interviewee.first_name + ' ' + interviewee.last_name}
                </p>

                {this.renderQuestions(interview.scores)}
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
                    <label htmlFor="outcome_comment">Outcome Comments: </label>
                    <input type="text" name="outcome_comment"  defaultValue={interview.outcome_comment}/> 
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
                    <label htmlFor="comment">Comments: </label>
                    <input type="text" name="comment"  defaultValue={interview.comment} /> 
                </p>
                <p>
                    <input value="submit" type="submit" />
                </p> 
            </form>
            </div>
        )
    }
}

export default InterviewUpdateForm