import axios from 'axios'
const baseUrl = '/api/users'

const getOne = async (id) => {
    const req = await axios.get(`${baseUrl}/${id}`)
    return req.data
}

export default { getOne }