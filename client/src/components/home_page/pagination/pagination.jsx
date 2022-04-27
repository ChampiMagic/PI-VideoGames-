import React from 'react';
import s from './pagination.module.css'


export default function Pagination({ postsPerPage, totalPosts, paginate}) {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return(
    <>
      <div className={s.pagination_container}>
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </div>
    </>
  )
}
