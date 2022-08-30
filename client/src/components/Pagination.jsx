import React, { useState } from "react";
import './Pagination.css'

export default function Pagination({elementsPerPage, allElements, pagination}){
    let pageNumbers = []
    const numberOfPages = allElements / elementsPerPage

    for (let i=1; i<=numberOfPages; i++){
        pageNumbers.push(i)
    }
    const [currentElement, setCurrentElement] = useState(1)
    
    const handleOnClick = (number) =>{
        pagination(number)
        setCurrentElement(number)
        
    }

    return (
        <nav className="nav-pagination">
            <div id="list-pagination">
               {pageNumbers && pageNumbers.map((number)=> 
               <p key={number.toString()} className={currentElement === number ? " active" : ""} 
               onClick={()=>handleOnClick(number)}>
                   {number}</p>)}
            </div>
        </nav>
    )
}