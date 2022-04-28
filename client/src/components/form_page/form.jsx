import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import s from './form.module.css';

export function validator(input) {
  let error = {};

    if(!input.name){
      error.name = "name is required";
    } else if (!/^[\w -]+$/.test(input.name)){
      error.name = "name is invalid";
    }

    if(!input.description){
      error.description = "description is required";
    } else if (!/^[\w .?%,_ -¿!¡"]+$/.test(input.description)){
      error.description = "description is invalid";
    }

    if(!input.release){
      error.release = "release is required";
    }

    if(!input.rating){
      error.rating = "rating is required";
    }

    if(!input.platforms){
      error.platforms = "platform is required";
    }

    if(!input.genres){
      error.genres = "genre is required";
    }


  return error;
}


export default function Form() {

  const [input, setInput] = useState({
    name: "",
    description: "",
    release: "",
    rating: "",
    platforms: "",
    genres: "",
  })

  const [error, setError] = useState({});

  const [submitAllow, setSubmitAllow] = useState(false);

  function workOnChange(e) {
console.log(e.target.name)

      setInput({
        ...input,
        [e.target.name]: e.target.value
      })
      setError(validator({
        ...input,
        [e.target.name]: e.target.value
      }))



  }

  /*function checkbox(e) {

  }*/

  const handleSubmit = async (e) => {

    let platforms = "";
    let genres = []
    for(let i = 7; i < 27; i++){
      if(e.target[i].checked){
        genres.push(e.target[i].value)
      }
    }

    for(let i=4; i < 7; i++){
        if(e.target[i].checked){
          if(!platforms){
            platforms = platforms + e.target[i].value;
          } else {platforms = platforms + ", " + e.target[i].value;}

        }
    }

    if(!genres.length) {  setError( {...error, genres: "genre is required" } )}
    if(!platforms.length) {  setError( {...error, platforms: "platform is required" } )}

    if(!platforms || !genres.length || !(Object.keys(error).length === 0)){
      e.preventDefault();
      console.log("faltan datos")
    } else {
      await axios.post("http://localhost:3001/videogame", {
        name: e.target[0].value,
        description: e.target[1].value,
        released: e.target[2].value,
        rating: e.target[3].value,
        platforms: platforms,
        genres: genres,
      })
    console.log("submiteado")

    }
  }





  return(

    <div className={s.form_container}>
      <Link to="/home" className={s.comeBack}>
        <button className={s.comeBack_Bottom}>Volver</button>
      </Link>
      <form  className={s.form} onSubmit={handleSubmit}>
        <div className={s.input_container}>
          <label>Nombre</label>
          <input type="text"
                name="name"
                value={input.name}
                onChange={workOnChange}
                className={error.name && s.error}

          ></input>
          {error.name && <label className={s.error_label} >{error.name}</label>}
        </div>

        <div className={s.input_container}>
          <label>Descripcion</label>
          <input type="text"
                name="description"
                value={input.description}
                onChange={workOnChange}
                className={error.description && s.error}

           ></input>
           {error.description && <label className={s.error_label}>{error.description}</label>}
        </div>

        <div className={s.input_container}>
          <label>Fecha de lanzamiento</label>
          <input type="date"
                name="release"
                value={input.release}
                onChange={workOnChange}
                className={error.release && s.error}

           ></input>
           {error.release && <label className={s.error_label}>{error.release}</label>}
        </div>

        <div className={s.input_container}>
          <label>Rating</label>
          <div className={s.rating_container}>
          <div className={s.print_rating}><p>0</p><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p></div>
          <input type="range" min="0" max="5" step="1"
                name="rating"
                value={input.rating}
                onChange={workOnChange}
                className={error.rating && s.error}

          ></input>
          </div>
          {error.rating && <label className={s.error_label}>{error.rating}</label>}
        </div>

        <div className={s.input_container}>
          <label>Plataformas</label>
        <div className={s.platforms}>
          <div>
            <label>PS4</label>
            <input type="checkbox"
                  name="platforms"
                  value="PS4"
                  onChange={workOnChange}
            ></input>
          </div>

          <div>
            <label>Xbox</label>
            <input type="checkbox"
                  name="platforms"
                  value="Xbox"
                  onChange={workOnChange}
            ></input>
          </div>

          <div>
            <label>PC</label>
            <input type="checkbox"
                  name="platforms"
                  value="PC"
                  onChange={workOnChange}
            ></input>
          </div>

          </div>
          {error.platforms && <label className={s.error_label}>{error.platforms}</label>}
        </div>

        <div className={s.input_container}>
          <label>Generos</label>
          <div className={s.genres}>

          <div>
            <label>Accion</label>
            <input type="checkbox"
                  name="genres"
                  value="Action"
                  onChange={workOnChange}
            ></input>
          </div>

          <div>
            <label>RPG</label>
            <input type="checkbox"
                  name="genres"
                  value="RPG"
                  onChange={workOnChange}
            ></input>
          </div>

          <div>
            <label>Aventura</label>
            <input type="checkbox"
                  name="genres"
                  value="Adventure"
                  onChange={workOnChange}
            ></input>
          </div>

          <div>
            <label>Indie</label>
            <input type="checkbox"
                  name="genres"
                  value="Indie"
                  onChange={workOnChange}
            ></input>
          </div>

          <div>
            <label>Estrategia</label>
            <input type="checkbox"
                  name="genres"
                  value="Strategy"
                  onChange={workOnChange}
            ></input>
          </div>

          <div>
            <label>Shooter</label>
            <input type="checkbox"
                  name="genres"
                  value="Shooter"
                  onChange={workOnChange}
            ></input>
          </div>

          <div>
            <label>Casual</label>
            <input type="checkbox"
                  name="genres"
                  value="Casual"
                  onChange={workOnChange}
            ></input>
          </div>

          <div>
            <label>Simulador</label>
            <input type="checkbox"
                  name="genres"
                  value="Simulation"
                  onChange={workOnChange}
            ></input>
          </div>

          <div>
            <label>Puzzle</label>
            <input type="checkbox"
                  name="genres"
                  value="Puzzle"
                  onChange={workOnChange}
            ></input>
          </div>

          <div>
            <label>Arcade</label>
            <input type="checkbox"
                  name="genres"
                  value="Arcade"
                  onChange={workOnChange}
            ></input>
          </div>

          <div>
            <label>Plataformas</label>
            <input type="checkbox"
                  name="genres"
                  value="Platformer"
                  onChange={workOnChange}
            ></input>
          </div>

          <div>
            <label>Carreras</label>
            <input type="checkbox"
                  name="genres"
                  value="Racing"
                  onChange={workOnChange}
            ></input>
          </div>

          <div>
            <label>Multijugador Masivo</label>
            <input type="checkbox"
                  name="genres"
                  value="Massively Multiplayer"
                  onChange={workOnChange}
            ></input>
          </div>

          <div>
            <label>Deportes</label>
            <input type="checkbox"
                  name="genres"
                  value="Sports"
                  onChange={workOnChange}
            ></input>
          </div>

          <div>
            <label>Pelea</label>
            <input type="checkbox"
                  name="genres"
                  value="Fighting"
                  onChange={workOnChange}
            ></input>
          </div>

          <div>
            <label>Familiar</label>
            <input type="checkbox"
                  name="genres"
                  value="Family"
                  onChange={workOnChange}
            ></input>
          </div>

          <div>
            <label>Juegos de mesa</label>
            <input type="checkbox"
                  name="genres"
                  value="Board Games"
                  onChange={workOnChange}
            ></input>
          </div>

          <div>
            <label>Educativos</label>
            <input type="checkbox"
                  name="genres"
                  value="Educational"
                  onChange={workOnChange}
            ></input>
          </div>

          <div>
            <label>Cartas</label>
            <input type="checkbox"
                  name="genres"
                  value="Card"
                  onChange={workOnChange}
            ></input>
          </div>

          </div>
          {error.genres && <label className={s.error_label_genre}>{error.genres}</label>}
        </div>

        <div className={s.input_container}><input type="submit" ></input></div>
      </form>
    </div>
  )
}
