const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = 'mongodb+srv://admin:eternity1@cluster0.3az9hbx.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    connectTimeoutMS: 10000, 
    serverApi: ServerApiVersion.v1 
})

async function getter() {
    await client.connect()
    const db = client.db('db')
    let returns = await db.collection('propositions').find()
    let data = []
    await returns.forEach(each => data.push(each))
    data = JSON.stringify(data)
    return data
}

async function oneGetter(id) {
    await client.connect()
    const db = client.db('db')
    let data = await db.collection('propositions').findOne({ 'id': id })
    data = JSON.stringify(data)
    return data
}

async function oneAddendumGetter(id, id2) {
    await client.connect()
    const db = client.db('db')
    const proposition = await db.collection('propositions').findOne({ 'id': id })
    const addendum = JSON.stringify(proposition.addenda)
    return addendum
}

async function oneUpvoter(id) {
    await client.connect()
    const db = client.db('db')
    await db.collection('propositions').updateOne(
        { 'id': id },
        { $inc: {  'ups': 1 } }
    )
}
async function oneDownvoter(id) {
    await client.connect()
    const db = client.db('db')
    await db.collection('propositions').updateOne(
        { 'id': id },
        { $inc: {  'downs': 1 } }
    )
}

async function propPoster(payload) {
    await client.connect()
    const db = client.db('db')
    db.collection('propositions').insertOne(payload)
}
    
async function addendumPoster(id, payload) {
    await client.connect()
    const db = client.db('db')
    console.log(id)
    console.log(payload)
    await db.collection('propositions').updateOne(
        { 'id': id },
        { $push: { 'addenda': payload } }
    )
}

exports.getter = getter
exports.oneGetter = oneGetter 
exports.oneAddendumGetter = oneAddendumGetter 
exports.oneUpvoter = oneUpvoter 
exports.oneDownvoter = oneDownvoter 
exports.propPoster = propPoster
exports.addendumPoster = addendumPoster

