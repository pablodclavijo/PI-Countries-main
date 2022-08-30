const dbInfo = require('../../services/dbInfo')

async function postActivity (req, res) {

    const {activity} = req.body
    const {countries} = req.body
    if(!activity) return res.status(400).send("data not recieved")
    const success = await dbInfo.postActivity(activity, countries).catch(err => console.error(err))
    if(!success) return res.status(400).send("data doesn't match the expected format")
    return res.status(200).send(success)
}

async function getActivities (req, res) {
    
    const activities = await dbInfo.getAllActivities().catch(err => console.error(err))
    if(!activities) return res.status(404).send("error")
    return res.status(200).send(activities)
}

module.exports = {postActivity, getActivities}