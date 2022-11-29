const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://admin:eternity1@cluster0.3az9hbx.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 10000, serverApi: ServerApiVersion.v1 })

// client.connect(err => {
//   const collection = client.db("test").collection("devices")
//   // perform actions on the collection object
//   client.close()
// })

    async function getter() {
        await client.connect()
        console.log("Connected correctly to server")
        const db = client.db("db")
        const returns = await db.collection("propositions").find()
        let data = []
        await returns.forEach(each => data.push(each))
        data = JSON.stringify(data)
        return data
    }

    async function poster(payload) {
         await client.connect()
         console.log("Connected correctly to server")
         const db = client.db("db")
      
         payload = JSON.parse(payload)
      
         const id = Object.values(payload)[0]
         await db.collection("propositions").update(
           { "id": id },
           { $inc: {  "ups": 1 } }
         )
      }

exports.getter = getter
exports.poster = poster

