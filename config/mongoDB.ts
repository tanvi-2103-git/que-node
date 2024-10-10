import mongoose from "mongoose";

import dotenv from 'dotenv';
dotenv.config();
if(process.env.MONGO_URL)
mongoose
  .connect(process.env.MONGO_URL )
  .then((success) => {
    console.log("connected,connected.....");
  })
  .catch((err) => console.log(err));
