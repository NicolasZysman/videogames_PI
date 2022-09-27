import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { filterByAbc, filterByRating, getVideogames, filterGames } from "../../actions"
import { Link } from "react-router-dom"
import Card from "../Card/Card";
import "./home.css"
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";

export default function Home () {

    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.videogames)
    const [ order, setOrder ] = useState("")
    const [ paginaActual, setPaginaActual ] = useState(1)
    const [ vgPorPagina, setPgPorPagina ] = useState(15)
    const indexLast = paginaActual * vgPorPagina
    const indexFirst = indexLast - vgPorPagina
    const vgPaginaActual = allVideogames.slice(indexFirst, indexLast)

    function handleSortNames (e) {
        e.preventDefault();
        dispatch(filterByAbc(e.target.value))
        setPaginaActual(1)
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleSortRatings (e) {
        e.preventDefault();
        dispatch(filterByRating(e.target.value))
        setPaginaActual(1)
        setOrder(`Ordenado ${e.target.value}`)
    }

    const paginado = (numPagina) => {
        setPaginaActual(numPagina)
    }

    useEffect (() => {
        dispatch(getVideogames())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
        setPaginaActual(1)
    }
    function handleFilterGames(e){
        e.preventDefault()
        dispatch(filterGames(e.target.value))
    }

    return (
        <div className="home">
            
            <button className="btn_0" onClick={e => {handleClick(e)}}></button>

            <SearchBar className="searchBar"/>
            
            <div className="filters">

                <select className="btn_1" onChange={ e => handleSortNames(e)}>
                    <option value="" disabled selected>By Name</option>
                    <option value='A-Z'>A-Z</option>
                    <option value='Z-A'>Z-A</option>
                </select>

                <select className="btn_2" onChange={ e => handleSortRatings(e)}>
                    <option value="" disabled selected>By Rating</option>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                
                <select className="btn_3" onChange={ e => handleFilterGames(e)}>
                    <option value="" disabled selected>Filter Games</option>
                    <option value='all'>All Videogames</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Por Api</option>
                </select>
            
            </div>

            

                
            <div className="cards_grid">
                {
                    vgPaginaActual?.map((v, id) => {
                        return(
                            <div className="cards" >
                                <Link key={id} to={ `/videogames/${v.id}`}>
                                    <button className="btn_cards">
                                        <Card
                                        name={v.name}
                                        image={v.img} 
                                        genres={v.genres} 
                                        rating={v.rating} 
                                        released={v.released}
                                        />
                                    </button>
                                </Link>
                            </div>
                        )
                        
                    })
                }
            </div>

            <div className="Paginado">
                <Paginado
                vgPorPagina={vgPorPagina}
                allVideogames={allVideogames.length}
                paginado={paginado}
                />
            </div>
            
            <Link to='/videogame'>
                <button className="create">Crear Videojuego</button>    
            </Link>
            

        </div>
    )
}