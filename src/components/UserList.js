import React, { Component } from 'react';
import api from '../api/userAPI'
import User from './User'
import RegisterForm from './RegisterForm'


class UserList extends Component {

    state = {
        users: this.props.users
    }

    async componentDidMount() {
        const users = await api.getUsers()
        this.setState({users})
    }


    deleteUser = (id) => {
        api.deleteUser(id)
        .then(() => {
           this.setState((prevState) => {
             const users = prevState.users.filter(user => user._id !== id)               
             return {users}
           })
        })
        .catch((err) => console.error(err))
    }

    render() {
        const {users} = this.state;

        if(!users) {
            return <div> No User Data...</div>
        }

        return (
            <div>
                <RegisterForm />
                <h3>Current Users</h3>
                {users.map((user) => (
                    <User
                        key={user._id}
                        user={user}
                        handleDelete={this.deleteUser}
                    />
                ))}
            </div>
        );
    }
}

export default UserList