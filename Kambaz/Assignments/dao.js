// Kambaz/Assignments/dao.js
import Database from "../Database/index.js";

function getNextAssignmentIdForCourse(courseId) {
    const { assignments } = Database;
    const courseAssignments = assignments.filter(a => a.course === courseId);
    const lastNumber = courseAssignments
        .map(a => {
            const match = (a._id || "").match(/^A(\d+)/);
            return match ? parseInt(match[1], 10) : 0;
        })
        .reduce((max, n) => Math.max(max, n), 100); // default start at 100
    return `A${lastNumber + 1}`;
}

// Create an assignment
export function createAssignment(assignment) {
    let newId = assignment._id;
    if (!newId || newId.startsWith("dbcf")) { // fallback: only if ID is not valid
        newId = getNextAssignmentIdForCourse(assignment.course);
    }
    const newAssignment = { ...assignment, _id: newId };
    Database.assignments = [...Database.assignments, newAssignment];
    return newAssignment;
}

// Get all assignments for a course
export function findAssignmentsForCourse(courseId) {
    const { assignments } = Database;
    return assignments.filter((a) => a.course === courseId);
}

// Update an assignment
export function updateAssignment(assignmentId, assignmentUpdates) {
    const { assignments } = Database;
    const assignment = assignments.find((a) => a._id === assignmentId);
    if (assignment) Object.assign(assignment, assignmentUpdates);
    return assignment;
}

// Delete an assignment
export function deleteAssignment(assignmentId) {
    const { assignments } = Database;
    Database.assignments = assignments.filter((a) => a._id !== assignmentId);
    return { status: "ok" };
}

// Find one assignment by ID (optional, for editor)
export function findAssignmentById(assignmentId) {
    return Database.assignments.find((a) => a._id === assignmentId);
}
