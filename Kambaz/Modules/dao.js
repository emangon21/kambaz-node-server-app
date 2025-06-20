// Kambaz/Modules/dao.js
import mongoose from "mongoose";
import ModuleModel from "./model.js";

export const findModulesForCourse = async (courseId) => {
    return ModuleModel.find({
        course: new mongoose.Types.ObjectId(courseId),
    }).exec();
};

export async function createModule(module) {
    return await ModuleModel.create(module);
}

export async function deleteModule(moduleId) {
    await ModuleModel.deleteOne({ _id: moduleId });
    return { status: "ok" };
}

export async function updateModule(moduleId, moduleUpdates) {
    return ModuleModel.findByIdAndUpdate(
        moduleId,
        moduleUpdates,
        {new: true}
    );
}
