// File: Kambaz/Courses/routes.js
import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
    // Get all courses
    app.get("/api/courses", async (req, res) => {
        const courses = await dao.findAllCourses();
        res.json(courses);
    });

    // Create a course AND auto-enroll the creator
    app.post("/api/courses", async (req, res) => {
        const newCourse = await dao.createCourse(req.body);
        const curr = req.session.currentUser;
        if (curr && curr._id) {
            // auto-enroll the author in their new course
            await enrollmentsDao.enrollUserInCourse(curr._id, newCourse._id);
        }
        res.json(newCourse);
    });

    // Update a course
    app.put("/api/courses/:id", async (req, res) => {
        const updated = await dao.updateCourse(req.params.id, req.body);
        res.json(updated);
    });

    // Delete a course
    app.delete("/api/courses/:id", async (req, res) => {
        const result = await dao.deleteCourse(req.params.id);
        res.json(result);
    });

    // Retrieve modules for a given course
    app.get("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const mods = await modulesDao.findModulesForCourse(courseId);
        res.json(mods);
    });

    // Create a new module under a given course
    app.post("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const moduleData = { ...req.body, course: courseId };
        const newModule = await modulesDao.createModule(moduleData);
        res.json(newModule);
    });

    const findUsersForCourse = async (req, res) => {
        const { cid } = req.params;
        const users = await enrollmentsDao.findUsersForCourse(cid);
        res.json(users);
    };
    app.get("/api/courses/:cid/users", findUsersForCourse);

}
