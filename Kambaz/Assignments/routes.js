// Kambaz/Assignments/routes.js
import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
    // Create
    app.post("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignment = { ...req.body, course: courseId };
        const newAssignment = dao.createAssignment(assignment);
        res.json(newAssignment);
    });

    // Read all for course
    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignments = dao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    });

    // Read one
    app.get("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignment = dao.findAssignmentById(assignmentId);
        if (!assignment) return res.status(404).send({ error: "Not found" });
        res.json(assignment);
    });

    // Update
    app.put("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const updated = dao.updateAssignment(assignmentId, assignmentUpdates);
        res.json(updated);
    });

    // Delete
    app.delete("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const status = dao.deleteAssignment(assignmentId);
        res.send(status);
    });
}
