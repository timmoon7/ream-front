import React, { Component, Fragment } from 'react';
import './App.css';
import 'react-table/react-table.css'
import  {
          auth, interviewAPI, questionAPI, userAPI, logo, BrowserRouter, 
          Route, Switch, Link, MainMenu, ProtectedRoute, LoginForm, UserList, 
          RegisterForm, UserUpdateForm, InterviewForm, InterviewList, InterviewUpdateForm, 
          QuestionForm, QuestionList, QuestionUpdateForm
        } from './index'

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
    document.title = "CA Admission Matrix"
    const questions = await questionAPI.getQuestions();
    const interviews = await interviewAPI.getInterviews();
    const users= await userAPI.getUsers();

    return this.setState({questions, interviews, users})
  }

  logout = () => {

      this.setState({
        token: null,
        isLoggedIn: false
      })
      
      localStorage.removeItem('token')
  }

  render() {
    const {isLoggedIn, questions, interviews, users} = this.state
    return( 
    <BrowserRouter>
      <Fragment>
          <Link className="logo" to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
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
              <Route exact path="/questions" render={() => (
                <QuestionList
                  questions={questions}
                />
              )} />
              <Route exact path="/questions/:id/edit" render={({match: { params}}) => (
                <QuestionUpdateForm
                    questionId={params.id}
                />
              )} />
            </ProtectedRoute>}
          </Switch>
        </Fragment>
      </BrowserRouter>
      )
  }
}

export default App;