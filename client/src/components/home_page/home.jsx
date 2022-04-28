import {React, useState, useEffect} from 'react';
import axios from 'axios';
import Body from './body/body.jsx';
import Nav from './Nav/nav.jsx'
import { connect, useDispatch, useSelector } from 'react-redux';
import {getPosts, setShowedPosts } from '../../actions/index.js';




export default function Home() {

const dispatch = useDispatch()
const posts = useSelector(state => state.posts)
const postsDB = useSelector(state => state.postsDB)
const showedPosts = useSelector(state => state.showedPosts)


  const [refresh, setRefresh] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);

  const reRender = () => {
    refresh? setRefresh(false) : setRefresh(true);
  }

 useEffect(() => {


   dispatch(getPosts())



 }, [dispatch]);




//GET currents posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = showedPosts.slice(indexOfFirstPost, indexOfLastPost);

//Change page
const paginate = (pageNumber) => {
  setCurrentPage(pageNumber)
  window.scrollTo(100, 100);
};

//"Creados" y "Todos" Filter
const callDb = () => {
  setCurrentPage(1)
  dispatch(setShowedPosts(postsDB))

};
const callAll = () => {

  setCurrentPage(1)
  dispatch(setShowedPosts(posts))

};

//"ByGenres" Filter
const callByGenre = (genres) => {
  setCurrentPage(1)
  let temporal2 = showedPosts;


  let newShowedPosts = [];
  for(let post of temporal2){
    for (let postGenres of post.genres) {
      if(postGenres.name === genres) {
        newShowedPosts.push(post)
      }
    }
  }
  if(newShowedPosts.length){
    dispatch(setShowedPosts(newShowedPosts));
  }

}

//"Alfabetico" y "rating" Order
const callAlfa = (ternary) => {



  let temporal = showedPosts;

    if(ternary){
      temporal.sort((a, b) => {
        let aT = a.name.toLowerCase();
        let bT = b.name.toLowerCase();

        if(aT < bT) {
          return -1;
        } else if (aT > bT) {
          return 1;
        } else { return 0 }

      } )
    } else if(!ternary){
      temporal.sort((a, b) => {
        let aT = a.name.toLowerCase();
        let bT = b.name.toLowerCase();

        if(aT > bT) {
          return -1;
        } else if (aT < bT) {
          return 1;
        } else { return 0 }

      } )
    }


  dispatch(setShowedPosts(temporal));
  reRender()

}

const callRating = (ternary) => {



  let temporal = showedPosts;

    if(ternary){
      temporal.sort((a, b) => {

        return a.rating - b.rating;
      } )
    } else if(!ternary){
      temporal.sort((a, b) => {
      return b.rating - a.rating;

      } )
    }


  dispatch(setShowedPosts(temporal));
  reRender()

}

//"Seach" function
const handleSubmit = async (event) => {
  event.preventDefault();
  setCurrentPage(1)
 let value = event.target["0"].value;
 const res = await axios.get(`http://localhost:3001/videogames/?name=${value}`);
   const unificador = [...res.data[0], ...res.data[1]];
   console.log(unificador);
   dispatch(setShowedPosts(unificador));
}


  return (
    <div>
      <Nav callDb={callDb} callAll={callAll} callAlfa={callAlfa}  callRating={callRating} callByGenre={callByGenre} handleSubmit={handleSubmit}/>
      <Body posts={showedPosts} currentPosts={currentPosts}  postsPerPage={postsPerPage} paginate={paginate} page={currentPage}/>
    </div>
  )
}
