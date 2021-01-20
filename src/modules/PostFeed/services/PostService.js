export const POSTS_URI = 'http://jsonplaceholder.typicode.com/posts';
const headers = new Headers({
    Accept: "application/vnd.github.cloak-preview",
    'Content-type': 'application/json; charset=UTF-8'
  })
const fetchAll = () => {
    return fetch(
            POSTS_URI,
          {
            method: "GET",
            headers
          }
        )
}
const addPost = (post, userId) => {
    return fetch(POSTS_URI, {
        method: 'POST',
        body: JSON.stringify({
          title: post.title,
          body: post.content,
          userId: userId,
        }),
        headers
      })
}

const deletePost = (id) => {
    return fetch(`${POSTS_URI}/${id}`, {
      method: 'DELETE',
    })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    fetchAll,
    addPost,
    deletePost
};