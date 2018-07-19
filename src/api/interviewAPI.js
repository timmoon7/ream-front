import axios from './init'
// import Interview from '../components/Interview';

// GET
export default {
    getInterviews,
    getInterview,
    createInterview,
    updateInterview,
    deleteInterview,
}

async function getInterviews() {
    const response = await axios.get('/interviews')
    return response.data
}

async function getInterview(id) {
    const uri = `/interviews/${id}`
    const response = await axios.get(uri)
    return response.data
}


// POST
async function createInterview(interview) {
    console.log(interview)
    const uri = '/interviews'

    const response = await axios.post(uri, interview)
    return response.data
}

// PATCH
async function updateInterview(id, payload) {
    const uri = `/interviews/${id}`
    const response = await axios.patch(uri, payload)
    // console.log(`Update Response Data: ${response.data.name}`)
    return response.data
}

// DELETE
async function deleteInterview(id) {
    const uri = `/interviews/${id}`
    const response = await axios.delete(uri)
    return response.data
}