// Kambaz/Courses/schema.js.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        number: String,
        author: String,
        credits: Number,
        department: String,
        startDate: String,
        endDate: String,
        image: String,
        description: String,
    },
    { collection: "courses" }
);

export default courseSchema;
