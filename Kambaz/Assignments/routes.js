// File: Kambaz/Assignments/routes.js
import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
    // Create
    app.post(
        "/api/courses/:courseId/assignments",
        async (req, res) => {
            const { courseId } = req.params;
            const created = await dao.createAssignmentForCourse(
                courseId,
                req.body
            );
            res.json(created);
        }
    );

    // Read all for course
    app.get(
        "/api/courses/:courseId/assignments",
        async (req, res) => {
            const { courseId } = req.params;
            const list = await dao.findAssignmentsForCourse(courseId);
            res.json(list);
        }
    );

    // Read one
    app.get("/api/assignments/:assignmentId", async (req, res) => {
        const a = await dao.findAssignmentById(req.params.assignmentId);
        if (!a) return res.status(404).send({ error: "Not found" });
        res.json(a);
    });

    // Update
    app.put("/api/assignments/:assignmentId", async (req, res) => {
        const updated = await dao.updateAssignment(
            req.params.assignmentId,
            req.body
        );
        res.json(updated);
    });

    // Delete
    app.delete(
        "/api/assignments/:assignmentId",
        async (req, res) => {
            await dao.deleteAssignment(req.params.assignmentId);
            res.send({ status: "ok" });
        }
    );
}
