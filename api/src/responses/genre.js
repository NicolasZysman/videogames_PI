const axios = require('axios');
const {API_KEY} = process.env;
const { Videogame, Genre } = require('../db');

async function getGenres(req, res){
    //Busco los generos de la api
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const genres = genresApi.data.results.map(g => g.name)
    // console.log(genres)
    //Trae los generos 1 por 1
    // const eachGenre = genres.map(g => {
    //     for (let i=0; i < g.length; i++) return g[i]
    // })
    //Las crea en la db, findorcreate para no tener repetidos
    genres.forEach(g => {
        Genre.findOrCreate({
            where: {name: g}
        })
    })
    //La enviamos desde la base de datos
    const allGenres = await Genre.findAll();
    res.send(allGenres)
}

module.exports = { getGenres };