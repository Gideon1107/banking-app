import express from "express";
import session from 'express-session';
import passport from 'passport';
import pgSession from "connect-pg-simple";
import './config/passport';
import dotenv from "dotenv";
import registerRouter from './route/register';
import loginRouter from './route/login';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Setup connect-pg-simple
const PgSession = pgSession(session);

// Setup session middleware
app.use(session({
  store: new PgSession({
    conString: process.env.DATABASE_URL || "postgresql://postgres.bszouzrifbnexmuukeex:bankdevwebsite12@aws-0-eu-west-2.pooler.supabase.com:6543/postgres", 
    tableName: 'session',
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET || 'ydhdhdjeje',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  },
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

