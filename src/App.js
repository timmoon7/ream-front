import React, { Component, Fragment } from 'react';
import './App.css';
import LoginForm from './components/LoginForm'
import auth from './api/auth'
import logo from './logo.jpg'
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import InterviewForm from './components/InterviewForm'
import InterviewList from './components/InterviewList'


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
          {isLoggedIn ?  
            <div className="mainMenu">
                <p>
                  <button>
                   <Link to="/createInterview">New Candidate</Link>
                  </button>
                </p>
                <p>
                  <button>
                   <Link to="/getInterviews">View all candidates</Link>
                  </button>
                </p>
                <p>
                  <button>
                   <Link to="/interview">Register New Interviewer/Admin (Admin Only)</Link>
                 </button>
                </p>
                <p>
                 <button onClick={this.logout}>
                   Logout
                 </button>
                </p>
                <Switch>
                  <Route path="/createInterview" component={InterviewForm} />
                  <Route path="/getInterviews" component={InterviewList} />
                </Switch>
            </div>
              : 
            <LoginForm handleSubmit={this.login}/> 
          }
        </Fragment>
      </BrowserRouter>
      )
  }
}

export default App;
