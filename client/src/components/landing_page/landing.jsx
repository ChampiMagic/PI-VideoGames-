import React from 'react';
import { Link } from "react-router-dom";
import s from './landing.module.css';


export default function Landing() {


  return (
    <div className={s.container}>
    <Link to="/home" className={s.button_container}>
      <button className={s.button}>WELCOME</button>
    </Link>
    </div>
  )

}
