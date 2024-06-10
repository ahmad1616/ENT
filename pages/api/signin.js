const { MongoClient } = require("mongodb");
const { idCreator } = require("../../src/utils/generalUtils")
const uri = process.env.URI;
const path = require('path')
const fs = require('fs')
export default async function handler(req, res) {
    console.log(req.body);
    const client = new MongoClient(uri);
    const database = client.db('ENT');
    const users = database.collection('users');
    let { phoneOrEmail, password, sessionID } = req.body
    let query
    console.log(sessionID)
    if (sessionID) {
        query = { sessionIDs: { $in: [sessionID] } }
    }
    else {
        sessionID = idCreator()
        query = { phoneOrEmail: phoneOrEmail, password: password, verified: true }
        await users.updateOne(query, { $push: { sessionIDs: sessionID } })
    }
    let projection = { name: 1, profileImage: 1, specialization: 1, usertype: 1 }
    let existingUser = await users.findOne(query, { projection: projection })
    if (existingUser != null) {
        existingUser['sessionID'] = sessionID
        try {
            const fileBuffer = fs.readFileSync(existingUser['profileImage'])
            const fileContentBase64 = fileBuffer.toString('base64')
            existingUser['profileImageBase64'] = fileContentBase64
        }
        catch(err) {
            console.error(err)
        }
    }
    await client.close()
    console.log(existingUser);
    res.status(200).json({ user: existingUser })
}