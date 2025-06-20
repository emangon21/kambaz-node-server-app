// Kambaz/Enrollments/routes.js

import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
    // GET all enrollments
    app.get("/api/enrollments", async (req, res) => {
        try {
            const list = await dao.findAllEnrollments();    // <— new
            res.json(list);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // POST to enroll
    app.post("/api/enrollments", async (req, res) => {
        const { userId, courseId } = req.body;
        try {
            const e = await dao.enrollUserInCourse(userId, courseId);  // uses Mongo
            res.json(e);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // DELETE to unenroll
    app.delete("/api/enrollments", async (req, res) => {
        const { userId, courseId } = req.body;
        try {
            await dao.unenrollUserFromCourse(userId, courseId);
            res.json({ status: "ok" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });
}
