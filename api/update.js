const { MongoClient } = require("mongodb");
let payload = require('./data.json');


const url = "mongodb+srv://admin:Eternity1%21%21@cluster0.kehb2.mongodb.net/plat4m?retryWrites=true&w=majority";
const client = new MongoClient(url);

 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db("cluster0");

         // const p = await db.collection("test").insert(payload);
         const returns = await db.collection("test").find();

         let data = []

         //this may be losing inner addendum objs
         await returns.forEach(each => data.push(each))

         console.log(data);
         console.log(typeof data);

        } catch (err) {
         console.log(err.stack);
     }

     finally {
        await client.close();
    }
}
run().catch(console.dir);
