const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url = "mongodb+srv://admin:Eternity1%21%21@cluster0.kehb2.mongodb.net/plat4m?retryWrites=true&w=majority";
const client = new MongoClient(url);
async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);
