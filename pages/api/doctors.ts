const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://ahmadwael1414:lovescience@ahmadmongocluster.gjar3ok.mongodb.net/?retryWrites=true&w=majority";

export default async function handler(req, res) {
    const client = new MongoClient(uri);
    let headers = req.headers
    let job = headers['job']
    let query = req.body
    const database = client.db('ENT');
    const docsCollection = database.collection('doctors');
    try {
        if (job == 'getDoctor') {
            const doctor = await docsCollection.findOne(query)
            console.log(doctor);
            res.status(200).send({ doctor: doctor })
        }
        else {
            const projection = { name: 1, image: 1, _id: 0 }; // 1 to include, 0 to exclude
            const doctors = await docsCollection.find(query).project(projection).toArray();
            console.log(doctors);
            res.status(200).send({ doctors: doctors })
        }
        await client.close();

    }
    catch {
        console.error();
    }

}