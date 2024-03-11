const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://ahmadwael1414:lovescience@ahmadmongocluster.gjar3ok.mongodb.net/?retryWrites=true&w=majority";

export default async function handler(req, res) {
    let verified
    const client = new MongoClient(uri);
    const database = client.db('ENT');
    const patientsCollection = database.collection('patients');
    const query = { _id: req.body['verificationNum'] }
    let document = await patientsCollection.findOneAndUpdate(
        query, // Find the document by its ID
        { $set : { verified: true } }, // Update the 'verified' key to true
        { returnOriginal: true })
    await client.close()
    if(document){
        res.status(200).json({verified:true})
    }
    else{
        res.status(200).json({verified:false})
    }

}