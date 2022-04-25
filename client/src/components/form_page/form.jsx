import React, {useState} from 'react';
import axios from 'axios';
import './form.css';

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


      setInput({
        ...input,
        [e.target.name]: e.target.value
      })
      setError(validator({
        ...input,
        [e.target.name]: e.target.value
      }))



  }

  function checkbox(e) {

  }

  const handleSubmit = async (e) => {

    let platforms = "";
    let genres = []
    for(let i = 7; i < 10; i++){
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

    if(!platforms || !genres.length || !(Object.keys(error).length === 0)){
      e.preventDefault();
      console.log("faltan datos")
      console.log(platforms)
      console.log(genres)
    } else {
      const res = await axios.post("http://localhost:3001/videogame", {
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
    <div className="form_container">
      <form  className="form" onSubmit={handleSubmit}>
        <div className="input_container">
          <label>Nombre</label>
          <input type="text"
                name="name"
                value={input.name}
                onChange={workOnChange}
                className={error.name && "error"}

          ></input>
          {error.name && <label className="error_label" >{error.name}</label>}
        </div>

        <div className="input_container">
          <label>Descripcion</label>
          <input type="text"
                name="description"
                value={input.description}
                onChange={workOnChange}
                className={error.description && "error"}

           ></input>
           {error.description && <label className="error_label">{error.description}</label>}
        </div>

        <div className="input_container">
          <label>Fecha de lanzamiento</label>
          <input type="date"
                name="release"
                value={input.release}
                onChange={workOnChange}
                className={error.release && "error"}

           ></input>
           {error.release && <label className="error_label">{error.release}</label>}
        </div>

        <div className="input_container">
          <label>Rating</label>
          <input type="range" min="0" max="5" step="1"
                name="rating"
                value={input.rating}
                onChange={workOnChange}
                className={error.rating && "error"}

          ></input>
          {error.rating && <label className="error_label">{error.rating}</label>}
        </div>

        <div className="input_container">
          <label>Plataformas</label>
        <div className="platforms">
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
          {error.platforms && <label className="error_label">{error.platforms}</label>}
        </div>

        <div className="input_container ">
          <label>Generos</label>
          <div className="genres">

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

          </div>
          {error.genres && <label className="error_label">{error.genres}</label>}
        </div>

        <div className="input_container"><input type="submit" ></input></div>
      </form>
    </div>
  )
}
