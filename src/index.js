import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import auth from './api/auth'
import interviewAPI from './api/interviewAPI'
import questionAPI from './api/questionAPI'
import userAPI from './api/userAPI'
import logo from './logo.jpg'
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'

import MainMenu from './pages/MainMenu'
import ProtectedRoute from './pages/ProtectedRoute'
import LoginForm from './components/LoginForm'

import UserList from './components/user/UserList'
import RegisterForm from './components/user/RegisterForm'
import UserUpdateForm from './components/user/UserUpdateForm'

import InterviewForm from './components/interview/InterviewForm'
import InterviewList from './components/interview/InterviewList'
import InterviewUpdateForm from './components/interview/InterviewUpdateForm'

import QuestionForm from './components/question/QuestionForm'
import QuestionList from './components/question/QuestionList'
import QuestionUpdateForm from './components/question/QuestionUpdateForm'

export {
    auth, interviewAPI, questionAPI, userAPI, logo, BrowserRouter,
    Route, Switch, Link, MainMenu, ProtectedRoute, LoginForm, 
    UserList, RegisterForm, UserUpdateForm, InterviewForm, InterviewList,  
    InterviewUpdateForm, QuestionForm, QuestionList, QuestionUpdateForm
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();