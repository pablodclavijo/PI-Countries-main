import React from "react";
import {Link} from 'react-router-dom'
import './LandingPage.css'


export default function LandingPage(){

    return (
    <div className="landing">
        <h1 className="h1-landing">Welcome</h1>
        <Link className='link' to='/home'>
            <button className="button-landing">Go</button>
        </Link>
    </div>
    )
}