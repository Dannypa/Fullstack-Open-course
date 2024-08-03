import axios from "axios"

const url = 'http://localhost:3001/anecdotes'

export const getAll = () => {
    return axios.get(url).then(res => res.data)
}

export const addAnecdote = async (content) => {
    await axios.post(url, {content, votes:0})
}

export const changeAnecdote = async (newAnecdote) => {
    await axios.put(`${url}/${newAnecdote.id}`, newAnecdote)
}