// Kambaz/Courses/dao.js
import CourseModel from "./model.js";

export const createCourse = async (course) => {
    const { _id, ...payload } = course;
    const newCourse = await CourseModel.create(payload);
    return newCourse;
};

export const findAllCourses = async () => {
    return CourseModel.find();
};

export const updateCourse = async (courseId, courseUpdates) => {
    return CourseModel.findByIdAndUpdate(courseId, courseUpdates, { new: true });
};

export const deleteCourse = async (courseId) => {
    return CourseModel.findByIdAndDelete(courseId);
};
