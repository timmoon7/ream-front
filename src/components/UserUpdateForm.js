import React, { Component } from 'react';
import userApi from '../api/userAPI'

class UserUpdateForm extends Component {

    state = {
        user: null,
    }

    async componentDidMount() {
        const user = await userApi.getUser(this.props.userId)
        this.setState({user})
    }

    async updateUser(payload) {
        const userId = this.state.user._id
        const user = await userApi.updateUser(userId, payload)
        return this.setState({user})
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
            <form onSubmit={this.onSubmit}>
                <h3>Update User</h3>
                <p> 
                    <label htmlFor="first_name">First Name: </label>
                    <input type="text" name="first_name" defaultValue={user.first_name} />
                </p>
                <p> 
                    <label htmlFor="last_name">Last Name: </label>
                    <input type="text" name="last_name" defaultValue={user.last_name}/>
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
                  <input type="email" name="email" defaultValue={user.email}/>
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
    )}
}

export default UserUpdateForm