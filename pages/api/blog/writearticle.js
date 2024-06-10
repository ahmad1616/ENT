const { MongoClient } = require("mongodb");
const { idCreator } = require("../../../src/utils/generalUtils")
const uri = process.env.URI
const path = require('path')
const fs = require('fs')
const { getFileExtension } = require('../../../src/utils/blogUtils')
export default async function handler(req, res) {
    let { blogData, sessionID } = req.body
    const articleID = idCreator()
    let imageBase64 = blogData.articleImage
    let base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    let imageBuffer = Buffer.from(base64Data, 'base64')
    let imageName = articleID + 'articleimage' +'.'+ getFileExtension(imageBase64)
    let filePath = path.join('public', 'images', 'articles', imageName);
    fs.writeFileSync(filePath, imageBuffer);
    blogData.articleImage = filePath.slice(7)
    blogData.elements.forEach((element,index) => {
        imageBase64 = element.image
        base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
        imageBuffer = Buffer.from(base64Data, 'base64')
        let imageName = articleID + 'element'+ index +'.'+ getFileExtension(imageBase64)
        let filePath = path.join('public', 'images', 'articles', imageName);
        fs.writeFileSync(filePath, imageBuffer);
        blogData.elements[index].image = filePath.slice(6)  
    });
    const client = new MongoClient(uri);
    const database = client.db('ENT');
    const blogs = database.collection('blogs');
    const users = database.collection('users')
    let query = { sessionIDs: { $in: [sessionID] } }
    await users.updateOne(query, { $push: { articles: articleID } })
    blogData._id = articleID
    blogData.views = 0
    await blogs.insertOne(blogData)
    console.log(req.body);
    res.status(200).json({ state: true })
}