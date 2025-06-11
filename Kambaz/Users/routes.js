import * as dao from './dao.js';
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
    // Sign up
    app.post('/api/users/signup', async (req, res) => {
        try {
            const existing = await dao.findUserByUsername(req.body.username);
            if (existing) {
                return res.status(400).json({ message: 'Username already taken' });
            }
            const newUser = await dao.createUser(req.body);
            req.session.currentUser = newUser;
            res.json(newUser);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Sign in
    app.post('/api/users/signin', async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await dao.findUserByCredentials(username, password);
            if (!user) {
                return res.status(401).json({ message: 'Unable to login. Try again later.' });
            }
            req.session.currentUser = user;
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Profile (get current user)
    app.post('/api/users/profile', (req, res) => {
        const u = req.session.currentUser;
        if (!u) {
            return res.sendStatus(401);
        }
        res.json(u);
    });

    // Update user
    app.put('/api/users/:userId', async (req, res) => {
        try {
            const updated = await dao.updateUser(req.params.userId, req.body);
            req.session.currentUser = updated;
            res.json(updated);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Sign out
    app.post('/api/users/signout', (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.sendStatus(200);
        });
    });

    const createCourse = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            return res.status(401).json({ message: "Not logged in" });
        }
        const newCourse = courseDao.createCourse(req.body);
        enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
        res.json(newCourse);
    };
    app.post("/api/users/current/courses", createCourse);


}
