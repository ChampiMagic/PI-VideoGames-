const { Router } = require('express');
const fetch =  require('cross-fetch');
const { conn, Genre, Videogame } = require('../db.js');
//const fetch = require('fetch')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

async function DB() {
  return await Videogame.findAll({
    include: Genre,
  })
}
async function API() {
  const result = await fetch(`https://api.rawg.io/api/games?key=38b50206c79a4b3aaa3aa94762fa6e6a&page_size=100`)
  const json = await result.json();
 let games = [];
 for(const element of json.results){
   let {id, name, released, rating, platforms, genres, background_image} = element;
   games.push({id, name, released, rating, platforms, genres, background_image})
 }
 return games;
}

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames',  async (req, res) => {
 const { name } = req.query;


 const results = await Promise.all([DB(), API()]);

 let bdGames = [];
 for(const element of results[0]){
   let {id, name, genres, background_image, rating} = element;
   bdGames.push({id, name, genres, background_image, rating})
 }


  if(name) {
    try {

      let db = bdGames.filter(e => e.name.includes(name))
      let filter = db.slice(0, 15);
      let filterAPI = [];

      if(!(filter.length > 14)) {
        const result = await fetch(`https://api.rawg.io/api/games?key=38b50206c79a4b3aaa3aa94762fa6e6a&page_size=${15 - filter.length}&search=${name}`)
        const json = await result.json();

        for(const element of json.results){
          let {id, name, genres, background_image, rating} = element;
          filterAPI.push({id, name, genres, background_image, rating})
        }
      }


      if(!filter.length && !filterAPI.length) {

        res.status(404).send('No se encontro ningun titulo que coincida con la busqueda')
      } else {
        res.status(200).json([filter, filterAPI])
      }



    } catch (err) {
      res.send(err);
    }

  } else {

    let apiGames = [];

    for(const element of results[1]){
      let {id, name, genres, background_image, rating} = element;
      apiGames.push({id, name, genres, background_image, rating})
    }
    res.status(200).json([bdGames, apiGames])

  }

})

router.get('/videogame/:idVideogame', async (req, res) => {
  const id = req.params.idVideogame;


    const results = await Promise.all([DB(), API()]);
    const filterBD = results[0].find(e => e.id == id)
    /*const filterAPI = results[1].find(e => e.id === parseInt(id))
    if(filterAPI){
      const {name, released, rating, platforms, genres, background_image} = filterAPI;
    }*/ //no va a funcionar porque no me trae la descripcion si no lo llamo por el id
    const result = await fetch(`https://api.rawg.io/api/games/${id}?key=38b50206c79a4b3aaa3aa94762fa6e6a`)
    let json = await result.json();
    let {name, released, rating, platforms, genres, background_image, description} = json;

    res.json(filterBD || {name, released, rating, platforms, genres, background_image, description})


})

router.get('/genres', async (req, res) => {
  const genres = await Genre.findAll();
  if(genres.length) {
    res.json(genres)
  } else {
    try {
      fetch('https://api.rawg.io/api/genres?key=38b50206c79a4b3aaa3aa94762fa6e6a')
      .then(data => data.json())
      .then( json => {

        json.results.forEach( e => {
        Genre.create({
            id: e.id,
            name: e.name,
          })
        })

        res.json(json.results);

      })
    } catch(err){
      res.send(err);
    }
  }



})

router.post('/videogame', async (req, res) => {
  const { name, description, released, rating, platforms, genres, img_url} = req.body;

   await fetch("http://localhost:3001/genres")

  const genresBD = await Genre.findAll();
  let genresArr = [];


    for(const element of genres){
      let temporal = [];
      for(const element2 of genresBD){
        if(element2.name === element){
          temporal.push(element2);
          break;
        }
      }
      genresArr.push(temporal[0])

    }



  try {
    const juego = await Videogame.create({

      name: name,
      description: description,
      released: released,
      rating: rating,
      platforms: platforms,
      img_url: img_url,

    })

    juego.addGenres(genresArr)

    res.status(201).send("Juego creado")

  } catch(err) {
    res.send(err)
  }

})












module.exports = router;
