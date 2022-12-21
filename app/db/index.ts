import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import mongoose from "mongoose";
const { MongoClient, ServerApiVersion } = require('mongodb');


dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

console.log(MONGO_URI);

(() => {
  mongoose.set("strictQuery", false);
  mongoose.connect(MONGO_URI+"/sectors-db");
  mongoose.connection
    .once("open" , { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 } , () => {
      console.log("MongoDB Connected");
    })
    .on("error", (error) => {
      console.log("Error: ", error);
    });
})();
