const axios = require('axios');
const { Videogame, Genre } = require('../db')
const {API_KEY} = process.env;


const getApiInfo = async () => {

    const games = []

    for (let i = 1; i <= 5; i++) {
        const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
        apiUrl.data.results.map(v => {
            games.push(
                {
                    name: v.name,
                    released: v.released,
                    rating: v.rating,
                    id: v.id,
                    platforms: v.platforms.map((v) => v.platform.name),
                    img: v.background_image,
                    genres: v.genres.map((v) => v.name)
                }
            ) 
        })
    }
    // console.log(games)
    return games;
}

const getDbInfo = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            throught: {
                attributes: [],
            }
        }
    })
}




const getAllVideogames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const info = apiInfo.concat(dbInfo);
    return info;
}

async function getVideogames(req,res){
    try{
        const name = req.query.name
        let totalVideogames = await getAllVideogames();
        if (name){
            let videogameName = await totalVideogames.filter(v => v.name.toLowerCase().includes(name.toLowerCase()))
            videogameName.length ? res.status(200).send(videogameName) :
            res.status(404).send('No existe el videojuego ingresado');
        } else {
            res.status(200).send(totalVideogames)
        }
    } catch(error){
        res.status(404).send(error)
    }
    
}

module.exports = {
    getVideogames
};