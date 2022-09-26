import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { getNameVideogames, resetPage } from "../../actions"
import "./searchBar.css"

export default function SearchBar () {
    const dispatch = useDispatch();
    const [ name, setName ] = useState("")

    function handleInput(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(resetPage())
        dispatch(getNameVideogames(name))
        setName("")
    }

    return (
        <div>
            <input
            className="input_bar"
            type="text"
            placeholder="Search Game..."
            onChange={(e) => handleInput(e)}
            />
            <button className="btn_bar" type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}