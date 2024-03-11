const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://ahmadwael1414:lovescience@ahmadmongocluster.gjar3ok.mongodb.net/?retryWrites=true&w=majority";

export default async function handler(req,res){
    let classification = req.body['job']
    let blogs
    let projection = {background_image:1,title:1,author:1,publication_date:1,_id:1}
    const client = new MongoClient(uri);
    const database = client.db('ENT');
    const blogsCollection = database.collection('blogs');
    if (classification==='غير محدد'){
        blogs = await blogsCollection.find({}).project(projection).toArray()
        res.status(200).send({blogs:blogs})
    }
    else{
        let query = {'classification': classification}
        blogs = await blogsCollection.find(query).project(projection).toArray()
        res.status(200).send({blogs:blogs})
    }

}