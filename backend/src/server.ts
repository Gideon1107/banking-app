// in your server file (e.g., index.ts)
import express from "express";
import dotenv from "dotenv";
import registerRouter from './route/register';
import {db } from './util/db';
import { users } from './util/schema';


dotenv.config();


const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 



app.use("/register", registerRouter);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
