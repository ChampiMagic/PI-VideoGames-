import {React, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import "./body.css";
import Post from '../Post/post.jsx';
import Pagination from '../pagination/pagination.jsx';





export default function Body( {posts, currentPosts, loading, postsPerPage, paginate} ) {


  return (
    <div className="body">
      <Post posts={currentPosts} loading={loading} />
      {posts.length? (<Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>) : null}
    </div>
  );

}
