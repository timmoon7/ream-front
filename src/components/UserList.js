import React, { Component } from 'react';
import api from '../api/userAPI'
import RegisterForm from './RegisterForm'
import ReactTable from 'react-table'
import { Link } from 'react-router-dom'
import './ReactTables.css'

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
            return <div className="expandsection">
                    <p class="utitle">Name: <span class="uvalue"> {first_name} {last_name}</span></p>
                    <p class="utitle">Email: <span class="uvalue"> {email}</span></p>
                    <p class="utitle">Campus: <span class="uvalue"> {campus}</span></p>
                    <p class="utitle">Role: <span class="uvalue"> {role}</span></p>
                    <button>
                        <Link to={{pathname: `/users/${_id}/edit`}}>Edit</Link>
                    </button>
                </div>       
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