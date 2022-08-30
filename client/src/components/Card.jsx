import React from "react";
import './Card.css'

export default function Card ({name, image, continent, id}){
 
    if(name && image && continent){
        return (
        <div className="Card">
            <h1 className="CardTitle">{name}</h1>
            <div className="img-holder">
                <img className="image" src={image} alt={name}/>
            </div>
            <div className="card-bottom">
                <div className="continent">
                    <h4>Continent</h4> 
                    <p>{continent}</p>
                </div>
            </div>
        </div>
    )}
    return false
}

