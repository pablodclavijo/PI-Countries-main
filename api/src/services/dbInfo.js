const {Op} = require ('sequelize')
const {Country, Activity} = require('../db')
const apiInfo = require ('./apiInfo.js')


const storeCountry = async (country) =>{

    if(!country.capital) return 0    
        await Country.create(
            {name : country.name.common.toLowerCase(),
            id : country.cca3,
            image : country.flags[0],
            continent : country.region,
            capital : country.capital[0],
            subregion : country.subregion,
            area : country.area,
            population : country.population
        }).catch(err => {
            console.log(err)})
}


const getAllCountries = async () =>{

    const count = await Country.count().catch(err => console.log(err))
    if(!count) {
        const apiData = await apiInfo.getCountries().catch(err => console.error(err))
        apiData && apiData.forEach(async (country) => await storeCountry(country).catch(err => console.error(err)))
    }
    const data = await Country.findAll({
        attributes: ['name', 'image', 'continent', 'id', 'population'],
        include: [{model: Activity}]}
    ).catch(err => console.log(err))
    if(!data) return false
    return data    
}

const getCountryDetail = async (id) =>{
    
    const country = await Country.findByPk(id,{ attributes: ['name', 'image', 'continent', 'id', 'capital','subregion', 'area', 'population'],
        include: [{model: Activity}]}).catch(err => console.error(err)) || 
        await apiInfo.getCountryById(id).catch(err => console.error(err))
    if(!country) return false
    return country
    }

const getCountryByName = async (name = false) =>{

    if(!name) return false
    const countriesFromDb = await Country.findAll({where : {
        name : {[Op.substring] : name},
    }})
    return countriesFromDb.length > 1 ? countriesFromDb.map(e => e ) : countriesFromDb[0] || 
    await apiInfo.getCountryBySubstring(name).catch(err => console.error(err)) 
    
    }

const storeActivity = async (activity = false) =>{
     
    if(!activity) return false
    const [activityInstance, created] = await Activity.findOrCreate({
        where: {
            name : activity.name,
            difficulty : activity.difficulty,
            duration : activity.duration,
            season : activity.season
        }
    })
    if(!activityInstance) return false
    return activityInstance
}  

const addAssociations = async (activityInstance = false, countryId = false) =>{

    if(!activityInstance || !countryId) return false
    const countryInstance = await Country.findByPk(countryId).catch(err => console.error(err))
    return countryInstance && await countryInstance.addActivity(activityInstance, {through : "countries_activity"}).catch(err => console.error(err))
    
    

}
const postActivity = async (activity = false, countries = false) =>{

    if(!activity || !countries) return false
    const activityInstance = await storeActivity(activity).catch(err => console.error(err))
    if(!activityInstance) return false
    if(!countries.length) return await addAssociations(activityInstance, countries).catch(err=> console.error(err))
    let success = []
    success.push(countries.forEach(async (country)=> {
       return await addAssociations(activityInstance, country).catch(err=> console.error(err))
    }))
    return !(success.includes(false))

}

const getAllActivities = async () =>{

    const data = await Activity.findAll({
        attributes: ['name', 'id']}
    ).catch(err => console.log(err))
    if(!data) return false
    return data    
}

module.exports = {
    getAllCountries,
    getCountryByName,
    getCountryDetail,
    postActivity,
    getAllActivities
}

