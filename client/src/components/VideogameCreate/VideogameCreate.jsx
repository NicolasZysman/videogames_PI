import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { postVideogame, getGenres, getPlatforms } from '../../actions/index';
import { useDispatch, useSelector } from "react-redux";
import "./videogameCreate.css"

function validate(input) {
    let errors = {}

    if (!input.name) {
        errors.name = "Name is required";
      } else if (input.name.length > 50) {
        errors.name = "Name is too long";
      }
  
      if (!input.description) {
        errors.description = "Description is required ";
      } else if (input.description.length > 1500) {
        errors.description = "Description is too long. (Max = 1500 characters)";
      }
  
      if (!input.rating) {
        errors.rating = "Rating is required";
      } else if (input.rating > 5 || input.rating < 0) {
        errors.rating = "Rating must range between 0 to 5";
      }
  
      if (!input.released) {
        errors.released = "Date of release is required";
      } else if (input.released.length < 10) {
        errors.released = "Date of release is to long";
      }
      if (!input.img) {
        errors.img = "Image URL is required";
      }
  
      if (!input.genre[0]) {
        errors.genre = "Minimun one Genre is required ";
      }
  
      if (!input.platforms[0]) {
        errors.platforms = "Minimun one Platform is required";
      }
  
      return errors;
    }

export default function VideogameCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const genre = useSelector((state) => state.genres)
    const platforms = useSelector((state) => state.platforms)
    const [ errors, setErrors ] = useState({})

    const [ input, setInput ] = useState({
        name: '',
        description: '',
        released: '',
        rating: '',
        img: "",
        platforms: [],
        genre: [],
    })

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelectGenres(e){
        if (!input.genre.includes(e.target.value)) {
            setInput({
                ...input,
                genre: [...input.genre, e.target.value]
            })
            setErrors(validate({
                ...input,
                genre: [...input.genre, e.target.value]
            }))
        } else {
            setInput({
                ...input
            })
        }
        
    }

    function handleDeleteGenres(e){
        setInput({
            ...input,
            genre: input.genre.filter((param) => param !== e)
        })
    }

    function handleSelectPlatforms(e){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        setErrors(validate({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        )
    }

    function handleDeletePlatforms(e){
        setInput({
            ...input,
            platforms: input.platforms.filter((param) => param !== e)
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        let crear = {
            name: input.name,
            description: input.description,
            released: input.released,
            rating: input.rating,
            img: input.img,
            platforms: input.platforms,
            genre: input.genre,
        }
        console.log("Pepe: ", crear)
        if(errors.length > 0){
            alert("Tienes que completar todos los campos")
        } else{
            dispatch(postVideogame(crear))
            setInput({
                name: '',
                description: '',
                released: '',
                rating: '',
                img: "",
                platforms: [],
                genre: [],
            })
            alert('Personaje creado con exito!')
            history.push('/home')
        }
    }

    

    return (
        <div className="form">
            <Link className="link_detail" to= '/home'><button className="home_detail"></button></Link>
            <form onSubmit={(e) => handleSubmit(e)}>
            <div className="inputs">
                <div>
                    <label className="label_name">Nombre</label>
                    <input
                    className="name_input"
                    type='text'
                    value={input.name}
                    name='name'
                    placeholder="Nombre..."
                    onChange={handleChange}
                    />
                    {
                        errors.name && (
                            <p className="err_created">{errors.name}</p>
                        )
                    }
                </div>

                <div className="desc_create">
                    <label className="label_desc">Description</label>
                    <textarea
                    className="desc_input"
                    type='text'
                    value={input.description}
                    name='description'
                    placeholder="Description..."
                    onChange={handleChange}
                    />
                    {
                        errors.description && (
                            <p className="err_created">{errors.description}</p>
                        )
                    }
                </div>

                <div className="release_create">
                    <label className="label_released">Released</label>
                    <input
                    className="released_input"
                    type='date'
                    value={input.released}
                    name='released'
                    onChange={handleChange}
                    />
                    {
                        errors.released && (
                            <p className="err_created">{errors.released}</p>
                        )
                    }
                </div>

                <div className="rating_create">
                    <label className="label_rating">Rating</label>
                    <input
                    className="rating_input"
                    type='number'
                    value={input.rating}
                    name='rating'
                    placeholder="Rating..."
                    onChange={handleChange}
                    />
                    {
                        errors.rating && (
                            <p className="err_created">{errors.rating}</p>
                        )
                    }
                </div>

                <div className="img_create">
                    <label className="label_img">Image</label>
                    <input
                    className="img_input"
                    type='text'
                    value={input.img}
                    name='img'
                    placeholder="Img URL..."
                    onChange={handleChange}
                    />
                    {
                        errors.img && (
                            <p className="err_created">{errors.img}</p>
                        )
                    }
                </div>

                <div className="genre_create">
                    <div>
                        <select className="genre_btn" onChange={(e) => handleSelectGenres(e)}>
                        <option value="all">Genres</option>
                        {genre?.map((g) => {
                            return (
                                <option value={g.name}>{g.name}</option>
                            )
                        })}
                        </select>
                        {
                            errors.genre && (
                                <span className="err_created">{errors.genre}</span>
                            )
                        }
                    </div>
                    <div className="delete_genres">
                        {
                            input.genre?.map((e) => {
                                return (
                                    <>
                                    <div>
                                        <div>{e}</div>
                                        <button type="button" onClick={() => handleDeleteGenres(e)}>X</button>
                                    </div>
                                    </>
                                )
                            })
                        }{" "}
                    </div>
                </div>
                    
                
                <div className="platform_create">
                    <div>
                            <select className="platform_btn" onChange={(e) => handleSelectPlatforms(e)}>
                                <option value="all">Platforms</option>
                                {platforms?.map((e) => {
                                    return (
                                        <option value={e.name}>
                                            {e.name}
                                        </option>
                                    )
                                })}
                            </select>
                            {
                                errors.platforms && (
                                    <span className="err_created">{errors.platforms}</span>
                                )
                            }
                    </div>
                    <div className="delete_plat">
                        {
                            input.platforms?.map((e) => {
                                return (
                                    <>
                                    <div>
                                        <div>{e}</div>
                                        <button type="button" onClick={() => handleDeletePlatforms(e)}>X</button>
                                    </div>
                                    </>
                                )
                            })
                        }
                        
                    </div>
                </div>
                    
            </div>

                  
                {
                    Object.keys(errors).length ? (
                        <div>
                            <input className="btn_create_disabled" type="submit" disabled name="Send" />
                        </div>
                    ) : (
                        <div>
                            <input className="btn_create" type="submit" name="Send" />
                        </div>
                    )
                }
                
            </form>
        </div>
    )
}