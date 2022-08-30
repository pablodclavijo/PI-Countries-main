import axios from 'axios'

export function getCountries (){
    return async function (dispatch){
        let json = await axios.get("http://localhost:3001/countries")
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }
}

export function getActivities (){
    return async function (dispatch){
        let json = await axios.get("http://localhost:3001/activities")
        return dispatch({
            type: 'GET_ACTIVITIES',
            payload: json.data
        })
    }
}

export function filterByContinent(payload){

    return {
        type: 'FILTER_BY_CONTINENT',
        payload
    }
    
}

export function filterByActivity(payload){

    return {
        type: 'FILTER_BY_ACTIVITY',
        payload
    }
}

export function sort(payload){
    return {
        type: 'SORT',
        payload
    }
}

export function getCountryByName(name){
    return async function (dispatch){
        let response 
        const json  = await axios("http://localhost:3001/countries?name="+name).catch(err => console.log(err))
        if(!json) {
            response = []
        }else response =  Array.isArray(json.data) ? [...json.data] : [json.data]
        return dispatch(
            {
                type: 'GET_COUNTRY_BY_NAME',
                payload: response
            }
        )
    }
}
export function postActivity(payload){
    return async function (){
        let response = await axios.post("http://localhost:3001/activities", payload)
    return response
    }
}

export function getDetail(payload){
    return async function (dispatch){
        let country = await axios.get("http://localhost:3001/countries/"+payload).catch(err=> console.error(err))
        return dispatch({
            type: 'GET_DETAIL',
            payload: country.data
        })
}
}

export function resetDetail(){
    return {
        type: 'RESET_DETAIL'        
    }
}

