import React from "react";
import "./Card.css"

export default function Card({ name, image, genres, rating, released}){


    return(
        <div className="flip_card">
            <div className="flip_card_inner">
                <div className="flip_card_front">
                    <img className="image" src= { image } alt="Img Not Found" />
                </div>
                <div className="flip_card_back">
                    <h1 className="name">{ name }</h1>
                    <p className="info">Rating: { rating ? rating : "Not Available"}</p>
                    <p className="info2">Released: { released }</p>
                    <p className="info-genres">{ genres.map((genres) => { if(!genres.name) { 
                        return `${genres}` 
                        } else { 
                            return genres.name
                        }}).join(" | ")} </p>
                </div>
                
            </div>
            
            
        
        </div>
    )
}
