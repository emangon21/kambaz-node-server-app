import mongoose from "mongoose";
import courseSchema from "./schema.js";

export default mongoose.model("CourseModel", courseSchema);