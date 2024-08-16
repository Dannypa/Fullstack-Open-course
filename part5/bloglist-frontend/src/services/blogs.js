import { getService } from './defaultService.js'
import axios from 'axios'

const baseUrl = '/api/blogs'

export default {
    ...getService(baseUrl),
    addComment(id, comment) {
        return axios.post(`${baseUrl}/${id}/comments/`, { comment: comment }).then(resp => resp.data)
    },
}
