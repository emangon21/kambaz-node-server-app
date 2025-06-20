// File: Kambaz/Users/routes.js

import * as dao from "./dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
    app.post("/api/users/signup", async (req, res) => {
        try {
            const existing = await dao.findUserByUsername(req.body.username);
            if (existing) {
                return res.status(400).json({ message: "Username already taken" });
            }
            const newUserDoc = await dao.createUser(req.body);
            const newUser = newUserDoc.toObject({ versionKey: false });
            newUser._id = newUserDoc._id;

            req.session.currentUser = newUser;
            req.session.save(err => {
                if (err) {
                    console.error("Session save error:", err);
                    return res.status(500).json({ message: err.message });
                }
                res.json(newUser);
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    app.post("/api/users/signin", async (req, res) => {
        try {
            const userDoc = await dao.findUserByCredentials(
                req.body.username,
                req.body.password
            );
            if (!userDoc) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const user = userDoc.toObject({ versionKey: false });
            user._id = userDoc._id;

            req.session.currentUser = user;
            req.session.save(err => {
                if (err) {
                    console.error("Session save error:", err);
                    return res.status(500).json({ message: err.message });
                }
                res.json(user);
            });

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });


    // Fetch current session user
    app.post("/api/users/profile", (req, res) => {
        const current = req.session.currentUser;
        if (!current) return res.sendStatus(401);
        res.json(current);
    });

    // UPDATE PROFILE
    app.put("/api/users/profile", async (req, res) => {
        const current = req.session.currentUser;
        if (!current?._id) {
            return res.sendStatus(401);
        }

        try {
            await dao.updateUser(current._id, req.body);
            const updatedDoc = await dao.findUserById(current._id);
            const updated = updatedDoc.toObject({ versionKey: false });
            updated._id = updatedDoc._id.toString();
            req.session.currentUser = updated;
            res.json(updated);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });



    // Retrieve all users or filter by role
    app.get("/api/users", async (req, res) => {
        try {
            const { role } = req.query;
            let docs;
            if (role) {
                docs = await dao.findUsersByRole(role);
            } else {
                docs = await dao.findAllUsers();
            }
            const users = docs.map((u) =>
                typeof u.toObject === "function"
                    ? u.toObject({ versionKey: false })
                    : u
            );
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Retrieve a single user by primary key
    app.get("/api/users/:userId", async (req, res) => {
        try {
            const { userId } = req.params;
            const userDoc = await dao.findUserById(userId);
            if (!userDoc) {
                return res.status(404).json({ message: "User not found" });
            }
            const user = userDoc.toObject({ versionKey: false });
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Admin creates a new user
    app.post("/api/users", async (req, res) => {
        try {
            const userDoc = await dao.createUser(req.body);
            const user = userDoc.toObject({ versionKey: false });
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Update arbitrary user (admin-style)
    app.put("/api/users/:userId", async (req, res) => {
        try {
            const { userId } = req.params;
            await dao.updateUser(userId, req.body);
            const updatedDoc = await dao.findUserById(userId);
            const updated = updatedDoc.toObject({ versionKey: false });
            const current = req.session.currentUser;
            if (current?._id === userId) {
                req.session.currentUser = updated;
            }
            res.json(updated);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Delete user
    app.delete("/api/users/:userId", async (req, res) => {
        try {
            await dao.deleteUser(req.params.userId);
            res.sendStatus(200);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Sign out
    app.post("/api/users/signout", (req, res) => {
        req.session.destroy((err) => {
            if (err) return res.status(500).json({ message: err.message });
            res.sendStatus(200);
        });
    });



    const findCoursesForUser = async (req, res) => {
        let { uid } = req.params;
        if (uid === "current") {
            const curr = req.session.currentUser;
            if (!curr) return res.sendStatus(401);
            uid = curr._id;
        }
        const courses = await enrollmentsDao.findCoursesForUser(uid);
        res.json(courses);
    };
    app.get("/api/users/:uid/courses", findCoursesForUser);

    const enrollUserInCourse = async (req, res) => {
        let { uid, cid } = req.params;
        if (uid === "current") {
            const curr = req.session.currentUser;
            if (!curr) return res.sendStatus(401);
            uid = curr._id;
        }
        await enrollmentsDao.enrollUserInCourse(uid, cid);
        res.sendStatus(200);
    };
    app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);

    const unenrollUserFromCourse = async (req, res) => {
        let { uid, cid } = req.params;
        if (uid === "current") {
            const curr = req.session.currentUser;
            if (!curr) return res.sendStatus(401);
            uid = curr._id;
        }
        await enrollmentsDao.unenrollUserFromCourse(uid, cid);
        res.sendStatus(200);
    };
    app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
}
