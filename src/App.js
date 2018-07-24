import React, { Component, Fragment } from 'react';
import './App.css';
import LoginForm from './components/LoginForm'
import auth from './api/auth'
import interviewAPI from './api/interviewAPI'
import questionAPI from './api/questionAPI'
import userAPI from './api/userAPI'
import logo from './logo.jpg'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import MainMenu from './pages/MainMenu'
import ProtectedRoute from './pages/ProtectedRoute'
import InterviewForm from './components/InterviewForm'
import InterviewList from './components/InterviewList'
import UserList from './components/UserList'
import RegisterForm from './components/RegisterForm'
import 'react-table/react-table.css'
import UserUpdateForm from './components/UserUpdateForm'

import InterviewUpdateForm from './components/InterviewUpdateForm'
import QuestionForm from './components/QuestionForm'

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
    const users= await userAPI.getUsers();

    return this.setState({questions, interviews, users})
    
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
    const {isLoggedIn, questions, interviews, users} = this.state
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
              <Route exact path="/users" render={() => (
                <UserList
                  users={users}
                  />
              )} />
              <Route exact path="/interviews/:id/edit" render={({match: { params}}) => (
                  <InterviewUpdateForm
                    interviewId={params.id}
                    questions={questions}
                  />
              )} />
              <Route exact path="/users/:id/edit" render={({match: { params}}) => (
                  <UserUpdateForm
                    userId={params.id}
                  />
              )} />
              <Route path="/register" component={RegisterForm} />
              <Route exact path="/question/create" component={QuestionForm} />
            </ProtectedRoute>}
          </Switch>
        </Fragment>
      </BrowserRouter>
      )
  }
}

export default App;
