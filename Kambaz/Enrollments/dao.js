import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function enrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    console.log("[ENROLL DEBUG] Enrolling user", userId, "in course", courseId);
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
}
