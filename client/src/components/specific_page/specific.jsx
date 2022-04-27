import {React, useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import s from './specific.module.css';

export default function Specific() {

    const [game, setGame] = useState();
    const [loading, setLoading] = useState(true);

let id = useParams()
console.log(id.id)


useEffect(() => {
  const axiosPost = async (id) => {
    setLoading(true)
    const res = await axios.get(`http://localhost:3001/videogame/${id.id}`);

    setGame(res.data);
    setLoading(false)
  }

  axiosPost(id);
}, [id])


if(loading){
  return (
    <h1 className={s.loading}>Loading...</h1>
  )
}
  let description = game.description

console.log(game.released)
  return(
    <div className={s.card_body}>
    <Link to="/home" className={s.comeBack}>
      <bottom className={s.comeBack_Bottom}>Volver</bottom>
    </Link>
      <div className={s.card_container}>
        <h1>{game.name}</h1>
        <h3>Rating: {game.rating}</h3>
        <h4>Released: {game.released}</h4>
        <p><b>Description:</b> {description} </p>
        <div className={s.card_platforms}>Plataformas: {id.id.length < 15? game.platforms.map( (platform) => (<p key={platform.platform.id}>{platform.platform.name},</p>) ) : <p key={id}>{game.platforms}</p>}</div>
        <div className={s.card_genres}>Generos: {game.genres.map( (genre) => (<p key={genre.name}>{genre.name},</p>) )}</div>
        <div className={s.card_img}><img src={game.background_image} alt={game.name}/></div>
      </div>
    </div>
  )
}
