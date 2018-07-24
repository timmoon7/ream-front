import React, { Component, Fragment } from 'react';
import './App.css';
import LoginForm from './components/LoginForm'
import auth from './api/auth'
import interviewAPI from './api/interviewAPI'
import questionAPI from './api/questionAPI'
import logo from './logo.jpg'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import MainMenu from './pages/MainMenu'
import ProtectedRoute from './pages/ProtectedRoute'
import InterviewForm from './components/InterviewForm'
import InterviewList from './components/InterviewList'
import RegisterForm from './components/RegisterForm'
import 'react-table/react-table.css'

import InterviewUpdateForm from './components/InterviewUpdateForm'

class App extends Component {

  state = {
    token: null,
    isLoggedIn: false,
  }

  login = (username, password) => {
    auth.fetchToken(username, password)
    .then(token => {
      localStorage.setItem('token', token)
      return token
    })
    .then(token => {
      this.setState({
        token,
        isLoggedIn: true 
      })
    })
  }

  async componentDidMount() {
    const questions = await questionAPI.getQuestions();
    const interviews = await interviewAPI.getInterviews();

    return this.setState({questions, interviews})
    
    const token = localStorage.getItem('token')

      if(token) {
        this.setState({
          token,
          isLoggedIn: true 
        })
      }
  }


  logout = () => {

      this.setState({
        token: null,
        isLoggedIn: false
      })
      
      localStorage.removeItem('token')
       //return void
  }

  render() {
    const {isLoggedIn, questions, interviews} = this.state
    return( 
    <BrowserRouter>
      <Fragment>
        <img src={logo} className="App-logo" alt="logo" />
          <Switch>
            <Route path="/" exact render={() => {
              return isLoggedIn ? 
                <MainMenu logout={this.logout} /> 
                  : 
                <LoginForm handleSubmit={this.login}/> 
              }}/>
            {interviews && questions && <ProtectedRoute active={isLoggedIn} redirect="/">
              <Route exact path="/interview/create" component={InterviewForm} />
              <Route exact path="/interviews" render={() => (
                <InterviewList
                  interviews={interviews}
                  />
              )} />
              <Route exact path="/interviews/:id/edit" render={({match: { params}}) => (
                  <InterviewUpdateForm
                    interviewId={params.id}
                    questions={questions}
                  />
              )} />
              <Route path="/register" component={RegisterForm} />
            </ProtectedRoute>}
          </Switch>
        </Fragment>
      </BrowserRouter>
      )
  }
}

export default App;
