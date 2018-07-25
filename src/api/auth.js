import axios from './init'

export default {
    fetchToken
}

async function fetchToken(email, password) {
    const response = await axios.post('/auth/login', {
        email,
        password
    })
    const {token} = response.data
    return token
}