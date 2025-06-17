// Kambaz/Modules/schema.js
import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: String,
        course: { type: String, ref: "Course" },
    },
    { collection: "modules" }
);

export default moduleSchema;
