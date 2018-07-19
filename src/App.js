import React, { Component, Fragment } from 'react';
import './App.css';
import LoginForm from './components/LoginForm'
import auth from './api/auth'
import logo from './logo.jpg'
//test comment

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
    return <Fragment>
      <img src={logo} className="App-logo" alt="logo" />
        {isLoggedIn ?  
          <div className="mainMenu">
            <p><button>New Candidate</button></p>
            <p><button>View All Candidates</button></p>
            <p><button>Register New Interviewer/Admin (Admin Only)</button></p> 
            <p><button onClick={this.logout}>Logout</button></p> 
          </div>
            : 
          <LoginForm handleSubmit={this.login}/> 
        }
      </Fragment>
  }
}

export default App;