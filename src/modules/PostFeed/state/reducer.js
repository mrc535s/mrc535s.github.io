export const ADD_POSTS = 'ADD_POSTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'

function reducer(state, action) {
    switch(action.type) {
        case ADD_POSTS: 
          return action.data
        case ADD_POST:
          // interesting case here if id already exists and fake server always returns same id
          // in reality, probably should never happen, but if it does will find next available id
          if(state.find((post) => post.id === action.data.id)) {
            let lastPost = state.sort((a, b) => a - b)[0]
            let nextId = lastPost.id + 1
            action.data.id = nextId
          }
          return [action.data, ...state];
        case DELETE_POST: 
          return state.filter(post => {
              return post.id !== action.id
            });
        default: 
          return state;
    }
  }

  export default reducer