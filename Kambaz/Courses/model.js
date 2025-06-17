// Kambaz/Courses/model.js
import mongoose from "mongoose";
import courseSchema from "./schema.js";

const CourseModel = mongoose.model("Course", courseSchema);

export default mongoose.model("CourseModel", courseSchema);
