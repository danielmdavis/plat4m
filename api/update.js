const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://admin:eternity1@cluster0.3az9hbx.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 10000, serverApi: ServerApiVersion.v1 })

    async function getter() {
        await client.connect()
        const db = client.db("db")
        let returns = await db.collection("propositions").find()
        let data = []
        await returns.forEach(each => data.push(each))
        data = JSON.stringify(data)
        return data
    }

    // async function getOne(id) {
    //     await client.connect()
    //     const db = client.db("db")
    //     const returns = await db.collection("propositions").findOne({ "id": id })
    //     let data = []
    //     await returns.forEach(each => data.push(each))
    //     data = JSON.stringify(data)
    //     return data
    // }

    async function poster(payload) {
        await client.connect()
        console.log(payload)
        const db = client.db("db")
        db.collection("propositions").insertOne(payload)
      }

exports.getter = getter
// exports.getOne = getOne 
exports.poster = poster

