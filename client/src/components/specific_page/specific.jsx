import {React, useState, useEffect} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import './specific.css';

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
}, [])


if(loading){
  return (
    <h1>Loading...</h1>
  )
}
  let description = game.description

console.log(game.released)
  return(
    <div className='card_body'>
      <div className="card_container">
        <h1>{game.name}</h1>
        <h3>Rating: {game.rating}</h3>
        <h4>Released: {game.released}</h4>
        <p><b>Description:</b> {description} </p>
        <div className="card_platforms">Plataformas: {id.id.length < 15? game.platforms.map( (platform) => (<p key={platform.platform.id}>{platform.platform.name},</p>) ) : <p key={id}>{game.platforms}</p>}</div>
        <div className="card_genres">Generos: {game.genres.map( (genre) => (<p key={genre.name}>{genre.name},</p>) )}</div>
        <div className="card_img"><img src={game.background_image} alt={game.name}/></div>
      </div>
    </div>
  )
}
