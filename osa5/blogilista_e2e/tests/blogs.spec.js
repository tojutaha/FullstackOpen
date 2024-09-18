const { test, describe, expect, beforeEach } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper');

describe('Blogi lista', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      name: 'superuser',
      username: 'root',
      password: 'salainen'
    })

    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {
    const usernameLocator = await page.getByText('username')
    const passwordLocator = await page.getByText("password")
    const loginButtonLocator = await page.getByText('login')

    await expect(usernameLocator).toBeVisible()
    await expect(passwordLocator).toBeVisible()
    await expect(loginButtonLocator).toBeVisible()
  })

  describe('Login', () => {
    test('succeed with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'salainen')
      await expect(page.getByText('superuser logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', 'wrong')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'title', 'author', 'url')
      await expect(page.getByText('view')).toBeVisible()
    })
  })

})