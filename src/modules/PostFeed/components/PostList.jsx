import React from "react";
import styled from 'styled-components';

import Post from "./Post";
import NavLink from '../../../components/NavLink'

import colors from '../../../styles/colors'

const PostListHeader = styled.div`
    top: 0;
    width: 100%;
    background-color: #fff;
    padding-bottom: 30px;
    border-bottom: 1px solid ${colors.grey1};
    position: fixed;
`

const PostListBody = styled.div`
    margin-top: 120px;
`
const PostList = (props) => {
  const { posts } = props
  return (
    <>
      <PostListHeader>
        <h1>Post Feed</h1>
        <section>
            <NavLink to="/posts/add">Create New Post</NavLink>
        </section>
      </PostListHeader>
      <PostListBody>
        {!posts.length ? (
          <section>
            <h1>No Posts Found!</h1>
            <br />
            <br />
          </section>
        ) : (
        <div>
          <section>
          {posts.map(post => {
            return (
              <Post
                id={post.id}
                key={post.id}
                title={post.title}
                body={post.body}
              />
            );
          })}
          </section>
          
          </div>

        )}
      </PostListBody>
    </>
  );
};
export default PostList;