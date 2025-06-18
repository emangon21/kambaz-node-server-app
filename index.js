// index.js

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import db from './Kambaz/Database/index.js';
import UserRoutes from './Kambaz/Users/routes.js';
import CourseRoutes from './Kambaz/Courses/routes.js';
import ModuleRoutes from './Kambaz/Modules/routes.js';
import AssignmentRoutes from './Kambaz/Assignments/routes.js';
import EnrollmentRoutes from './Kambaz/Enrollments/routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB Atlas
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose
    .connect(CONNECTION_STRING)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('MongoDB connection error:', err));

console.log('Loaded session SECRET');

const app = express();
// Required by Render (and other proxies) for secure cookies
app.set('trust proxy', 1);

// === CORS ===
const allowedOrigins = [
    'http://localhost:5173',
    'https://kambaz-app.netlify.app',
];
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,        // <-- allow set-cookie
    })
);

app.use(express.json());

// === Session (with MongoStore) ===
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: CONNECTION_STRING,
            collectionName: 'sessions',
            touchAfter: 24 * 3600,    // only update session in db once per day
        }),
        cookie: {
            secure: true,             // HTTPS only
            sameSite: 'none',         // required for cross-site cookies
            httpOnly: true,           // JS in browser cannot read
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        },
    })
);

// === Routes ===
UserRoutes(app);
Lab5(app);
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);

// Debug endpoint
app.get('/api/db', (req, res) => res.json(db));

// Serve React build
app.use(express.static(path.join(__dirname, 'dist')));
app.use((req, res) =>
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
