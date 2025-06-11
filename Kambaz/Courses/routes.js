// Kambaz/Courses/routes.js
import * as dao from './dao.js';
import * as modulesDao from "../Modules/dao.js";

export default function CourseRoutes(app) {
    // Get all courses
    app.get('/api/courses', async (req, res) => {
        const courses = await dao.findAllCourses();
        res.json(courses);
    });

    // Create a course
    app.post('/api/courses', async (req, res) => {
        const newCourse = await dao.createCourse(req.body);
        res.json(newCourse);
    });

    // Update a course
    app.put('/api/courses/:id', async (req, res) => {
        const updated = await dao.updateCourse(req.params.id, req.body);
        res.json(updated);
    });

    // Delete a course
    app.delete('/api/courses/:id', async (req, res) => {
        const result = await dao.deleteCourse(req.params.id);
        res.json(result);
    });

    // Get modules for a specific course
    app.get('/api/courses/:courseId/modules', (req, res) => {
        const { courseId } = req.params;
        const modules = modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });

    app.post('/api/courses/:courseId/modules', (req, res) => {
        const { courseId } = req.params;
        const module = { ...req.body, course: courseId };
        const newModule = modulesDao.createModule(module);
        res.json(newModule);
    });

}
