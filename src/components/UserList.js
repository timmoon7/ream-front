import React, { Component } from 'react';
import api from '../api/userAPI'
import RegisterForm from './RegisterForm'
import ReactTable from 'react-table'
import { Link } from 'react-router-dom'


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

        function Expand({_id, first_name, last_name, email, campus, role}) {
            return <li>
                    <p>Name: {first_name + last_name}</p>
                    <p>Email: {email}</p>
                    <p>Campus: {campus}</p>
                    <p>Role {role}</p>
                    <button>
                        <Link to={{pathname: `/users/${_id}/edit`}}>Edit</Link>
                    </button>
                </li>       
        }

        return (
            <div>
                <RegisterForm />
                <h1>Current Users</h1>
                <div>
                    <ReactTable
                        data={users}
                        className="-striped -highlight"
                        columns={[
                            {
                                Header: "First Name",
                                accessor: "first_name"
                            },
                            {
                                Header: "Last Name",
                                accessor:"last_name"      
                            },
                            {
                                Header: "Email",
                                accessor:"email"
                            },
                            {
                                Header: "Campus",
                                accessor:"campus"
                            },
                            {
                                Header: "Role",
                                accessor:"role"
                            }
                        ]}

                        SubComponent={row => {
                            return (
                                <div style={{ padding: "20px" }}>
                                    <Expand {...row.original} />
                                </div>  
                            )
                        }} 
                    />
                </div>
                );
            </div>
        );
    }
}

export default UserList