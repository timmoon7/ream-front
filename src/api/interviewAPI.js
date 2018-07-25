import axios from './init'

export default {
    getInterviews,
    getInterview,
    createInterview,
    updateInterview,
    deleteInterview,
}

// GET
async function getInterviews() {
    const response = await axios.get('/interviews')
    return response.data
}

// GET
async function getInterview(id) {
    const uri = `/interviews/${id}`
    const response = await axios.get(uri)
    return response.data
}

// POST
async function createInterview(interview) {
    const uri = '/interviews'
    const response = await axios.post(uri, interview)
    return response.data
}

// PATCH
async function updateInterview(id, payload) {
    const uri = `/interviews/${id}`
    const response = await axios.patch(uri, payload)
    return response.data
}

// DELETE
async function deleteInterview(id) {
    const uri = `/interviews/${id}`
    const response = await axios.delete(uri)
    return response.data
}