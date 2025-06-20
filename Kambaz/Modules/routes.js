// src/Kambaz/Modules/routes.js

import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
    // ——— List all modules for a given course ———
    app.get("/api/courses/:courseId/modules", async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const mods = await modulesDao.findModulesForCourse(courseId);
            res.json(mods);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    });

    // ——— Create a new module under that course ———
    app.post("/api/courses/:courseId/modules", async (req, res) => {
        try {
            const courseId = req.params.courseId;
            // We expect { name: "...", description?: "..." } in body
            const newModule = await modulesDao.createModule({
                ...req.body,
                course: courseId,
            });
            res.status(201).json(newModule);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    });

    // ——— Update an existing module ———
    app.put("/api/modules/:moduleId", async (req, res) => {
        try {
            const updated = await modulesDao.updateModule(
                req.params.moduleId,
                req.body
            );
            res.json(updated);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    });

    // ——— Delete a module ———
    app.delete("/api/modules/:moduleId", async (req, res) => {
        try {
            await modulesDao.deleteModule(req.params.moduleId);
            res.json({ success: true });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    });
}
