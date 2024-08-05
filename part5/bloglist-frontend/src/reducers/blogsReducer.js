import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs.js'

// | to be used only when doing api requests!
// v
const translateToUserIdForm = blog => ({ ...blog, user: blog.user.id })
const addLike = blog => ({ ...blog, likes: blog.likes + 1 })

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
        sortBlogs(state, _action) {
            return state.toSorted((a, b) => b.likes - a.likes)
        },
        likeBlogAction(state, action) {
            // store id in the payload
            return state.map(blog => (blog.id === action.payload ? addLike(blog) : blog))
        },
        deleteBlogAction(state, action) {
            // store id in the payload
            return state.filter(blog => blog.id !== action.payload)
        },
    },
})

export const reloadBlogs = () => {
    return dispatch => {
        blogService.getAll().then(blogs => {
            console.log(blogs)
            dispatch(setBlogs(blogs.toSorted((a, b) => b.likes - a.likes)))
        })
    }
}

export const addBlog = (blog, token, onSuccess = () => {}, onFail = () => {}) => {
    return dispatch => {
        blogService
            .addNew(blog, token)
            .then(added => dispatch(addBlogAction(added)))
            .then(result => onSuccess(result))
            .catch(err => onFail(err))
    }
}

// in both actions here there may be different data saved on the server and in the app until the first reload after failed operation.
export const likeBlog = (blog, onSuccess = () => {}, onFail = () => {}) => {
    // sad that i have to pass a blog, but i am too lazy to implement cleverer solutions
    return dispatch => {
        blogService
            .updateBlog(blog.id, translateToUserIdForm(addLike(blog)))
            .then(result => onSuccess(result))
            .catch(err => onFail(err))
        dispatch(likeBlogAction(blog.id))
        dispatch(sortBlogs())
    }
}

export const deleteBlog = (id, token, onSuccess = () => {}, onFail = () => {}) => {
    return dispatch => {
        blogService
            .deleteBlog(id, token)
            .then(result => onSuccess(result))
            .catch(err => onFail(err))
        dispatch(deleteBlogAction(id)) // the blogs remain sorted
    }
}

const { addBlogAction, likeBlogAction, deleteBlogAction } = blogSlice.actions
export const { setBlogs, sortBlogs } = blogSlice.actions
export default blogSlice.reducer
