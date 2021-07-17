import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => {
        return res.data
    })
}

const create = (newObject) => {
    const req = axios.post(baseUrl, newObject)
    return req.then(res => res.data)
}

const remove = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(res => res.data)
}

const update = (id, updated) => {
    const req = axios.put(`${baseUrl}/${id}`, updated)
    return req
        .then(res => res.data)
        .catch(err => console.log(err))
}

export default { getAll, create, remove, update }
