import express from "express";
import session from 'express-session';
import passport from 'passport';
import './config/passport';
import dotenv from "dotenv";
import registerRouter from './route/register';

import loginRouter from './route/login';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.use(session({
  secret: process.env.SESSION_SECRET || 'ydhdhdjeje',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


//routes
app.use("/register", registerRouter);
app.use("/login", loginRouter)

app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

