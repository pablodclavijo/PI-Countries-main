import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import { getCountries, postActivity} from '../actions/index'
import { useDispatch, useSelector } from "react-redux";
import './ActivityCreate.css'
import { capitalize } from "./capitalize";
export function ActivityCreate(){
    
    const dispatch = useDispatch()
    const countries = useSelector(state=> state.countries)
    const [input, setInput] = useState({
        name: '',
        difficulty: 0,
        season: '',
        duration: 0,
        countries : []
    })
    const [created, setCreated] = useState(false)
    useEffect(()=> {
        dispatch(getCountries())
    },[dispatch])

    const handleOnChange = (e)=>{
        setInput({
            ...input,
            [e.target.name] : [e.target.value][0]
        })
    }


    function handleSelect(e) {
        if(input.countries.includes(e.target.value)) return 
        setInput({
          ...input,
          countries: [...input.countries, e.target.value],
        })
      }

    function deleteCountry(e, country){
        e.preventDefault()
        const countriesFiltered = input.countries.filter(id => id !== country)
        setInput({
              ...input,
              countries: countriesFiltered
          })
    }

    const handleOnClick = (e)=>{
        e.preventDefault()
        const parseInput = (input) =>{  
            return {
                activity :{
                name: input.name,
                difficulty : input.difficulty,
                season : input.season,
                duration: input.duration},
                countries: input.countries
            }
        }
        
         if(!input.name || !input.season || !input.duration || !input.difficulty || !input.countries.length) {
             alert("all fields are required")
             return
          } else{
        const parsedInput = parseInput(input)
        dispatch(postActivity({...parsedInput}))
        setCreated(true)
        setInput({ 
            name: '',
            difficulty: 0,
            season: '',
            duration: 0,
            countries : []
        })}
    
    }
    if(created===false){

    return (
        
            <div id="dog-create">
            <Link to='/home'>
                <button className="btn">Go back</button>
            </Link>
            <h1 className="title">Post a new Activity into the database</h1>
            <form id='form'>
                <div id="text-input">
                    <label>Name:
                        <input type="text"
                        name="name"
                        onChange={e=>handleOnChange(e)}/>
                    </label>
                </div>
                <div id="number-input">
                <div>
                    <label>Difficulty: 
                        <input type="number"
                        name="difficulty"
                        min={0}
                        max={5}
                        onChange={e=>handleOnChange(e)}/>
                    </label>
                    <label>Duration in minutes: 
                        <input type="number"
                        name="duration"
                        min={0}
                        onChange={e=>handleOnChange(e)}/>
                    </label>
                </div>
                <div>
                    <label htmlFor="season">Season:
                        <select name="season" id="season" onChange={handleOnChange}>
                            <option 
                                name="season"
                                key="undetermined"
                                value=''>Choose one
                            </option>
                            <option
                                name="season"
                                key={"Summer"}
                                value={"Summer"}>Summer</option>
                            <option
                                name="season"
                                key={"Winter"}
                                value={"Winter"}>Winter</option>
                            <option
                                name="season"
                                key={"Spring"}
                                value={"Spring"}>Spring</option> 
                            <option
                                name="season"
                                key={"Fall"}
                                value={"Fall"}>Fall</option>
                        </select>
                    </label>
                </div>
                </div>
                <div id="temps-container">
                    <div >
                        <label><h4>Countries: </h4>
                            <select id="countries" name="countries" multiple="multiple" onChange={e=>handleSelect(e)}>
                                {countries && countries.map(country=> {return country && (
                                    <option key={country.id} value={country.id} >{capitalize(country.name)}</option>)})}
                            </select>
                        </label>
                    </div>
                    {input.countries && input.countries.map(country=>{ return (
                        <button 
                            className="country-btn" 
                            key={country} 
                            onClick={e=> deleteCountry(e, country)}>
                            {country}
                        </button>)})}
                </div>               
            </form>
            <button className="btn" type="submit" onClick={e=>handleOnClick(e)}>Submit</button>
        </div>)} else return (
            <div className="activity-created">
                <h2>Activity added successfully</h2>
                <Link to='/home'>
                <button >Go back to home</button>
                </Link>
                <button onClick={e => setCreated(false)}>Post another one</button>
            </div>
        )
}