// Kambaz/Modules/routes.js
import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
    app.delete("/api/modules/:moduleId", async (req, res) => {
        const status = await modulesDao.deleteModule(req.params.moduleId);
        res.json(status);
    });

    app.put("/api/modules/:moduleId", async (req, res) => {
        const updated = await modulesDao.updateModule(
            req.params.moduleId,
            req.body
        );
        res.json(updated);
    });
}
