const dbInfo = require('../../services/dbInfo')

async function getCountries (req, res) {

    const {name} = req.query
    const data = name ? await dbInfo.getCountryByName(name).catch(err => console.error(err)) : 
    await dbInfo.getAllCountries().catch(err => console.error(err))
    if(!data) return res.status(404).send([{}])
    return res.status(200).send(data)
}

async function getCountryById(req, res) {

    const id = req.params.id.toUpperCase()
    if(!id) return res.status(400).send("no id sent")
    const data = await dbInfo.getCountryDetail(id).catch(err => console.error(err))
    if(!data) return res.status(404).send({})
    return res.status(200).send(data)
}

module.exports = {

    getCountries,
    getCountryById
}