import axios from 'axios'
const baseUrl = '/api/scores'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const sendScore = async ({ score, gameId }) => {
    const config = {
    headers: { Authorization: token },
    }

    const res = await axios.post(baseUrl, { score, gameId }, config)
    return res.data
}

export default { sendScore, setToken }