// Kambaz/Enrollments/schema.js
import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
    {
        _id: String,
        course: { type: String, ref: "CourseModel", required: true },
        user: { type: String, ref: "UserModel", required: true },
        enrollmentDate: { type: Date, default: Date.now },
        status: {
            type: String,
            enum: ["ENROLLED", "DROPPED", "COMPLETED"],
            default: "ENROLLED",
        },
    },
    { collection: "enrollments" }
);

export default enrollmentSchema;
