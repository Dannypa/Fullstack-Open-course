import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogPage from './BlogPage.jsx'
import { Provider } from 'react-redux'
import store from '../store.js'

const blog = {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    user: '669d316bcddca562b5a0d38a',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    likes: 10,
    __v: 0,
}

/* eslint-disable no-undef */
// disabling cause of test and expect and stuff

const likeMock = vi.fn()
const deleteMock = vi.fn()
let container
beforeEach(() => {
    likeMock.mockClear()
    deleteMock.mockClear()
    container = render(
        <Provider store={store}>
            <BlogPage
                blog={blog}
                user={{ username: 'a', token: 'b' }}
                handleLikeIncrease={likeMock}
                handleDelete={deleteMock}
            />
        </Provider>,
    ).container
})

test('renders blog title and author', () => {
    const element = container.querySelector('p')
    expect(element).toContainHTML(blog.title)
    expect(element).toContainHTML(blog.author)
})

test('does not render blog url and likes by default', () => {
    expect(container).not.toContainHTML(blog.url)
    expect(container).not.toContainHTML(`${blog.likes} likes`)
})

let user
describe("after clicking 'view'", () => {
    beforeEach(async () => {
        user = userEvent.setup()
        const button = container.querySelector('button')
        await user.click(button)
    })

    test('renders blog url and likes after the button has been clicked', async () => {
        expect(container).toContainHTML(blog.url)
        expect(container).toContainHTML(`${blog.likes} likes`)
    })

    // test('expect the like increase handler to be called as many times as the like button has been clicked', async () => {
    //     const likeButton = container.querySelector('.likeButton')
    //     await user.click(likeButton)
    //     await user.click(likeButton)
    //     expect(likeMock.mock.calls).toHaveLength(2)
    // })
})

/* eslint-enable no-undef */
