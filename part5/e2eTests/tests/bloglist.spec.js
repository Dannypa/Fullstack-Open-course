const { test, expect, beforeEach, describe } = require('@playwright/test')


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

        // Adding a user to the db
        await request.post('/api/users', { data: user })

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
            await createBlog(page, blogToAdd.title, blogToAdd.author, blogToAdd.url) // cringe, but womp womp

            // Expanded the blog
            await page
                .locator('p')
                .filter({ hasText: defaultBlog.title })
                .getByRole('button')
                .click()

            // Like
            await page.getByRole('button', { name: 'like' }).click()

            // Wait for rerender
            await page
                .getByRole('button', { name: 'like' })
                .locator('..')
                .waitFor()

            await expect(page
                .locator('p')
                .filter({ hasText: '1 likes' }))
                .toBeVisible()

        })
    })
})