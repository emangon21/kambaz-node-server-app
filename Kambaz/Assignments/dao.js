// File: Kambaz/Assignments/dao.js
import model from "./model.js";
import mongoose from "mongoose";

async function getNextId(courseId) {
    const docs = await model.find({ course: courseId }).select("_id").lean();
    const nums = docs
        .map((d) => (d._id.match(/^A(\d+)$/) || [])[1])
        .map((n) => parseInt(n, 10) || 0);
    const maxNum = nums.length ? Math.max(...nums) : 100;
    return `A${maxNum + 1}`;
}

export async function findAssignmentsForCourse(courseId) {
    const courseObjId = new mongoose.Types.ObjectId(courseId);
    return model.find({ course: courseObjId }).lean();
}

export async function findAssignmentById(assignmentId) {
    return model.findById(assignmentId).lean();
}

export async function createAssignmentForCourse(courseId, assignment) {
    const id = assignment._id || (await getNextId(courseId));
    const doc = { ...assignment, _id: id, course: new mongoose.Types.ObjectId(courseId) };
    return model.create(doc);
}

export async function updateAssignment(assignmentId, updates) {
    return model
        .findByIdAndUpdate(assignmentId, updates, { new: true })
        .lean();
}

export async function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
}
