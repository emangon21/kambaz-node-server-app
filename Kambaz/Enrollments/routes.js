import * as dao from "./dao.js";
import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export default function EnrollmentRoutes(app) {
    app.get("/api/enrollments", (req, res) => {
        res.json(Database.enrollments);
    });

    app.post("/api/enrollments", (req, res) => {
        const { userId, courseId } = req.body;
        dao.enrollUserInCourse(userId, courseId);
        res.json({ status: "ok" });
    });

    app.delete("/api/enrollments", (req, res) => {
        const { userId, courseId } = req.body;
        Database.enrollments = Database.enrollments.filter(
            (e) => !(e.user === userId && e.course === courseId)
        );
        res.json({ status: "ok" });
    });
}
