import React, {useState, useContext} from "react";

import { PostContext } from '../PostFeed'
import PostService from '../services/PostService'
import { ADD_POST } from '../state/reducer'

import Button from '../../../components/Button'
import NavLink from '../../../components/NavLink'
import Input from '../../../components/Input'
import TextArea from '../../../components/TextArea'
import ErrorText from '../../../components/ErrorText'

const CreatePost = props => {
  const { setPosts } = useContext(PostContext)

  const initPostState = {
    id: null,
    title: "",
    body: ""
  };
  const [post, setPost] = useState(initPostState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null)

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const savePost = event => {
    const userId = 1
    event.preventDefault();
    setError(null)
    setSubmitted(true)

    PostService.addPost(post, userId)
      .then((response) => {
        if(!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then((serverPost) => {
        post.id = serverPost.id
        setPosts({type: ADD_POST, data: post})
        setPost(initPostState)
        setSubmitted(false)
        props.history.push("/posts");
      })
      .catch((err) => {
        //console.error(err)
        setSubmitted(false)
        setError('There was an error creating the Post.  Please try again.')
      })
  };

  return (
    <>
    <section>
      <h1>Create New Post</h1>
      <form onSubmit={savePost}>
        <Input
          type="text"
          placeholder="Title"
          disabled={submitted}
          required
          name="title"
          size="50"
          value={post.title}
          onChange={handleInputChange}
        ></Input>
        <TextArea
          placeholder="Body"
          required
          name="body"
          disabled={submitted}
          value={post.body}
          onChange={handleInputChange}
        ></TextArea>
        <section>
          <NavLink to="/posts" disabled={submitted} secondary="true">Cancel</NavLink>
          <Button disabled={submitted}>Save Post</Button>
          {error && <ErrorText>{error}</ErrorText>}
        </section>
      </form>
      </section>
    </>
  );
};
export default CreatePost;