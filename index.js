// File: index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
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

mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('MongoDB connection error:', err));

// ————— Remove any reference to NETLIFY_URL —————

// Only log the session secret (or nothing):
console.log('Loaded session SECRET');

const app = express();
app.set('trust proxy', 1);

const allowedOrigins = [
    'http://localhost:5173',
    'https://kambaz-app.netlify.app'
];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: 'none',
            secure: process.env.NODE_ENV === 'production',
        },
    })
);

UserRoutes(app);
Lab5(app);
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);

app.get('/api/db', (req, res) => res.json(db));

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
