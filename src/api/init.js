import axios from 'axios'

const instance = axios.create({
    // baseURL: 'https://ream-api.now.sh'
    baseURL: 'http://localhost:3000'
})

export default instance