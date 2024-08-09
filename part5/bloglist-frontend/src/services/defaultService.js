import axios from 'axios'

const formToken = token => `Bearer ${token}`
const configFromToken = token => ({
    headers: {
        Authorization: formToken(token),
    },
})

export const getService = baseUrl => {
    return {
        getAll() {
            const request = axios.get(baseUrl)
            return request.then(response => response.data)
        },
        update(id, newResource) {
            // todo: auth!!!
            return axios.put(`${baseUrl}/${id}`, newResource).then(resp => resp.data)
        },
        add(resource, token) {
            return axios.post(baseUrl, resource, configFromToken(token)).then(resp => resp.data)
        },
        delete(id, token) {
            // if some service does not require a token, it is possible to simply not pass it
            return axios.delete(`${baseUrl}/${id}`, configFromToken(token)).then(resp => resp.data)
        },
    }
}
