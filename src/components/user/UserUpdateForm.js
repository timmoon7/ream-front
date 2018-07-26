import React, { Component } from 'react';
import api from '../../api/userAPI'
import {withRouter} from 'react-router-dom';
import './Forms.css'

class UserUpdateForm extends Component {

    state = {
        user: null,
    }

    async componentDidMount() {
        const user = await api.getUser(this.props.userId)
        this.setState({user})
    }

    updateUser(payload) {
        const userId = this.state.user._id
        api.updateUser(userId, payload)
        .then((user) => {
            this.props.history.push('/users')
        })
        .catch((err) => console.error(err))
    }
    
    deleteUser(id) {
        api.deleteUser(id)
        .then(() => {
            this.props.history.push('/users')
        })
        .catch((err) => console.error(err))
    }

    onSubmit = (e) => {
        e.preventDefault()

        const payload = {
            campus: e.target.campus.value,
            email: e.target.email.value,
            password: e.target.password.value,
            role: e.target.role.value,
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value
        }
        e.target.reset()
        this.updateUser(payload)
    }

    render() {
        const {user} = this.state
        if (!user) return null;

        return (
            <div className="update">
                <button onClick={() => {
                    this.deleteUser(user._id)}}>Delete This User
                </button>
                <div> 
                    <h1>Update User</h1>
                    <form onSubmit={this.onSubmit}>
                        <p> 
                            <label htmlFor="first_name">First Name: </label>
                            <input type="text" name="first_name" defaultValue={user.first_name} required="required" />
                        </p>

                        <p> 
                            <label htmlFor="last_name">Last Name: </label>
                            <input type="text" name="last_name" defaultValue={user.last_name} required="required" />
                            </p>
                            
                        <p>
                            <label htmlFor="campus" >Campus: </label>
                            <select name="campus" id="campus" defaultValue={user.campus}>
                                <option value="Melbourne">Melbourne</option>
                                <option value="Sydney">Sydney</option>
                                <option value="Brisbane">Brisbane</option>
                            </select>
                        </p>
            
                        <p>
                            <label htmlFor="role">Role: </label>
                            <select name="role" id="role" defaultValue={user.role}>
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </p>
            
                        <p>
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" defaultValue={user.email} required="required" />
                        </p>
            
                        <p>
                            <label htmlFor="password">Password: </label>
                            <input type="password" name="password"/>
                        </p>
            
                        <p>
                            <input type="submit" value="Update"/>
                        </p>
                    </form>
                </div>
        </div>
    )}
}

export default withRouter(UserUpdateForm)