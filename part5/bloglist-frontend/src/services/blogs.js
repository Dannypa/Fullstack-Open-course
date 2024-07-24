import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const formToken = (token) => `Bearer ${token}`

const addNew = (contents, token) => {
  return axios
      .post(baseUrl, contents, {
        headers: {
          Authorization: formToken(token)
        }
      })
      .then(resp => resp.data)
}

const changeBlog = (id, newBlog) => {
    return axios
        .put(`${baseUrl}/${id}`, newBlog)
        .then(resp => resp.data)
}

const deleteBlog = (id, token) => {
    return axios
        .delete(`${baseUrl}/${id}`, {
            headers: {
                Authorization: formToken(token)
            }
        })
        .then(resp => resp.data)
}

export default { getAll, addNew, changeBlog, deleteBlog}