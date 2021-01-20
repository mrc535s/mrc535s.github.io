import React, { useReducer, createContext, useEffect, useState} from 'react';
import PostList from './components/PostList'
import CreatePost from './components/CreatePost'
import { Switch, Route } from "react-router-dom";
import reducer, { ADD_POSTS } from './state/reducer'
import PostService from './services/PostService'
import { BrowserRouter } from "react-router-dom";

export const PostContext = createContext();

const PostFeed = () => {
    const [posts, setPosts] = useReducer(reducer, [])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
      setIsLoading(true)
      setError(null)
      let mounted = true;
      PostService
        .fetchAll()
        .then(res => {
          if(!res.ok) {
            throw new Error(res.statusText)
          }
          return res.json()
        })
        .then(response => {
          if(mounted) {
            setPosts({ type: ADD_POSTS, data: response } );
          }
        })
        .catch(error => {
          console.log(error)
          if(mounted)
            setError("There was an error loading posts.  Please try again")
        })
        .finally(() => {
          if(mounted)
            setIsLoading(false)
        });
        return () => { mounted = false; }
      }, []);
  return (
    <PostContext.Provider value={{ setPosts }}>
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path={["/posts", "/"]}>
            {isLoading ? <div>Loading Posts...</div> : error ? <div>{error}</div> : <PostList posts={ posts }/>}
            </Route>
          <Route exact path="/posts/add" component={ CreatePost } />
        </Switch>
        </BrowserRouter>
    </div>
    </PostContext.Provider>
  );
};
export default PostFeed;