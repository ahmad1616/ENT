const {deleteSessionID} = require('../../src/utils/registerUtils') 
export default async function handler(req,res){
    let sessionID = req.body.sessionID
    await deleteSessionID(sessionID)
    res.status(200).json({})
}