const axios = require('axios');
const { Videogame, Genre } = require('../db')
const {API_KEY} = process.env;

const getApiIdInfo = async (id) => {
    try{
        const apiUrl = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        const apiInfo =  [{
                name: apiUrl.data.name,
                released: apiUrl.data.released,
                rating: apiUrl.data.rating,
                id: apiUrl.data.id,
                description: apiUrl.data.description_raw,
                platforms: apiUrl.data.platforms.map(v => v.platform.name),
                genres: apiUrl.data.genres.map(g => g.name),
                img: apiUrl.data.background_image
        }]
        return apiInfo;
    }catch(err){
        console.log(err)
    }
    
}

const getDbIdInfo = async (id) => {
    return await Videogame.findAll({
        where: {
            id: id
        },
        include: {
            model: Genre,
            attributes: ['name'],
            throught: {
                attributes: [],
            }
        }
        
    })
}

// const getAllVideogamesById = async () => {
//     const apiIdInfo = await getApiIdInfo();
//     const dbIdInfo = await getDbIdInfo();
//     const info = apiIdInfo.concat(dbIdInfo);
//     return info;
// }

async function videogamesByID(req, res){
    const { id } = req.params;
    if (isNaN(id)){
        console.log("Pepe")
        const dbGame = await getDbIdInfo(id)
        if (dbGame){
            let gameDb = await dbGame.filter((e) => e.id.toString() === id.toString())
            res.status(200).send(gameDb)
        }
    } else{
        const idGame = await getApiIdInfo(id)
        if (idGame){
            let gameId = await idGame.filter((e) => e.id.toString() === id.toString())
            if(gameId.length > 0)res.status(200).send(gameId)
        }
    }
    // if (idGame || dbGame === undefined){
    //     res.status(404).json({message: "No encontre el juego"})
    // }
}

module.exports = { videogamesByID }