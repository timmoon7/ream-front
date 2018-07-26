import React from 'react'
<<<<<<< HEAD:src/components/user/RegisterForm.js
import '../LoginForm.css'
import api from '../../api/userAPI'
=======
import './Forms.css'
import api from '../api/userAPI'
>>>>>>> Added form styling:src/components/RegisterForm.js

export default function RegisterForm() {

    const createUser = (payload) => {
        api.createUser(payload)
        .then((user) => {
            return user
        })
      }

    return  <div className="login"> <form onSubmit={
        (e) => {
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
            createUser(payload)
        }
    }>
            <h1>Register New User</h1>
            <p> 
                <label htmlFor="first_name">First Name: </label>
                <input type="text" name="first_name" required="required"  />
            </p>
            
            <p> 
                <label htmlFor="last_name">Last Name: </label>
                <input type="text" name="last_name" required="required"  />
                </p>
                
            <p>
                <label htmlFor="campus">Campus: </label>
                <select name="campus" id="campus">
                    <option value="Melbourne">Melbourne</option>
                    <option value="Sydney">Sydney</option>
                    <option value="Brisbane">Brisbane</option>
                </select>
            </p>

            <p>
                <label htmlFor="role">Role: </label>
                <select name="role" id="role">
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
            </p>

            <p>
              <label htmlFor="email">Email: </label>
              <input type="email" name="email" required="required"  />
            </p>

            <p>
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" required="required"  />
            </p>

            <p>
              <input type="submit" value="Register"/>
            </p>
          </form>
          </div>
}