import React from 'react';

import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'

import CreatePost from '../CreatePost';
import { PostContext } from '../../PostFeed'

import { POSTS_URI } from '../../services/PostService'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

let post = {
    id: 1,
    title: 'Test',
    body: 'Test'
}
const server = setupServer(
  rest.post(`${POSTS_URI}`, (req, res, ctx) => {
    return res(ctx.json({ }))
  })
)

beforeAll(() => server.listen())
afterEach(() => {
    server.resetHandlers()
    cleanup()
})
afterAll(() => server.close())

let setPosts = jest.fn();


test('Create title exists', () => {
const history = createMemoryHistory()
const {getByText} = render(
    <PostContext.Provider value={setPosts}>
        <Router history={history}>
            <CreatePost/>
        </Router>
    </PostContext.Provider>
    );
  const createTitle = getByText(/Create/i);
  expect(createTitle).toBeInTheDocument();
});

test('expect Title and body to be present', () => {
    const history = createMemoryHistory()
    const { getByPlaceholderText } = render(
        <PostContext.Provider value={setPosts}>
            <Router history={history}>
                <CreatePost/>
            </Router>
        </PostContext.Provider>
        );
    const titleInput = getByPlaceholderText('Title')
    const bodyInput = getByPlaceholderText('Body')
    expect(titleInput).toBeInTheDocument();
    expect(bodyInput).toBeInTheDocument();
});

test('Title Input to change value when updated', () => {
    const history = createMemoryHistory()
    const { getByPlaceholderText } = render(
        <PostContext.Provider value={setPosts}>
            <Router history={history}>
                <CreatePost/>
            </Router>
        </PostContext.Provider>
        );
    const titleInput = getByPlaceholderText('Title')
    fireEvent.change(titleInput, {target: { value: post.title}})
    expect(titleInput.value).toBe(post.title);
});

test('body Input to change value when updated', () => {
    const history = createMemoryHistory()
    const { getByPlaceholderText } = render(
        <PostContext.Provider value={setPosts}>
            <Router history={history}>
                <CreatePost/>
            </Router>
        </PostContext.Provider>
    );
    const bodyInput = getByPlaceholderText('Body')
    fireEvent.change(bodyInput, {target: { value: post.body}})
    expect(bodyInput.value).toBe(post.body);
});

test('Save button disabled when submitting', () => {
    const history = createMemoryHistory()
    const { getByPlaceholderText, getByText } = render(
        <PostContext.Provider value={setPosts}>
            <Router history={history}>
                <CreatePost/>
            </Router>
        </PostContext.Provider>
    );

    const bodyInput = getByPlaceholderText('Body')
    const titleInput = getByPlaceholderText('Title')
    const saveButton = getByText(/Save/i)

    fireEvent.change(bodyInput, {target: { value: post.body}})
    fireEvent.change(titleInput, {target: { value: post.title}})

    fireEvent.click(saveButton)
    expect(saveButton).toHaveAttribute('disabled');
});

test('it should display error if error is returned from delete', async () => {
    const history = createMemoryHistory()
    const { getByPlaceholderText, getByText } = render(
        <PostContext.Provider value={setPosts}>
            <Router history={history}>
                <CreatePost/>
            </Router>
        </PostContext.Provider>
    );

    const bodyInput = getByPlaceholderText('Body')
    const titleInput = getByPlaceholderText('Title')
    const saveButton = getByText(/Save/i)

    fireEvent.change(bodyInput, {target: { value: post.body}})
    fireEvent.change(titleInput, {target: { value: post.title}})

    server.use(
        rest.post(`${POSTS_URI}`, (req, res, ctx) => {
            return res(ctx.status(400))
        })
    )
    fireEvent.click(saveButton)
    await waitFor(() => screen.getByText(/error/i))
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(saveButton).not.toHaveAttribute('disabled')
});