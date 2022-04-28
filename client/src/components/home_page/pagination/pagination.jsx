import React from 'react';
import s from './pagination.module.css'


export default function Pagination({ postsPerPage, totalPosts, paginate, page}) {

  const pageNumbers = [];

  const changer = (directioner) => {
    if(directioner) {
      if(page < pageNumbers.length) {
        paginate(page + 1)
      } 
    } else {
      if(page > 1){
        paginate(page - 1)
      }
    }
  }

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return(
    <>
      <div className={s.pagination_container}>
      <button className={s.prev_button} onClick={() => changer(false)}>Prev</button>
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
        <button className={s.next_button} onClick={() => changer(true)}>Next</button>
      </div>
    </>
  )
}
