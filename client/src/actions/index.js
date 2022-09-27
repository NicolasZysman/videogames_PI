import axios from "axios";

export function getVideogames(){
    return async function(dispatch){
        var json = await axios.get("/videogames");
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })
    }
}


export function getGenres() {
    return async function(dispatch){
        var json = await axios.get("/genres");
        return dispatch({
            type: 'GET_GENRES',
            payload: json.data
        })
    } 
}

export function getPlatforms() {
    return async function(dispatch){
        var json = await axios.get("/platforms")
        return dispatch({
            type: 'GET_PLATFORMS',
            payload: json.data
        })
    }
}

export function postVideogame(payload) {
    return async function(dispatch){
        var json = await axios.post("/videogame", payload);
        return dispatch({
            type: 'POST_VIDEOGAME',
            payload: json.data
        })
    }
}

export function getNameVideogames(name){
    return async function (dispatch) {
        try {
            var json = await axios.get(`/videogames?name=${name}`)
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
            var json = await axios.get(`/videogames/${id}`)
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


