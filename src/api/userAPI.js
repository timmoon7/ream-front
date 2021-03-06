import axios from './init'

export default {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
}

// GET
async function getUsers() {
    const response = await axios.get('/users')
    return response.data
}

// GET
async function getUser(id) {
    const uri = `/users/${id}`
    const response = await axios.get(uri)
    return response.data
}

// POST
async function createUser(user) {
    const uri = '/users'

    const response = await axios.post(uri, user)
    return response.data
}

// PATCH
async function updateUser(id, payload) {
    const uri = `/users/${id}`
    const response = await axios.patch(uri, payload)
    return response.data
}

// DELETE
async function deleteUser(id) {
    const uri = `/users/${id}`
    const response = await axios.delete(uri)
    return response.data
}