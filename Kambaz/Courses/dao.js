// Kambaz/Courses/dao.js
import CourseModel from "./model.js";

export const createCourse = async (course) => {
    const newCourse = await CourseModel.create(course);
    return newCourse;
};

export const findAllCourses = async () => {
    return await CourseModel.find();
};

export const updateCourse = async (courseId, courseUpdates) => {
    return await CourseModel.findByIdAndUpdate(courseId, courseUpdates, { new: true });
};

export const deleteCourse = async (courseId) => {
    return await CourseModel.findByIdAndDelete(courseId);
};
