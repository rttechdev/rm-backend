//require("dotenv").config({path: "./.env"});
import dotenv from "dotenv";
import { app } from "./app.js";

import connectToDatabase from "./db/index.js";

dotenv.config();

connectToDatabase()
  .then(() => {
    app.listen(process.env.PORT || 3500, () => {});
    console.log("server is running on port", process.env.PORT || 3500);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

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
