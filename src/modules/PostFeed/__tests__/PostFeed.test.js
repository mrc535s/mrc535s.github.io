import React from 'react';

import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, cleanup, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import PostFeed from '../PostFeed';


import { POSTS_URI } from '../services/PostService'

const server = setupServer(
  rest.get(`${POSTS_URI}`, (req, res, ctx) => {
    return res(ctx.json([
        {
          "userId": 1,
          "id": 1,
          "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
          "userId": 1,
          "id": 2,
          "title": "qui est esse",
          "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        }]))
  })
)

beforeAll(() => server.listen())
afterEach(() => {
    server.resetHandlers()
    cleanup()
})
afterAll(() => server.close())


test('Loading message displays when component loads', () => {
const {getByText} = render(
        <PostFeed />
    );
  const LoadingText = getByText(/Loading/i);
  expect(LoadingText).toBeInTheDocument();
});

test('Post Feed displays when posts finish loading', async () => {
        render(
            <PostFeed />
        );
      const LoadingText = await waitFor(() => screen.getByText(/Post Feed/i));
      expect(LoadingText).toBeInTheDocument();
});

test('Post Feed displays error if error loading posts', async () => {
    server.use(
        rest.get(`${POSTS_URI}`, (req, res, ctx) => {
            return res(ctx.status(400))
        })
      )
    render(
        <PostFeed />
    );
  const errorText = await waitFor(() => screen.getByText(/error/i));
  expect(errorText).toBeInTheDocument();
});
