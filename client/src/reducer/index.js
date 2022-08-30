
const initialState = {
    countries : [],
    activities : [],
    detail: []
}


function rootReducer(state = initialState, action) {
    
    switch(action.type){
        case 'GET_COUNTRIES':
            return {...state, 
            countries: action.payload
            }
        case 'GET_ACTIVITIES':
            return {...state,
            activities : action.payload}
        case 'FILTER_BY_CONTINENT':
            const allCountries = state.countries
            const stateFilteredByContinent = allCountries.filter(e=> e.continent === action.payload)
            return {...state, 
                countries: stateFilteredByContinent
            }
        case 'FILTER_BY_ACTIVITY':
            const countries = state.countries
            const stateFilteredByActivity = countries.filter(country=> country.activities && 
                country.activities.some(e => e.id.toString() === action.payload))
            return {...state,
                countries : stateFilteredByActivity
            }
        case 'SORT':
            let sortedState = []
            if(action.payload==='lo-hi') sortedState = state.countries.sort(function(a,b) {return a.population - b.population })
            if(action.payload==='hi-lo') sortedState = state.countries.sort(function(a,b) {return b.population - a.population })
            if(action.payload === 'A-Z') sortedState = state.countries.sort(function(a,b) {return a.name > b.name ? 1 : -1})
            if(action.payload === 'Z-A') sortedState = state.countries.sort(function(a,b) {return b.name > a.name ? 1 : -1})
            return {...state, 
                countries: sortedState
            }
        case 'GET_COUNTRY_BY_NAME':
            return {...state,
                countries: action.payload
            }
        case 'GET_DETAIL':
            return{...state,
                detail: action.payload
            }
        case 'RESET_DETAIL':
            return{ ...state,
            detail: []
        }
        default:
            return initialState
    }

}

export default rootReducer