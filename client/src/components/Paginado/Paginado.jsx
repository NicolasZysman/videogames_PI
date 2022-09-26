import React from "react";
import "./paginado.css"


export default function Paginado ({ vgPorPagina, allVideogames, paginado}) {
    const numPagina = []

    for (let i = 1; i <= Math.ceil(allVideogames/vgPorPagina); i++) {
        numPagina.push(i) 
    }

    return(
            <ul className="paginado_info">
                { numPagina && numPagina.map(numero => (
                    <button className="numero_paginado" onClick={() => paginado(numero)}>{numero}</button>
                ))}
            </ul>
    )
}