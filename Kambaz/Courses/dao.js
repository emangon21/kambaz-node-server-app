import { v4 as uuidv4 } from "uuid";
import Database from "../Database/index.js";

export function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    Database.courses = [...Database.courses, newCourse];
    return newCourse;
}

export function findAllCourses() {
    return Database.courses;
}

export function deleteCourse(courseId) {
    const { courses, enrollments } = Database;
    Database.courses = courses.filter((course) => course._id !== courseId);
    Database.enrollments = enrollments.filter(
        (enrollment) => enrollment.course !== courseId
    );
    return { status: "ok" };
}

export function updateCourse(courseId, courseUpdates) {
    const { courses } = Database;
    const course = courses.find((c) => c._id === courseId);
    if (course) {
        Object.assign(course, courseUpdates);
    }
    return course;
}
