import axios from "axios"

const url = 'http://localhost:3001/anecdotes'

export const getAll = () => {
    return axios.get(url).then(res => res.data)
}

export const addAnecdote = (content) => {
    axios.post(url, {content, votes:0}).then(res => res.data)
}

export const changeAnecdote = (newAnecdote) => {
    axios.put(`${url}/${newAnecdote.id}`, newAnecdote).then(res => res.data)
}