// File: Kambaz/Assignments/dao.js
import model from "./model.js";
import mongoose from "mongoose";

export async function findAssignmentsForCourse(courseId) {
    const courseObjId = new mongoose.Types.ObjectId(courseId);
    return model.find({ course: courseObjId }).lean();
}

export async function findAssignmentById(assignmentId) {
    return model.findById(assignmentId).lean();
}

export async function createAssignmentForCourse(courseId, assignment) {
    const id = new mongoose.Types.ObjectId().toHexString();
    const doc = {
        ...assignment,
        _id: id,
        course: new mongoose.Types.ObjectId(courseId)
    };
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
