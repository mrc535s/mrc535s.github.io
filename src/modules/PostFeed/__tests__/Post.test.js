import React from 'react';

import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Post from '../components/Post';
import { PostContext } from '../PostFeed'

import { POSTS_URI } from '../services/PostService'

const server = setupServer(
  rest.delete(`${POSTS_URI}/*`, (req, res, ctx) => {
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

let props = {
    id: 1,
    title: 'Ham',
    body: 'Sandwich'
}
test('delete button to be present', () => {
const {getByText} = render(
    <PostContext.Provider value={setPosts}>
        <Post {...props}/>
    </PostContext.Provider>
    );
  const deleteButton = getByText(/Delete/i);
  expect(deleteButton).toBeInTheDocument();
});

test('delete button is disabled after clicking', () => {
    const {getByText} = render(
        <PostContext.Provider value={setPosts}>
            <Post {...props} />
        </PostContext.Provider>
      );
    fireEvent.click(getByText(/Delete/i));
    
    expect(getByText(/Delete/i).closest('button')).toHaveAttribute('disabled');
});

test('title should equal title props when loaded', () => {
    const {getByText} = render(
        <PostContext.Provider value={setPosts}>
            <Post {...props}/>
        </PostContext.Provider>
        );
      const titleElement = getByText(props.title);
      expect(titleElement).toBeInTheDocument();
});

test('body should equal body props when loaded', () => {
    const {getByText} = render(
        <PostContext.Provider value={setPosts}>
            <Post {...props}/>
        </PostContext.Provider>
        );
      const bodyElement = getByText(props.body);
      expect(bodyElement).toBeInTheDocument();
});

test('it should display error if error is returned from delete', async () => {
    const {getByText} = render(
        <PostContext.Provider value={setPosts}>
            <Post {...props}/>
        </PostContext.Provider>
        );
        server.use(
            rest.delete(`${POSTS_URI}/*`, (req, res, ctx) => {
                return res(ctx.status(400))
            })
          )
      fireEvent.click(getByText(/Delete/i));
      await waitFor(() => screen.getByText(/error/i))
      expect(screen.getByText(/error/i)).toBeInTheDocument();
      expect(getByText(/Delete/i).closest('button')).not.toHaveAttribute('disabled');
});