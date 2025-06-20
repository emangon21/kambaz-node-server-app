// Kambaz/Enrollments/schema.js
import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
    {
        _id: String,
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel", required: true },
        user:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
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
