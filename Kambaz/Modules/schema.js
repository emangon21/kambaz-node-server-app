// src/Kambaz/Modules/schema.js

import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: String,
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
    },
    { collection: "modules" }
);

export default moduleSchema;