const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://ahmadwael1414:lovescience@ahmadmongocluster.gjar3ok.mongodb.net/?retryWrites=true&w=majority";

exports.dbBlog = async function dbBlog(id) {
  const client = new MongoClient(uri);
  let blog 
  try {
    const database = client.db('ENT');
    const blogs = database.collection('blogs');

    // Query for a movie that has the title 'Back to the Future'
    const query = { _id: id };
    blog = await blogs.findOne(query);
    console.log(blog);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    return blog
  }
}


