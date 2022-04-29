import React from 'react';
import { Link } from "react-router-dom";
import s from "./post.module.css";


export default function Post({posts, loading}) {

  if(loading){
    return(
      <div className={s.loading_container}>
        <h2 className={s.loading}>Loading...</h2>
      </div>
    )
  }

  return(
    <>
      <div className={s.post_generator}>
        {posts.map(post => (
          <div className={s.post_container} key={post.id}>
            <Link to={`/home/${post.id}`}>
              <figure>
                <img src={post.background_image} alt={post.title} />
                <div className={s.capa}>
                  <h1>{post.name}</h1>
                  <div className={s.genres_container}><b>Genres:</b> {post.genres.map(genre => (<p key={genre.id}>{genre.name}</p>))}</div>
                </div>
              </figure>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
