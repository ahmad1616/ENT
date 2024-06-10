export function getFileExtension(base64String) {
    // Extract the MIME type from the base64 string
    const mimeType = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];

    // Extract the file extension from the MIME type
    const extension = mimeType.split('/').pop();

    return extension;
}
export async function getArticleByID(blogs,ID){
    let query = {_id: ID}
    let blogData = await blogs.findOne(query)
    return blogData
}
export async function getArticles(blog,author,classification,number,skipNum){
    let query = {}
    let projection = {author:1,title:1,articleImage:1,classification:1,publicationDate:1,_id:3}
    if(author){ 
        query.author = author
    }
    if(classification){
        query.classification = classification
    }
    let articles = await blog.find(query,projection).sort({views:-1}).skip(skipNum*number).limit(number).toArray()
    return articles
}