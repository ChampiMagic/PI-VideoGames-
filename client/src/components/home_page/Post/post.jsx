import React from 'react';
import { Link } from "react-router-dom";
import "./post.css";


export default function Post({posts, loading}) {

  if(loading){
    return(
      <>
        <h2>Loading...</h2>
      </>
    )
  }
  
  return(
    <>
      <div className="post_generator">
        {posts.map(post => (
          <div className="post_container" key={post.id}>
            <Link to={`/home/${post.id}`}>
              <figure>
                <img src={post.background_image} alt={post.title} />
                <div className="capa">
                  <h1>{post.name}</h1>
                  <div className="genres_container"><b>Genres:</b> {post.genres.map(genre => (<p key={genre.id}>{genre.name}</p>))}</div>
                </div>
              </figure>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
