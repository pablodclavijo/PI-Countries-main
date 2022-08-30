import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, resetDetail} from "../actions";
import { useEffect } from "react";
import './Details.css'
import {capitalize} from './capitalize'
import { useState } from "react";

export function Detail(props){
    
    const {id} = useParams()
    const dispatch = useDispatch()
    const country = useSelector((state)=> state.detail)
    const [isLoaded, setIsLoaded] = useState(false)
    //alert(props.match.params.id)
    useEffect(()=> {
        dispatch(resetDetail())
        dispatch(getDetail(id))
        setTimeout(() => setIsLoaded(true), 140)
    }, [dispatch, id])
    // useEffect(()=>{
    //     return ()=>{
    //         dispatch(resetDetail())
    //     }
    // },[dispatch])
    if(!isLoaded) return(
        <div className="loading">
            <h1>
                Loading...
            </h1>
        </div>
    )
    if(country.id) return (
        <div id="detail">
            <h1 id="detailTitle">{capitalize(country.name)}</h1>
            <img src={country.image} alt="flag"></img>
            <div id="detail-list">
                <h4 id="label">Stats</h4><br/>
                <p key={'capital'}>Capital: {country.capital}</p><br/>
                <p key={'continent'}>Continent: {country.continent} km2</p><br/>
                <p key={'subregion'}>Subregion: {country.subregion} km2</p><br/>
                <p key={'area'}>Area: {country.area} km2</p><br/>
                <p key={'population'}>Population: {country.population} cm</p><br/>
            </div>
            <h4 id="activitiesh4">Activities</h4>
            <div className="activities-holder">
                {country.activities && country.activities.map(e=> {return (
                    <div className="activity" key={e.name}>
                        <h5>{e.name}</h5>
                        <p key={'duration'}>{e.duration} minutes</p>
                        <p key={'difficulty'}>Difficulty: {e.difficulty} out of 5</p>
                        <p key={'season'}>{e.season}</p>
                        {e.creadoPor && <p key="creado-por">{e.creadoPor}</p>}
                    </div>)})}
            </div>
            <Link to='/home'>
            <button>Go back</button>
            </Link>
        </div>
    )
    return (
        <div id="error">
            <h1>404</h1>
            <h2>No Country found</h2>
            <Link to='/home'>
                <button>
                    Go Back
                </button>
            </Link>
        </div>
    )
}
