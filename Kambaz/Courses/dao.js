// Kambaz/Courses/dao.js
import CourseModel from "./model.js";

export async function findAllCourses() {
    return CourseModel.find();
}

export async function createCourse(course) {
    const { _id, ...payload } = course;
    return CourseModel.create(payload);
}

export async function updateCourse(courseId, courseUpdates) {
    return CourseModel.findByIdAndUpdate(
        courseId,
        courseUpdates,
        { new: true }
    );
}

export async function deleteCourse(courseId) {
    await CourseModel.deleteOne({ _id: courseId });
    return { status: "ok" };
}
