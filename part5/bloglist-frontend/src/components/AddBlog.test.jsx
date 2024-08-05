// import { render } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import AddBlog from './AddBlog.jsx'
// import { Provider } from 'react-redux'
// import store from '../store.js'
//
// let container
//
// /* eslint-disable no-undef */
// const mockSubmit = vi.fn(e => e.preventDefault())
// const user = userEvent.setup()
//
// beforeEach(() => {
//     mockSubmit.mockClear()
//     container = render(
//         <Provider store={store}>
//             <AddBlog handleCreate={mockSubmit} token={'token'} />{' '}
//         </Provider>,
//     ).container
// })
//
// const fillInput = async (className, value) => {
//     const titleInput = container.querySelector(className)
//     await user.type(titleInput, value)
// }
//
// test('AddBlog calls onSubmit with the correct parameters', async () => {
//     const blog = {
//         title: 'First class tests',
//         author: 'Robert C. Martin',
//         url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
//     }
//     await fillInput('.titleInput', blog.title)
//     await fillInput('.authorInput', blog.author)
//     await fillInput('.urlInput', blog.url)
//     const button = container.querySelector('button')
//     await user.click(button)
//     expect(mockSubmit.mock.calls).toHaveLength(1)
//     expect(mockSubmit.mock.calls[0][1].current).toEqual(blog.title)
//     expect(mockSubmit.mock.calls[0][2].current).toEqual(blog.author)
//     expect(mockSubmit.mock.calls[0][3].current).toEqual(blog.url)
//     expect(mockSubmit.mock.calls[0][4]).toEqual('token')
// })
// /* eslint-enable */

// todo: currently does not work as i pass no extra functions to components that handle clicks; how to fix?
