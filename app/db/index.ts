import * as dotenv from "dotenv"; 
import mongoose from "mongoose";
const { MongoClient, ServerApiVersion } = require('mongodb');


dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

console.log(MONGO_URI);

(() => {
  mongoose.set("strictQuery", false);
  mongoose.connect(MONGO_URI+"/sectors-db");
  mongoose.connection
    .once("open",
    () => {
      console.log("MongoDB Connected");
    })
    .on("error", (error) => {
      console.log("Error: ", error);
    });
})();
