const axios = require('axios');
const { Videogame, Platform, Genre } = require('../db')
const {API_KEY} = process.env;

async function getPlatforms(req, res){
    try{
        const apiURL = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
        const apiInfo = await apiURL.data.results.map(p => p.name)
        apiInfo.forEach( p => {
            Platform.findOrCreate({
                where : {
                    name: p
                }
            })
        });
        const allPlatf = await Platform.findAll();
        res.status(200).send(allPlatf)
    } catch(error){
        res.status(404).send(error)
    }
    
}

module.exports = { getPlatforms }