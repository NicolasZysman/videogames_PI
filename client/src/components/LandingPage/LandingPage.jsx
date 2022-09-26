import React from "react";
import { Link } from "react-router-dom"
import "./landingPage.css"

export default function LandingPage(){
    return(
        <div className="landing">
            <h1 className="title"><span className="title-body">Videogames</span></h1>
            <Link className="btn_link" to ='/home'>
                <button className="btn"></button>
            </Link>
        </div>
    )
}