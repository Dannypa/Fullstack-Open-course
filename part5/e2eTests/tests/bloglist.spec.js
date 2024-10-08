const { test, expect, beforeEach, describe } = require('@playwright/test')
const exp = require('node:constants')


const fillInput = async (page, testId, value) => {
    const locator = await page.getByTestId(testId)
    await locator.fill(value)
}

const login = async (page, username, password) => {
    await fillInput(page, 'username-input', username)
    await fillInput(page, 'password-input', password)
    await page.getByTestId('login-button').click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByText(/create a blog/).click()

    await fillInput(page, 'blog-title-input', title)
    await fillInput(page, 'blog-author-input', author)
    await fillInput(page, 'blog-url-input', url)

    await page.getByTestId('create-blog-button').click()
    await page.getByText(title).waitFor()
}

const expandBlog = async (page, blogTitle) => {
    await page
        .locator('p')
        .filter({ hasText: blogTitle })
        .getByRole('button')
        .click()
}

const likeOne = async (page) => {
    // assumes that only one like button is visible
    // Like
    await page.getByRole('button', { name: 'like' }).click()

    // Wait for the changes to take effect
    await page
        .locator('p')
        .filter({ hasText: '1 likes' }).waitFor()
}

const rootUser = {
    username: 'root',
    name: 'root root',
    password: 'супер секрет'
}

const user = {
    'username': 'dannypa',
    'name': 'Daniil Parniukov.',
    'password': 'секрет'
}

const defaultBlog = {
    title: 'i\'ve always been here',
    author: 'ging',
    url: 'https://www.mapcrunch.com/'
}

const blogToAdd = {
    'title': 'my test blog',
    'author': 'neil',
    'url': 'https://hackertyper.com/'
}

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        // Clearing the db
        await request.post('/api/testing/reset')

        // Adding users to the db
        await request.post('/api/users', { data: rootUser })
        await request.post('/api/users', { data: user })

        await page.pause()
        // getting a token for the root user to add a blog
        const resp = await request.post('/api/login', { data: rootUser })
        const jsonResp = await resp.json()
        const token = jsonResp.token

        // adding a blog to the db as the root user
        await request.post('/api/blogs', {
            data: defaultBlog,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        // loading the page
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByTestId('login-form')
        await expect(locator).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with the correct credentials', async ({ page }) => {
            await login(page, user.username, user.password)

            await expect(page.getByTestId('logged-user-name')).toBeVisible()
        })

        test('fails with at least ~some~ of the wrong credentials', async ({ page }) => {
            await login(page, user.username, user.password + '123')

            await expect(page.getByTestId('logged-user-name')).not.toBeVisible()
            await expect(page.getByText('Wrong username or password!')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await login(page, user.username, user.password)
        })

        test('a user can add a blog', async ({ page }) => {
            await createBlog(page, blogToAdd.title, blogToAdd.author, blogToAdd.url)
        })

        test('a user can like a blog', async ({ page }) => {
            await createBlog(page, defaultBlog.title, defaultBlog.author, defaultBlog.url)

            // Expanding the blog
            await expandBlog(page, defaultBlog.title)

            // liking
            await likeOne(page)
        })

        test('a user can delete a blog they added', async ({ page }) => {
            // configure to confirm when the window dialogue appears
            page.on('dialog', dialog => dialog.accept())

            // adding the blog to be deleted
            await createBlog(page, blogToAdd.title, blogToAdd.author, blogToAdd.url)

            // deleting the blog
            // expanding
            await expandBlog(page, blogToAdd.title)
            // clicking the delete button
            await page.getByRole('button', { name: 'delete blog' }).click()

            // ensuring that there is no such blog on the page now
            await expect(page.getByText(blogToAdd.title)).not.toBeVisible()
        })

        test('a user does not see the delete button for the blog they did not create', async ({ page }) => {
            // expand the default blog
            await expandBlog(page, defaultBlog.title)

            await expect(page.getByRole('button', { name: 'delete blog' })).not.toBeVisible()
        })

        test('the blogs are sorted by likes number', async ({ page }) => {
            // adding a blog
            await createBlog(page, blogToAdd.title, blogToAdd.author, blogToAdd.url)

            // expanding
            await expandBlog(page, blogToAdd.title)

            // liking the second added blog
            await likeOne(page)

            // expanding the default blog
            await expandBlog(page, defaultBlog.title)

            // getting all the elements with like info
            const likeTexts = await page
                .locator('p')
                .filter({ hasText: 'likes' })
                .all()
            const likeNumbers = []
            for (const likeText of likeTexts) {
                const html = await likeText.innerHTML()
                const likeInfo = /\d+ likes/.exec(html)[0]
                likeNumbers.push(parseInt(/\d+/.exec(likeInfo)[0]))
            }
            await expect(
                likeNumbers
                    .toSorted((a, b) => b - a)
                    .toString()
                === likeNumbers.toString())
                .toBeTruthy()
            // ^ may be bad code cause of toStrings in general, but my arrays consist of numbers only
        })
    })
})