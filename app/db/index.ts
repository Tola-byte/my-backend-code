import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import mongoose from "mongoose";

dotenv.config();

const MONGO_URI = "mongodb://mongo:pMcRXOXhh4y73ij4IAJV@containers-us-west-175.railway.app:7199";

console.log(MONGO_URI);

(() => {
  mongoose.set("strictQuery", false);
  mongoose.connect(MONGO_URI + "/sectors-db");
  mongoose.connection
    .once("open", () => {
      console.log("MongoDB Connected");
    })
    .on("error", (error) => {
      console.log("Error: ", error);
    });
})();
