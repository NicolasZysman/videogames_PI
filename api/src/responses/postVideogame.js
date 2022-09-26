const { Videogame, Genre } = require("../db");

async function postVideogame(req, res){
    
    try{
        let {  
            name, 
            description, 
            released, 
            rating, 
            platforms, 
            createdInDB,
            genre,
            img 
        } = req.body

        
        let videogameCreated = await Videogame.create({
            name, 
            description,
            released, 
            rating, 
            platforms, 
            createdInDB,
            img
        })


        for (let i = 0; i < genre.length; i++) {
            let genreDb = await Genre.findOne({
                where: { name: genre[i] }
                
            })
            videogameCreated.addGenre(genreDb)
        }
        res.send('Videojuego creado con exito!')
    } catch(error){
        console.log(error)
        res.status(404).send(error)
    }
    
}

module.exports = { postVideogame }