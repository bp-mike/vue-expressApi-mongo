const express = require('express')
const mongodb = require('mongodb')

const router = express.Router();

//get
router.get('/', async (req, res) =>{
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray())
})
//add
router.post('/', async (req, res) =>{
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    })
    res.status(201).send();
})
//de/
router.delete('/:id', async (req, res) =>{
    const posts = await loadPostsCollection();
    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    })
    res.status(200).send();
})
// db connect
async function loadPostsCollection(){
    let connectionString = "mongodb+srv://todoAppUser:2duapuza@cluster0.vqnib.mongodb.net/vue_express_mongo?retryWrites=true&w=majority"
    const client = await mongodb.MongoClient.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})    
    
    return client.db('vue_express_mongo').collection('posts')
}


module.exports = router