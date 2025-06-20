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
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
const PORT = process.env.PORT || 4000;

mongoose
    .connect(CONNECTION_STRING)
.then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('MongoDB connection error:', err));

const app = express();
app.set('trust proxy', 1);

app.use(
    cors({
        origin: ['http://localhost:5173', 'https://kambaz-app.netlify.app'],
        credentials: true,
    })
);

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: CONNECTION_STRING,
            collectionName: 'sessions',
            touchAfter: 24 * 3600,
        }),
        cookie: {
            secure: true,
            sameSite: 'none',
            httpOnly: true,
        },
    })
);

app.get('/api/_debugSession', (req, res) => {
    res.json({
        sessionID: req.sessionID,
        currentUser: req.session.currentUser || null,
        wholeSession: req.session,
    });
});

app.get('/api/db', (req, res) => res.json(db));

UserRoutes(app);
Lab5(app);
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);

app.use(express.static(path.join(__dirname, 'dist')));
app.use((req, res) =>
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});