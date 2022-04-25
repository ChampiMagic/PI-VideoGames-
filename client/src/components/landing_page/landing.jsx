import React from 'react';
import { Link } from "react-router-dom";
import './landing.css';


export default function Landing() {


  return (
    <div className='container'>
    <Link to="/home" className="button-container">
      <button className='button'>WELCOME</button>
    </Link>
    </div>
  )

}
