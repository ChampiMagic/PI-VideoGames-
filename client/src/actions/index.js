import axios from 'axios';

const LOADINGON = 'LOADINGON';
const LOADINGOFF = 'LOADINGOFF';
const TERNARYON = 'TERNARYON';
const TERNARYOFF = 'TERNARYOFF';
const GETPOSTS = 'GETPOSTS';
const SETPOSTS= 'SETPOSTS';
const SETPOSTSDB = 'SETPOSTSDB';
const SETSHOWEDPOSTS = 'SETSHOWEDPOSTS';



export function loadingON() {
  return {
    type: LOADINGON,

  }
}

export function loadingOFF() {
  return {
    type: LOADINGOFF,

  }
}

export function ternaryON() {
  return {
    type: TERNARYON,

  }
}

export function ternaryOFF() {
  return {
    type: TERNARYOFF,

  }
}

export function setPosts(posts) {
  return {
    type: SETPOSTS,
    payload: posts
  }
}

export function setPostsDB(posts) {
  return {
    type: SETPOSTSDB,
    payload: posts
  }
}

export function setShowedPosts(posts) {
  return {
    type: SETSHOWEDPOSTS,
    payload: posts
  }
}

export function getPosts() {
  return async function (dispatch) {
    dispatch(loadingON())
    const res = await axios.get('http://localhost:3001/videogames')
    const unificator = [...res.data[0], ...res.data[1]]
    dispatch(setPosts(unificator))
    dispatch(setShowedPosts(unificator))
    dispatch(setPostsDB(res.data[0]))


  }
}
