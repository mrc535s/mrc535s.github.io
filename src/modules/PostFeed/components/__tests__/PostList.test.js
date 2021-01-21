import React from 'react';

import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import PostList from '../PostList';
import { PostContext } from '../../PostFeed'

import { POSTS_URI } from '../../services/PostService'

import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

const server = setupServer(
  rest.get(`${POSTS_URI}`, (req, res, ctx) => {
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
    posts: []
}
test('No Posts found displays if no posts exist', () => {

const history = createMemoryHistory()
const {getByText} = render(
    <PostContext.Provider value={setPosts}>
        <Router history={history}>
            <PostList {...props}/>
        </Router>

    </PostContext.Provider>
    );
  const loadingElement = getByText(/No Posts/i);
  expect(loadingElement).toBeInTheDocument();
});

test('Post display on the page when posts exist', () => {

    let posts = [
        {
            id: 1,
            body: 'Test Body',
            title: 'Test Title'
        }
    ]
    const history = createMemoryHistory()
    const {getByText} = render(
        <PostContext.Provider value={setPosts}>
            <Router history={history}>
                <PostList posts={posts}/>
            </Router>
    
        </PostContext.Provider>
        );
      const loadingElement = getByText(posts[0].title);
      expect(loadingElement).toBeInTheDocument();
    });

// test('delete button is disabled after clicking', () => {
//     const {getByText} = render(
//         <PostContext.Provider value={setPosts}>
//             <Post {...props} />
//         </PostContext.Provider>
//       );
//     fireEvent.click(getByText(/Delete/i));
    
//     expect(getByText(/Delete/i).closest('button')).toHaveAttribute('disabled');
// });

// test('title should equal title props when loaded', () => {
//     const {getByText} = render(
//         <PostContext.Provider value={setPosts}>
//             <Post {...props}/>
//         </PostContext.Provider>
//         );
//       const titleElement = getByText(props.title);
//       expect(titleElement).toBeInTheDocument();
// });

// test('body should equal body props when loaded', () => {
//     const {getByText} = render(
//         <PostContext.Provider value={setPosts}>
//             <Post {...props}/>
//         </PostContext.Provider>
//         );
//       const bodyElement = getByText(props.body);
//       expect(bodyElement).toBeInTheDocument();
// });

// test('it should display error if error is returned from delete', async () => {
//     const {getByText} = render(
//         <PostContext.Provider value={setPosts}>
//             <Post {...props}/>
//         </PostContext.Provider>
//         );
//         server.use(
//             rest.delete(`${POSTS_URI}/*`, (req, res, ctx) => {
//                 return res(ctx.status(400))
//             })
//           )
//       fireEvent.click(getByText(/Delete/i));
//       await waitFor(() => screen.getByText(/error/i))
//       expect(screen.getByText(/error/i)).toBeInTheDocument();
//       expect(getByText(/Delete/i).closest('button')).not.toHaveAttribute('disabled');
// });