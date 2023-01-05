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

async function onePropoGetter(id) {
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

async function onePropoUpvoter(id) {
    await client.connect()
    const db = client.db('db')
    await db.collection('propositions').updateOne(
        { 'id': id },
        { $inc: {  'ups': 1 } }
    )
}
async function onePropoDownvoter(id) {
    await client.connect()
    const db = client.db('db')
    await db.collection('propositions').updateOne(
        { 'id': id },
        { $inc: {  'downs': 1 } }
    )
}

async function oneAddendumUpvoter(id, id2) {
    console.log(id)
    console.log(id2)
    await client.connect()
    const db = client.db('db')
    await db.collection('propositions').updateOne(
        { 'id': id },
        { $inc: { 'addenda.$[add].ups' : 1 } },
        { arrayFilters: [ { 'add.id': { $eq: id2 } } ] }
     )
}
async function oneAddendumDownvoter(id, id2) {
    console.log(id)
    console.log(id2)
    await client.connect()
    const db = client.db('db')
    await db.collection('propositions').updateOne(
        { 'id': id },
        { $inc: { 'addenda.$[add].downs' : 1 } },
        { arrayFilters: [ { 'add.id': { $eq: id2 } } ] }
     )
}

async function propoPoster(payload) {
    await client.connect()
    const db = client.db('db')
    db.collection('propositions').insertOne(payload)
}
    
async function addendumPoster(id, payload) {
    await client.connect()
    const db = client.db('db')
    console.log(parseInt(id))
    console.log(payload)
    const foo = await db.collection('propositions').updateOne(
        { 'id': parseInt(id) }, 
        { $push: { 'addenda': payload } }
    )
    console.log(foo)
}

exports.getter = getter
exports.onePropoGetter = onePropoGetter 
exports.oneAddendumGetter = oneAddendumGetter 
exports.onePropoUpvoter = onePropoUpvoter 
exports.onePropoDownvoter = onePropoDownvoter 
exports.oneAddendumUpvoter = oneAddendumUpvoter 
exports.oneAddendumDownvoter = oneAddendumDownvoter 
exports.propoPoster = propoPoster
exports.addendumPoster = addendumPoster