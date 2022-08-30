import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { getCountries, filterByContinent , filterByActivity, sort, getActivities, resetDetail} from '../actions'
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination";
import { batch } from "react-redux";
import SearchBar from "./SearchBar";
import './Home.css'
import { capitalize } from "./capitalize";
import Card404 from "./Card404";


export default function Home(){
    
    const dispatch = useDispatch()
    const allCountries = useSelector((state)=> state.countries)
    const allActivities = useSelector((state) => state.activities)
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        dispatch(getCountries())
        dispatch(getActivities())
        dispatch(resetDetail())
        setTimeout(() => setLoading(false), 150)
    }, [dispatch])
 
    const [sorted, setSorted] = useState('')
    const handleOnClick = (e) =>{
        e.preventDefault();
        if(sorted) setSorted('')
        dispatch(getCountries())
        setCurrentPage(1)
    }
    
     function handleFilterByContinent(e){

       if(e.target.value==='all') dispatch(getCountries()); 
       if(e.target.value!=='all') {
          batch(async ()=> {      
            await dispatch(getCountries())
            dispatch(filterByContinent(e.target.value))
        })
    }
    setCurrentPage(1)
}

    function handleFilterByActivities(e){

        if(e.target.value==='all-types') dispatch(getCountries()); 
        if(e.target.value!=='all-types') {
            batch(async ()=> {   
                await dispatch(getCountries())
                dispatch(filterByActivity(e.target.value))
        })
        }
    }
    function handleSort(e){
        e.preventDefault();
        dispatch(sort(e.target.value))
        setSorted(e.target.value)
    }
    
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage] = useState(10)
    const lastCountryIndex = currentPage * countriesPerPage 
    const firstCountryIndex = lastCountryIndex - countriesPerPage
    const currentCountries = currentPage === 1 ? allCountries.slice(firstCountryIndex, lastCountryIndex -1)
    : allCountries.slice(firstCountryIndex, lastCountryIndex)
    const pagination = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    return (
        <div id="Home">
           <div id="top">
            <Link to='/activities'>
                    <button className="btn-home">Post new Activity
                    </button>
                    </Link>
                    <button className="btn-home" onClick={e =>handleOnClick(e)}>restart</button>
                    <div className="sort-filter">
                    <SearchBar></SearchBar>           
                    <select key={"sort"} className="select" onChange={e=>handleSort(e)}>
                    <option key='choose-one' value="">Choose One...</option>
                    <option key="lo-ki" value='lo-hi'>Population Lo-Hi</option>
                    <option key='hi-lo' value='hi-lo'>Population Hi-Lo</option>
                        <option key='A-Z' value='A-Z'>A-Z</option>
                        <option key='Z-A' value='Z-A'>Z-A</option>
                    </select>
                    <select key={"continent"} className="select" onChange={(e)=> {handleFilterByContinent(e)}}>
                        <option key={"all"} value='all'>All</option>
                        <option key={"americas"} value="Americas">Americas</option>
                        <option key={"europe"} value="Europe">Europe</option>
                        <option key={"asia"} value="Asia">Asia</option>
                        <option key={"africa"} value="Africa">Africa</option>
                        <option key={"oceania"} value="Oceania">Oceania</option>
                    </select>
                    <select key={"activities"} className="select" onChange={(e)=>{handleFilterByActivities(e)}}> 
                        <option key='all-types' value='all-types'>all activities</option>
                        {allActivities.length && allActivities.map(e=> <option id={e.id} key={e.id} value={e.id}>{e.name}</option>)}
                    </select>
                </div>
            </div>
            <div className="container-cards">
                {(loading && (
                    <div className='loading'>
                        <h1>Loading...</h1>
                </div>)) ||
            (currentCountries.length && currentCountries.map((country)=> {
                    return (
                        <Link key={country.id} to={"/home/" + country.id}                                
                        id={country.id}>
                                <Card image={country.image}
                                key={country.id}
                                id={country.id}
                                name={capitalize(country.name)}
                                continent={country.continent}
                                />
                            </Link>
                            )})
                            ) || <Card404 key={404}/>}
            </div>
            <Pagination elementsPerPage={countriesPerPage} allElements={allCountries.length} pagination={pagination}/>
        </div> 
    )
}

