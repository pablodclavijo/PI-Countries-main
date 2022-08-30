const axios = require('axios')

const getCountries = async () =>{

    const apiData = await axios.get('https://restcountries.com/v3/all').catch(err => console.log(err))
    if(!apiData.data) return false
    return apiData.data

}

const getCountryBySubstring = async (name = false) =>{

    if(!name) return false
    const apiData = await axios.get(`https://restcountries.com/v3/name/${name}`).catch(err => console.log(err))
    if(!apiData.data) return false
    return apiData.data[0]
}

const getCountryById = async (id = false) =>{

    if(!id) return false
    const apiData = await axios.get(`https://restcountries.com/v3/alpha/${id}`).catch(err => console.log(err))
    if(!apiData.data) return false
    return apiData.data[0]
}

module.exports = {
    getCountries,
    getCountryBySubstring,
    getCountryById
}