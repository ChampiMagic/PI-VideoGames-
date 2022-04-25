import {React, useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Body from './body/body.jsx';
import Nav from './Nav/nav.jsx'


export default function Home() {

  const [searchValue, setSearchValue] = useState();
  const [indexAlfa, setIndexAlfa] = useState(false);
  const [showedPosts, setShowedPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [dbPosts, setdbPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);

 useEffect(() => {
   const fetchPosts = async () => {
     setLoading(true);
     const res = await axios.get('http://localhost:3001/videogames');
     const unificator = [...res.data[0], ...res.data[1]];
     setPosts(unificator);
     setShowedPosts(unificator);
     setdbPosts(res.data[0])
     setLoading(false);
   }

   fetchPosts();
 }, []);

//GET currents posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = showedPosts.slice(indexOfFirstPost, indexOfLastPost);

//Change page
const paginate = (pageNumber) => setCurrentPage(pageNumber);

//"Creados" y "Todos" Filter
const callDb = () => {
  setCurrentPage(1)
  setShowedPosts(dbPosts)

};
const callAll = () => {

  setCurrentPage(1)
  setShowedPosts(posts)

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
    setShowedPosts(newShowedPosts);
  } 

}

//"Alfabetico" y "rating" Order
const callAlfa = (boolean) => {

  setIndexAlfa(boolean);

  let temporal = showedPosts;

    if(boolean){
      temporal.sort((a, b) => {
        let aT = a.name.toLowerCase();
        let bT = b.name.toLowerCase();

        if(aT < bT) {
          return -1;
        } else if (aT > bT) {
          return 1;
        } else { return 0 }

      } )
    } else if(!boolean){
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


  setShowedPosts(temporal);

}

const callRating = (boolean) => {

  setIndexAlfa(boolean);

  let temporal = showedPosts;

    if(boolean){
      temporal.sort((a, b) => {

        return a.rating - b.rating;
      } )
    } else if(!boolean){
      temporal.sort((a, b) => {
      return b.rating - a.rating;

      } )
    }


  setShowedPosts(temporal);

}

//"Seach" function
const handleSubmit = async (event) => {
  event.preventDefault();
 let value = event.target["0"].value;
 const res = await axios.get(`http://localhost:3001/videogames/?name=${value}`);
   const unificador = [...res.data[0], ...res.data[1]];
   console.log(unificador);
   setShowedPosts(unificador);
}


  return (
    <div>
      <Nav callDb={callDb} callAll={callAll} callAlfa={callAlfa} indexAlfa={indexAlfa} callRating={callRating} callByGenre={callByGenre} handleSubmit={handleSubmit}/>
      <Body posts={showedPosts} currentPosts={currentPosts} loading={loading} postsPerPage={postsPerPage} paginate={paginate}/>
    </div>
  )
}
