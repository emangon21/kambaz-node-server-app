// File: Kambaz/Assignments/dao.js
import model from "./model.js";

// Generate a new assignment ID for a course (A101, A102…)
async function getNextId(courseId) {
    const docs = await model.find({ course: courseId }).select("_id").lean();
    const nums = docs
        .map((d) => (d._id.match(/^A(\d+)$/) || [])[1])
        .map((n) => parseInt(n, 10) || 0);
    const maxNum = nums.length ? Math.max(...nums) : 100;
    return `A${maxNum + 1}`;
}

export async function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId }).lean();
}

export async function findAssignmentById(assignmentId) {
    return model.findById(assignmentId).lean();
}

export async function createAssignmentForCourse(courseId, assignment) {
    const id = assignment._id || (await getNextId(courseId));
    const doc = { ...assignment, _id: id, course: courseId };
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
