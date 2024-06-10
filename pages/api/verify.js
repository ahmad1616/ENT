import { phoneOrEmailExists } from "../../src/utils/registerUtils";

const { MongoClient } = require("mongodb");
const uri = process.env.URI

export default async function handler(req, res) {
    const client = new MongoClient(uri);
    const database = client.db('ENT');
    const users = database.collection('users');
    const query = { _id: req.body['number']}
    console.log(query);
    let document = await users.findOneAndUpdate(
        query, // Find the document by its ID
        { $set : { verified: true } }, // Update the 'verified' key to true
        { returnOriginal: true })
    await client.close()
    console.log(document);
    if(document){
        res.status(200).json({verified:true})
    }
    else{
        res.status(200).json({verified:false})
    }

}