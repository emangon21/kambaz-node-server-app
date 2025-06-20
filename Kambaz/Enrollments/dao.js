// Kambaz/Enrollments/dao.js
import model from "./model.js";
import mongoose from "mongoose";

export async function findAllEnrollments() {
    return model.find().lean().exec();
}

export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((e) => e.course);
}

export async function findUsersForCourse(courseId) {
    try {
        const courseObjId = new mongoose.Types.ObjectId(courseId);
        const enrollments = await model.find({ course: courseObjId }).populate("user");
        return enrollments.map((e) => e.user);
    } catch (err) {
        console.error("findUsersForCourse error:", err);
        return [];
    }
}

export function enrollUserInCourse(userId, courseId) {
    const newEnrollment = {
        _id: `${userId}-${courseId}`,
        user: new mongoose.Types.ObjectId(userId),
        course: new mongoose.Types.ObjectId(courseId),
    };
    console.log("Enrolling user:", newEnrollment.user, "in course:", newEnrollment.course);
    return model.create(newEnrollment);
}



export async function unenrollUserFromCourse(userId, courseId) {
    const userObjId = new mongoose.Types.ObjectId(userId);
    const courseObjId = new mongoose.Types.ObjectId(courseId);
    const res = await model.deleteOne({ user: userObjId, course: courseObjId });
    console.log("Unenroll result:", res);
    return res;
}
