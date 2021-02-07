const { MongoClient } = require("mongodb");
var fs = require('fs');


const url = "mongodb+srv://admin:Eternity1%21%21@cluster0.kehb2.mongodb.net/plat4m?retryWrites=true&w=majority";
const client = new MongoClient(url);

 async function run(payload) {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db("cluster0");

         payload = JSON.parse(payload)
         console.log(payload);

         const p = await db.collection("test").insertOne(payload);

         const returns = await db.collection("test").find();

         let data = []

         //this may be losing inner addendum objs
         await returns.forEach(each => data.push(each))
         data = JSON.stringify(data)

         fs.writeFile('./data.json', data, err => {
           if (err) {
             console.log('Error writing file', err)
           } else {
             console.log('Successfully wrote file')
           }
         })

        } catch (err) {
         console.log(err.stack);
     }

     finally {
        await client.close();
    }
}
// run().catch(console.dir);
exports.run = run
