import React, {useContext, useState} from "react";
import styled from 'styled-components';

import { PostContext } from '../PostFeed'
import PostService from '../services/PostService'
import { DELETE_POST } from '../state/reducer'
import Button from '../../../components/Button'
import ErrorText from '../../../components/ErrorText'

import colors from '../../../styles/colors'

const PostCard = styled.section`
    border: ${colors.grey1} 1px solid;
    padding: 0px 20px 10px;
    margin: 10px 0;
    border-radius: 5px;
 }
`;
const Post = ({ title, body, id }) => {
  const { setPosts } = useContext(PostContext)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const deletePost = id => {
    setSubmitted(true)
    setError(null)
    PostService.deletePost(id)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        setSubmitted(false)
        setPosts({type: DELETE_POST, id: id});
      })
      .catch((error) => {
        console.error(error)
        setSubmitted(false)
        setError("There was an error deleting the post, please try again")
      })
  };
  return (
    <>
      <PostCard>
        <h2>{title}</h2>
        <p> {body}</p>
        <Button danger disabled={submitted} onClick={() => deletePost(id)} >Delete</Button>
        {error && <ErrorText>{error}</ErrorText>}
      </PostCard>
    </>
  );
};
export default Post;