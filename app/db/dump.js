require("dotenv").config();
const { MongoClient } = require("mongodb");
const dbName = "sectors-db";
const MONGO_URI = "mongodb://localhost:27017/";
const client = new MongoClient(MONGO_URI);

// Database Name

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);

  const collection = db.collection("sectors");
  await collection.insertMany([
    { name: "Agriculture" },
    { name: "Engineering" },
    { name: "Science" },
    { name: "Arts" },
    { name: "Social Sciences" },
  ]);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
