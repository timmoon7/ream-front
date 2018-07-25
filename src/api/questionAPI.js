import axios from './init'

export default {
    getQuestions,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion,
}

// GET
async function getQuestions() {
    const response = await axios.get('/questions')
    return response.data
}

// GET
async function getQuestion(id) {
    const uri = `/questions/${id}`
    const response = await axios.get(uri)
    return response.data
}

// POST
async function createQuestion(question) {
    const uri = '/questions'

    const response = await axios.post(uri, question)
    return response.data
}

// PATCH
async function updateQuestion(id, payload) {
    const uri = `/questions/${id}`
    const response = await axios.patch(uri, payload)
    return response.data
}

// DELETE
async function deleteQuestion(id) {
    const uri = `/questions/${id}`
    const response = await axios.delete(uri)
    return response.data
}