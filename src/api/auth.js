import axios from './init'

// example
// import auth from './api/auth'
// auth.loginUser()

export default {
    fetchToken
}

async function fetchToken(email, password) {
    // pretending to post the email, password
    // post gives back token if success
    const response = await axios.post('/auth/login', {
        email,
        password
    }) //fake token req
    const {token} = response.data
    return token
}