import React from "react";
import { useDispatch } from "react-redux";
import { getCountries } from "../actions";
import './Card404.css'

export default function Card404(){

    const dispatch = useDispatch()
    return (
        <div id="error">
            <h1>404</h1>
            <h2>No Country found</h2>
            <button onClick={e=>{e.preventDefault(); dispatch(getCountries())}}>
                Go Back
            </button>
        </div>
    )
}