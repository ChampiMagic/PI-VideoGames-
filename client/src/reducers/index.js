import axios from 'axios';

const initialState = {
  loading: false,
  ternary: true,
  posts: [],
  postsDB: [],
  showedPosts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOADINGON':
    return {
      ...state,
      loading: true,
    }
    case 'LOADINGOFF':
    return {
      ...state,
      loading: false,
    }
    case 'TERNARYON':
    return {
      ...state,
      ternary: true,
    }
    case 'TERNARYOFF':
    return {
      ...state,
      ternary: false,
    }
    case 'SETPOSTS':
    return {
      ...state,
      posts: action.payload,
      loading: false
    }
    case 'SETPOSTSDB':
    return {
      ...state,
      postsDB: action.payload,
    }
    case 'SETSHOWEDPOSTS':
      console.log("CALLAT")
    return {
      ...state,
      showedPosts: action.payload,
    }
    default:
     return {...state}
  }
}
