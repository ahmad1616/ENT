import { getArticles } from '../../../src/utils/blogUtils'
const { MongoClient } = require("mongodb");
const uri = process.env.URI
export default async function handler(req, res) {
    const client = new MongoClient(uri);
    const database = client.db('ENT');
    const blog = database.collection('blog');
    let {articleType,skipNum,articlesNum} = req.body
    
    let query = {}
    if (articleType !== 'غير محدد') {
        query = { classification: articleType }
    }
    let articlesCount = await blog.countDocuments(query)
    let articles = await getArticles(blog,undefined,articleType,articlesNum,skipNum)
    res.status(200).json({ articles: articles,articlesCount:articlesCount })
}