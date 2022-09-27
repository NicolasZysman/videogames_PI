
const initialState = {
    videogames : [],
    allVideogames: [],
    createdInDb: [],
    genres: [],
    platforms: [],
    detail: [],
    currentPage: 1
}

function rootReducer(state = initialState, action) {
    switch(action.type) {
        
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }


        case 'GET_NAME_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload
            }

        case 'GET_DETAIL':
            return{
                ...state,
                detail: action.payload
            }

        case 'CLEAR_DETAIL':
            return{
                ...state,
                detail: []
            }
        
        case 'FILTER_BY_ABC':
            let abcSort = action.payload === 'Z-A' ?
            state.videogames.sort(function (a,b) {
                if (a.name > b.name) return -1;
                if (b.name > a.name) return 1;
                return 0;
            }) :
            state.videogames.sort(function (a,b) {
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0;
            })
            return{
                ...state,
                videogames: abcSort
            }

        case 'FILTER_BY_RATING':
            let ratingSort = action.payload === 'asc' ?
            state.videogames.sort(function (a,b) {
                if (a.rating > b.rating) return 1;
                if (a.rating < b.rating) return -1;
                return 0;
            }) :
            state.videogames.sort(function (a,b) {
                if (a.rating > b.rating) return -1;
                if (a.rating < b.rating) return 1;
                return 0;
            })
            return{
                ...state,
                videogames: ratingSort
            }

         case 'FILTER_GAMES':
            const filterGames = 
            action.payload === "created" 
            ? state.allVideogames.filter(e => e.createdInDB) 
            : state.allVideogames.filter(e => !e.createdInDB)
            return{
                ...state,
                videogames: action.payload === 'All' 
                ? state.allVideogames 
                : filterGames
            }

        case 'POST_VIDEOGAME':
            return{
                ...state
            }

        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload
            }

        case 'GET_PLATFORMS':
            return{
                ...state,
                platforms: action.payload
            }


        case 'RESET_PAGE':
            return{
                ...state,
                currentPage: action.payload
            }

        default:
            return state
        
    }
}

export default rootReducer;