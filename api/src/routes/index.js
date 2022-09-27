const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();
const { getVideogames } = require('../responses/getVgInfo')
const { getGenres } = require('../responses/genre');
const { videogamesByID } = require('../responses/idVideogames');
const { postVideogame } = require('../responses/postVideogame');
const { getPlatforms } = require('../responses/platforms')


router.get('/videogames', getVideogames);
router.get('/genres', getGenres);
router.get('/platforms', getPlatforms);
router.get('/videogames/:id', videogamesByID);
router.post('/videogame', postVideogame);

module.exports = router;
