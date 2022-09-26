import axios from "axios";

export function getVideogames(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/videogames");
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })
    }
}


export function getGenres() {
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/genres");
        return dispatch({
            type: 'GET_GENRES',
            payload: json.data
        })
    } 
}

export function getPlatforms() {
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/platforms")
        return dispatch({
            type: 'GET_PLATFORMS',
            payload: json.data
        })
    }
}

export function postVideogame(payload) {
    return async function(dispatch){
        var json = await axios.post("http://localhost:3001/videogame", payload);
        return dispatch({
            type: 'POST_VIDEOGAME',
            payload: json.data
        })
    }
}

// export default getVideogamesDb (){

// }

export function getNameVideogames(name){
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch ({
                type: 'GET_NAME_VIDEOGAMES',
                payload: json.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function getDetail(id){
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/videogames/${id}`)
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function clearDetail(){
    return {
        type: 'CLEAR_DETAIL',
    }
}

// export function setIsLoading(){
//     return ({
//         type: 'IS_LOADING',
//         payload: true
//     })
// }

export function filterByRating(payload) {
    return {
        type: 'FILTER_BY_RATING',
        payload
    }
}

export function filterByAbc(payload) {
    return {
        type: 'FILTER_BY_ABC',
        payload
    }
}

export function filterGames(payload) {
    return {
        type: 'FILTER_GAMES',
        payload
    }
}

export function resetPage() {
    return {
        type: 'RESET_PAGE',
        payload: 1
    }
}


