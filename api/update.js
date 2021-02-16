const { MongoClient } = require("mongodb");
var fs = require('fs');


const url = "mongodb+srv://admin:Eternity1%21%21@cluster0.kehb2.mongodb.net/plat4m?retryWrites=true&w=majority";
const client = new MongoClient(url, { useUnifiedTopology: true }, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1});

async function fetch() {
  try {
   await client.connect()
   console.log("Connected correctly to server")
   const db = client.db("cluster0")

   const returns = await db.collection("test").find()
   console.log(returns);
   let data = []
   await returns.forEach(each => data.push(each))
   data = JSON.stringify(data)
   return data

  } catch (err) {
   console.log(err.stack);
  }
}

 async function run(payload) {
  try {
   await client.connect()
   console.log("Connected correctly to server")
   const db = client.db("cluster0")




   payload = JSON.parse(payload)
   if (!('update' in payload)) {
     const p = await db.collection("test").insertOne(payload)
   } else {
     const id = Object.values(payload)[0]
     console.log(id);
     await db.collection("test").update(
       { "id": id },
       { $inc: {  "ups": 1 } }
     )
   }

   const returns = await db.collection("test").find()

   let data = []

   await returns.forEach(each => data.push(each))

    data = await JSON.stringify(data)

     await fs.writeFile('./data.json', data, err => {
       if (err) {
         console.log('Error writing file', err)
       } else {
         console.log('Successfully wrote file')
       }
     })

     return (data)
    } catch (err) {
     console.log(err.stack);
   }

   finally {
    // await client.close();
  }
}
exports.run = run
exports.fetch = fetch
