// File: Kambaz/Assignments/schema.js
import mongoose from "mongoose";

const entryOptionsSchema = new mongoose.Schema(
    {
        textEntry: Boolean,
        websiteUrl: Boolean,
        mediaRecordings: Boolean,
        studentAnnotation: Boolean,
        fileUploads: Boolean,
    },
    { _id: false }
);

const assignmentSchema = new mongoose.Schema(
    {
        _id: String,
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel", required: true },
        title: { type: String, required: true },
        description: String,
        points: Number,
        assignmentGroup: String,
        displayGradeAs: String,
        submissionType: String,
        entryOptions: entryOptionsSchema,
        assignTo: String,
        dueDate: String,
        availableFrom: String,
        availableUntil: String,
    },
    { collection: "assignments" }
);

export default assignmentSchema;
