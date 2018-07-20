import React, { Component, Fragment } from 'react';
import './App.css';
import LoginForm from './components/LoginForm'
import auth from './api/auth'
import logo from './logo.jpg'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import MainMenu from './pages/MainMenu'
import ProtectedRoute from './pages/ProtectedRoute'
import InterviewForm from './components/InterviewForm'
import InterviewList from './components/InterviewList'
import RegisterForm from './components/RegisterForm'


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

    componentDidMount() {
      // nothing here so far
      // locked in
      const token = localStorage.getItem('token')

      // token (007)
      // token null
      if(token) {
        this.setState({
          token,
          isLoggedIn: true 
        })
      }

    
    }
    // post username, password √
    // receieve token √
    // update state 
    // update state to set LoggedIn to true
  


  logout = () => {

      this.setState({
        token: null,
        isLoggedIn:false
      })
      
      localStorage.removeItem('token')
       //return void
  }

  render() {
    const {isLoggedIn} = this.state
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
            <ProtectedRoute active={isLoggedIn} redirect="/">
              <Route path="/createInterview" component={InterviewForm} />
              <Route path="/getInterviews" component={InterviewList} />
              <Route path="/register" component={RegisterForm} />
            </ProtectedRoute>
          </Switch>
        </Fragment>
      </BrowserRouter>
      )
  }
}

export default App;
