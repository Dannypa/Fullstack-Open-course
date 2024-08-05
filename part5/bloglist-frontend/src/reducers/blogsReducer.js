import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs.js'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        addBlogAction(state, action) {
            state.push(action.payload) // added blog have 0 votes, so it can safely be stored in the end
        },
    },
})

export const reloadBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        console.log(blogs)
        dispatch(setBlogs(blogs.toSorted((a, b) => b.likes - a.likes)))
    }
}

export const addBlog = (blog, token, onSuccess = () => {}, onFail = () => {}) => {
    return async dispatch => {
        blogService
            .addNew(blog, token)
            .then(added => dispatch(addBlogAction(added)))
            .then(_ => onSuccess())
            .catch(err => onFail(err))
    }
}

const { addBlogAction } = blogSlice.actions
export const { setBlogs } = blogSlice.actions
export default blogSlice.reducer
