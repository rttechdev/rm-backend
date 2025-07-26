//require("dotenv").config({path: "./.env"});
import dotenv from "dotenv";


import connectToDatabase from "./db/index.js";

dotenv.config();

connectToDatabase();

/*import express from "express";
const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (err) => {
      console.error("Error in Express app:", err);
      throw err;
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();
*/
