// index.js
import 'dotenv/config';               // ← load .env.development first
import express from 'express';
import cors from 'cors';
import session from 'express-session';

import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import db from './Kambaz/Database/index.js';
import UserRoutes from './Kambaz/Users/routes.js';
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";

console.log("Loaded ENV:", process.env.NETLIFY_URL, process.env.SESSION_SECRET);


const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
    "http://localhost:5173",
    "https://kambaz-app.netlify.app",
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("Not allowed by CORS"), false);
        }
    },
    credentials: true,
}));

app.use(express.json());


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'none',
        secure: true,
    }
}));


UserRoutes(app);
Lab5(app);
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);


app.get('/api/db', (req, res) => res.json(db));
app.get('/courses', async (req, res) => { /* … */ });

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
