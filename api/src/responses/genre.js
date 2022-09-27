const axios = require('axios');
const {API_KEY} = process.env;
const { Videogame, Genre } = require('../db');

async function getGenres(req, res){
    try{
        //Busco los generos de la api
        const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        const genres = genresApi.data.results.map(g => g.name)
        //Trae los generos 1 por 1

        //Las crea en la db, findOrCreate para no tener repetidos
        genres.forEach(g => {
            Genre.findOrCreate({
                where: {name: g}
            })
        })
        //La enviamos desde la base de datos
        const allGenres = await Genre.findAll();
        res.send(allGenres)
    } catch(error){
        res.status(404).send(error)
    }
    
}

module.exports = { getGenres };